/*
 * Copyright (C) 2012 - 2016  Bo Zhu  http://zhuzhu.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/*jslint browser: true */
/*global chrome: false, get_storage: false, set_storage: false, new_random_ip: false */
"use strict";


// === For debug - start ===
/*
unblock_youku.default_proxy_server_proc = 'SOCKS5';
unblock_youku.default_proxy_server_addr = '127.0.0.1:1086';
unblock_youku.backup_proxy_server_proc = 'SOCKS5';
unblock_youku.backup_proxy_server_addr = '127.0.0.1:1086';
*/
// == For debug - end ===

var cpbl_sa = cpbl_sa || {};

// ====== Configuration Functions ======
function set_mode_name(mode_name, callback) {
    if (typeof callback === 'undefined') {
        var err_msg = 'missing callback function in set_mode_name()';
        console.error(err_msg);
    }

    set_storage('cpbltv_spoiler_alert_mode', mode_name, callback);
}

function get_mode_name(callback) {
    if (typeof callback === 'undefined') {
        var err_msg = 'missing callback function in get_mode_name()';
        console.error(err_msg);
    }

    get_storage('cpbltv_spoiler_alert_mode', function(current_mode) {
        if (typeof current_mode === 'undefined' || (
                current_mode !== 'show' )) {
            set_mode_name('hide', function() {
                callback('hide');
            });
        } else {
            callback(current_mode);
        }
    });
}

function clear_mode_settings(mode_name) {
    switch (mode_name) {
    case 'show':
        console.log('cleared settings for show');
        break;
    case 'hide':
        console.log('cleared settings for hide');
        break;
    default:
        var err_msg = 'clear_mode_settings: should never come here';
        console.error(err_msg);
        break;
    }

    console.log('cleared the settings for the mode: ' + mode_name);
}

function setup_mode_settings(mode_name) {
    switch (mode_name) {
    case 'show':
        chrome.browserAction.setBadgeText({text: 'OFF'});
        chrome.browserAction.setTitle({title: 'CPBLTV Spoiler Alert has been turned off.'});
        change_browser_icon('show');
        break;
    case 'hide':
        chrome.browserAction.setBadgeText({text: ''});
        change_browser_icon('hide');
        break;
    default:
        var err_msg = 'setup_mode_settings: should never come here';
        console.error(err_msg);
        break;
    }

    console.log('initialized the settings for the mode: ' + mode_name);
}

function change_mode(new_mode_name) {
    set_mode_name(new_mode_name, function() {});
    // the storage change listener would take care about the setting changes
}

function change_browser_icon(option) {
    function _change_browser_icon(option) {
        if (option === 'show') {
            chrome.browserAction.setIcon({path: 'icons/icon48_gray.png'});
            return;
        }

        chrome.browserAction.setIcon({path: 'icons/icon48.png'});
        chrome.browserAction.setTitle({title: 'CPBLTV Spoiler Alert v' + cpbl_sa.version});
    }

    // check chrome.storage before changing icons
    // the mode should already be set in previous get_mode_name()
    get_storage('cpbltv_spoiler_alert_mode', function(current_mode) {
        if (typeof current_mode !== 'undefined') {
            _change_browser_icon(option);
        } else {
            var err_msg = 'chrome.storage has some problems';
            console.log(err_msg);
        }
    });
}


// Settings are changed asynchronously
function storage_monitor(changes, area) {
    console.log('storage changes: ' + JSON.stringify(changes));

    if (typeof changes.cpbltv_spoiler_alert_mode !== 'undefined') {
        var mode_change = changes.cpbltv_spoiler_alert_mode;

        // doesn't run if it's first time to migrate the old settings
        if (typeof mode_change.oldValue !== 'undefined' && typeof mode_change.newValue !== 'undefined') {
            clear_mode_settings(mode_change.oldValue);
            setup_mode_settings(mode_change.newValue);
        }
    }
}


function setup_storage_monitor() {
    if (!chrome.storage.onChanged.hasListener(storage_monitor)) {
        chrome.storage.onChanged.addListener(storage_monitor);
        console.log('storage_monitor is set');
    } else {
        var err_msg = 'storage_monitor is already there!';
        console.error(err_msg);
    }
}


// ====== Initialization ======
document.addEventListener("DOMContentLoaded", function() {
    setup_storage_monitor();
    cpbl_sa.version = chrome.runtime.getManifest().version;

    get_mode_name(function(current_mode_name) {
        setup_mode_settings(current_mode_name);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(!tab.url.match(/^https:\/\/www.cpbltv.com\/lists.php*/)) { return; } // Wrong scheme
    get_mode_name(function(current_mode_name) {
    	console.log('current_mode_name: ' + current_mode_name);
        if ("hide" == current_mode_name) {
            chrome.tabs.insertCSS(null,{file:'styles.css'});
            chrome.tabs.executeScript(null,{file:'assign_ids.js'});
        } else {
            chrome.tabs.insertCSS(null,{file:'showstyles.css'});
        }
    });
}); 