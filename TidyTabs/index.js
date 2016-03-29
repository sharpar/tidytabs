//Global Vars
var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var notifications = require("sdk/notifications");
var urls = require("sdk/url");
var icons = {"16": "./icon-16.png",
            "32": "./icon-32.png",
            "64": "./icon-64.png"};


//Register Event Triggers
tabs.on("open", checkEmpty);
tabs.on("activate", checkOtherEmpty);
tabs.on("activate", checkDuplicate);
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

function duplicateHandler(tab){
    // This is for a notification on your computer
    console.log("Closing duplicate" + tab.id)
    tab.close();
}

/* Check if the address of the new tab is the same as that of an existing tab.
 * If yes, call the duplicate handler.
 */
function checkDuplicate(newTab) {
    //only if current tab then display notification
    if (newTab != tabs.activeTab) 
    {
        return;
    }

    for (let tab of tabs) {
        if ((tab != newTab) && (tab.url == newTab.url)) {
            notifications.notify({
                title: "Tidy Tabs",
                text: "Duplicate tab opened, Do you want to close it?",
                data: "Notification of duplicate tab displayed",
                iconURL: icons["32"],
                onClick: function (data) {
                    console.log(data);
                    console.log("Noticiation clicked on");
                    // console.log(this.data) would produce the same result.
                    duplicateHandler(tab);
                }
            });

        }
    }
}

/* When a new tab is ready and it has the same TLD as another tab, move it next
 * to the existing tab.
 */
function groupTLD(newTab){
    var index = -1;
    for (let tab of tabs) {
        if ((tab != newTab) && (parseTLD(tab.url) == parseTLD(newTab.url))) {
            console.log("moved");
            index = tab.index;
        }
    }
    if(index != -1){
        if(newTab.index < index){
            newTab.index = index;
        }else{
            newTab.index = index + 1;
        }
    }
}

function parseTLD(url){
    var tld = urls.getTLD(url);
    var list = url.split(tld);
    list = list[0].split('.');
    console.log(list[list.length - 2]);
    return list[list.length - 2];
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
    icon: icons,
    onClick: listTabs
});

function listTabs() {
    for (let tab of tabs)
        console.log(tab.url);
}

//default sample panel code from panel ref page
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  width: 180,
  height: 180,
  contentURL: self.data.url("notification.html"),
  onHide: handleHide
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
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


