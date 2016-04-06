// Pause/Unpause Button
var pauseButton = document.getElementById("pause-button");
var whitelistButton = document.getElementById("toggle-whitelist");
// Open Addon Options
var optionsButton = document.getElementById("options-button");
var pause = false;
var whitelist = -1;

pauseButton.addEventListener('click', function onClick(event){
	if (!pause){
		pauseButton.innerHTML = "Unpause TidyTabs";
		pause = true;
	} else {
		pause = false;
		pauseButton.innerHTML = "Pause TidyTabs";
	}
	addon.port.emit("toggleRegister");
})

whitelistButton.addEventListener('click', function onClick(event){
	//addon.port.emit("logConsole", whitelist);
	if (whitelist == -1){
		whitelistButton.innerHTML = "Remove domain Whitelist";
		whitelist = 0;
		addon.port.emit("addWhitelist");
	} else {
		whitelistButton.innerHTML = "Add domain to Whitelist";
		whitelist = -1;
		addon.port.emit("removeWhitelist");
	}
	
})

optionsButton.addEventListener('click', function onClick(event) {
    addon.port.emit("openOptions");
});

addon.port.on("show", function onShow(whitelistIndex){
	if (whitelistIndex > -1){
		whitelistButton.innerHTML = "Remove domain from Whitelist";
	} else {
		whitelistButton.innerHTML = "Add domain to Whitelist";
	}
	whitelist = whitelistIndex;
})