var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");


// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
  
}

//Example From https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/List_Open_Tabs
require("sdk/ui/button/action").ActionButton({
	  id: "list-tabs",
	  label: "List Tabs",
	  icon: "./data/icon-16.png",
	  onClick: listTabs
	});

	function listTabs() {
	  var tabs = require("sdk/tabs");
	  for (let tab of tabs)
	    console.log(tab.url);
	}

require("sdk/tabs").on("ready", checkDuplicate);
 
function checkDuplicate(newTab) {
	var tabs = require("sdk/tabs");
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
	var tabs = require("sdk/tabs");
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

/* Feature 1
 * Closes other new tabs when opening another new tab.
 */
var tabs = require("sdk/tabs");
tabs.on('open', function onOpen(newTab) {
  for (let tab of tabs){
      if((tab != newTab) && ((tab.url == "about:newtab") || (tab.url == "about:blank"))){
        tab.close();
      }
    }
});

exports.dummy = dummy;
