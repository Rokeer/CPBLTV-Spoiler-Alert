// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {

  if (e.target.id == "hide") {
  	chrome.tabs.insertCSS(null,
      {file:'styles.css'});
    window.close();
  } else {
    chrome.tabs.insertCSS(null,
      {file:'nostyles.css'});
    window.close();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
