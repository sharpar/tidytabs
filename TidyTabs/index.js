//Global Vars
var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var notifications = require("sdk/notifications");
var urls = require("sdk/url");
var regIcons = {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
};
var unregIcons = {
    "16": "./icon-16-grey.png",
    "32": "./icon-32-grey.png",
    "64": "./icon-64-grey.png"
};
var prefers = require("sdk/simple-prefs").prefs;

var registered = false;

var debug = false;

//Register Event Triggers
function register() {
    registered = true;
    button.icon = regIcons;
    if (prefers.closeNewTabs) {
        tabs.on("open", checkEmpty);
        tabs.on("activate", checkOtherEmpty);
        checkOtherEmpty(tabs.activeTab);
    }
    if (prefers.closeDuplicates) {
        tabs.on("activate", checkDuplicate);
        tabs.on("ready", checkDuplicate);
        checkDuplicate(tabs.activeTab);
    }
    if (prefers.groupTabs) {
        tabs.on("ready", groupTLD);
    }
    if (debug) console.log("Registered TidyTabs");
}

function unregister() {
    registered = false;
    button.icon = unregIcons;
    tabs.removeListener("open", checkEmpty);
    tabs.removeListener("activate", checkOtherEmpty);
    tabs.removeListener("activate", checkDuplicate);
    tabs.removeListener("ready", checkDuplicate);
    tabs.removeListener("ready", groupTLD);
    if (debug) console.log("Unregistered TidyTabs");
}

function toggleRegister() {
    if (registered) {
        unregister();
    } else {
        register();
    }
}
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

function duplicateHandler(closeTab, oldTab) {
    // This is for a notification on your computer
    if (debug) console.log("Closing duplicate" + closeTab.id)
    closeTab.close();
    oldTab.activate();
}

/* Check if the address of the new tab is the same as that of an existing tab.
 * If yes, call the duplicate handler.
 */
function checkDuplicate(newTab) {
    //only if current tab then display notification
    if (newTab != tabs.activeTab) {
        return;
    }

    for (let tab of tabs) {
        if ((tab != newTab) && (newTab.url != "about:blank") && (newTab.url != "about:newtab") && (tab.url == newTab.url)) {
            notifyDup(newTab, tab);
            break;
        }
    }
}


//Display's system notification of duplicate tab
//If user clicks on notification then tab closes and switches to the old tab
//Notification will dismiss after some time determined by system
function notifyDup(newTab, tab) {
    notifications.notify({
        title: "Tidy Tabs",
        text: "Duplicate tab opened, Do you want to close it?",
        data: "Notification of duplicate tab displayed",
        iconURL: regIcons["32"],
        onClick: function (data) {
            if (debug) console.log(data);
            if (debug) console.log("Noticiation clicked on");
            // console.log(this.data) would produce the same result.
            duplicateHandler(newTab, tab);
        }
    });
}


/* When a new tab is ready and it has the same TLD as another tab, move it next
 * to the existing tab.
 */
function groupTLD(newTab) {
    var index = -1;
    for (let tab of tabs) {
        if ((tab != newTab) && (parseTLD(tab.url) == parseTLD(newTab.url))) {
            if (debug) console.log("moved");
            index = tab.index;
        }
    }
    if (index != -1) {
        if (newTab.index < index) {
            newTab.index = index;
        } else {
            newTab.index = index + 1;
        }
    }
}

function parseTLD(url) {
    var tld = urls.getTLD(url);
    var list = url.split(tld);
    list = list[0].split('.');
    if (debug) console.log(list[list.length - 2]);
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
/* Function to open the addon options from panel */
function openOptions() {
    tabs.open({
        url: 'about:addons',
        onReady: function (tab) {
            tab.attach({
                contentScriptWhen: 'end',
                contentScript: 'AddonManager.getAddonByID("' + self.id + '", function(aAddon) {\n' +
                    'unsafeWindow.gViewController.commands.cmd_showItemDetails.doCommand(aAddon, true);\n' +
                    '});\n'
            });
        }
    });
}

//default sample panel code from panel ref page
var {
    ToggleButton
} = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");

var button = ToggleButton({
    id: "my-button",
    label: "my button",
    icon: regIcons,
    onChange: handleChange
});

var panel = panels.Panel({
    width: 180,
    height: 180,
    contentURL: self.data.url("notification.html"),
    onHide: handleHide
});

panel.port.on("toggleRegister", toggleRegister)
panel.port.on("openOptions", openOptions)

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {
        checked: false
    });
}

function buttonClicked() {
    listTabs();
    toggleRegister();
}

function listTabs() {
    for (let tab of tabs)
        console.log(tab.url);
}


register();