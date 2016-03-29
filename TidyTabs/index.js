//Global Vars
var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");


//Register Event Triggers
tabs.on("open", checkEmpty);
tabs.on("activate", checkOtherEmpty);
tabs.on("ready", checkDuplicate);
tabs.on("ready", groupTLD);

/* Feature 1
 * Closes other blank pages when opening a new tab.
 * If already focused on a blank page, a new tab will not be opened.
 */
function checkEmpty(newTab) {
    if ((tabs.activeTab.url == "about:blank") || (tabs.activeTab.url == "about:newtab")) {
        newTab.close();
    }
}

/* If not focused on a blank page, wait till the focus switches.
 * Then check if other blank pages exist, and close them.
 */
function checkOtherEmpty(newTab) {
    if ((newTab.url == "about:blank") || (newTab.url == "about:newtab")) {
        for (let tab of tabs) {
            if ((tab != newTab) && ((tab.url == "about:blank") || (tab.url == "about:newtab"))) {
                tab.close();
            }
        }
    }
}

/* Check if the address of the new tab is the same as that of an existing tab.
 * If yes, call the duplicate handler.
 */
function checkDuplicate(newTab) {
    for (let tab of tabs) {
        if ((tab != newTab) && (tab.url == newTab.url)) {
            duplicateHandler(tab);
        }
    }
}

function duplicateHandler(tab){
  tab.close();
}

function groupTLD(){

}

/* Check if there exists a tab with the given link.
 * If yes, switch to that tab.
 */
function checkLink(link) {
    for (let tab of tabs) {
        if (tab.url == link) {
            tab.activate();
            return true;
        }
    }
    return false;
}

// adding an actino button to the tool bar
require("sdk/ui/button/action").ActionButton({
    id: "list-tabs",
    label: "Tidy Tabs",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: listTabs
});

function listTabs() {
    for (let tab of tabs)
        console.log(tab.url);
}

// This is for the pop up menu in the browser
/*
var {Cu, Ci} = require('chrome');
Cu.import('resource://gre/modules/Services.jsm');
var doit = Services.prompt.confirm(null, 'title', 'message');
if (doit) {
//he clicked yes
}
*/

// This is for a notification on your computer
/*
var notifications = require("sdk/notifications");
notifications.notify({
  title: "Jabberwocky",
  text: "'Twas brillig, and the slithy toves",
  data: "did gyre and gimble in the wabe",
  onClick: function (data) {
    console.log(data);
    // console.log(this.data) would produce the same result.
  }
});
*/