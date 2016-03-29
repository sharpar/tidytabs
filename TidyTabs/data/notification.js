var pauseButton = document.getElementById("pause-button");

pauseButton.addEventListener('click', function onclick(event){
	var text = pauseButton.textContent || pauseButton.innerText || '';
	if (text == "Pause TidyTabs"){
		pauseButton.innerHTML = "Unpause TidyTabs";
	} else {
		pauseButton.innerHTML = "Pause TidyTabs";
	}
	addon.port.emit("toggleRegister");
})