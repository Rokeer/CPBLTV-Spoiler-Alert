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
function set_i18n_text() {
    "use strict";
    var get_msg = chrome.i18n.getMessage;

    $('div#support strong').html(get_msg('support_title'));
    $('p#support_message1').html(get_msg('support_message1'));
    $('p#support_message2').html(get_msg('support_message2'));
    $('button#support_button').html(get_msg('support_button'));

    $('div#mode_select strong').html(get_msg('mode_select'));

    $('span.mode_show').html(get_msg('mode_show'));
    $('span.mode_show_desc').html(get_msg('mode_show_desc'));
    $('span.mode_hide').html(get_msg('mode_hide'));
    $('span.mode_hide_desc').html(get_msg('mode_hide_desc'));
    
    //$('div#help_text').html(get_msg('help'));
    $('div#faq').html(get_msg('faq'));
    $('div#rating').html(get_msg('rating'));
}

$(document).ready(function() {
    "use strict";
    set_i18n_text();

    var background = chrome.extension.getBackgroundPage();

    // set default button display
    background.get_mode_name(function(current_mode_name) {
        switch (current_mode_name) {
            case 'show':
                $('label#show').addClass('active');
                break;
            default:
                $('label#hide').addClass('active');
                break;
        }
    });

    $('div#version small').html('CPBLTV Spoiler Alert v' + background.cpbl_sa.version);

    // button actions
    $('input#input_hide').change(function() {
        console.log('to change mode to hide');
        background.change_mode('hide');


    });
    $('input#input_show').change(function() {
        console.log('to change mode to show');
        background.change_mode('show');
    });

    // enable tooltip
    $('#tooltip').tooltip();

});

