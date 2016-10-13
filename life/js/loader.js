"use strict"

var app = app || {};


window.onload = function(){
	console.log("window.onload called");
	app.main.init();
};

window.onblur = function(){
	console.log("blur at " + Date());
	app.main.pauseGame();
};

window.onfocus = function(){
	console.log("focus at " + Date());
	app.main.resumeGame();

};