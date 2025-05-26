'use strict';

chrome.devtools.panels.create(
  'chrome-extension-starter - devtools-panel',
  'images/icon-128x128.png',
  'pages/devtools-panel/index.html',
  (_panel) => {
    // code invoked on panel creation
  }
);

// chrome.tabs.create({ url: 'http://heise.de' }, (tab) => {
//   console.log(tab);
// })
