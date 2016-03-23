//Global Vars
var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");


//Register Event Triggers
tabs.on("open", checkEmpty);
tabs.on("ready", checkDuplicate);



/* Feature 1
 * Closes other blank pages when opening a new tab.
 * If already focused on a blank page, a new tab will not be opened.
 */
function checkEmpty(newTab) {
  if((tabs.activeTab.url == "about:blank") || (tabs.activeTab.url == "about:newtab")){
    newTab.close();
  }else{
    for (let tab of tabs){
      if((tab != newTab) && ((tab.url == "about:blank") || (tab.url == "about:newtab"))){
        tab.close();
      }
    }
  }
}


function checkDuplicate(newTab) {
    for (let tab of tabs){
      if((tab != newTab) && (tab.url == newTab.url)){
        console.log("old tab: " + tab.url);
        console.log("new tab: " + newTab.url);
        tab.activate();
        newTab.close();
      }
    }
}


function checkLink(link){
    for (let tab of tabs){
      if((tab != newTab) && (tab.url == link)){
        console.log("old tab: " + tab.url);
        console.log("new tab: " + link);
        tab.activate();
        return true;
      }
    }
    return false;
}


//Example From https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/List_Open_Tabs
require("sdk/ui/button/action").ActionButton({
	  id: "list-tabs",
	  label: "List Tabs",
	  icon: "./data/icon-16.png",
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

exports.dummy = dummy;
