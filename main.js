"use strict";

// Window
window.onload = (e)=>{
	//console.log("onload!!");
	const scene = document.querySelector("a-scene");

	const sound01 = document.getElementById("m001");
	const btn01 = document.getElementById("mbtn");
	btn01.addEventListener("mouseup", (e)=>{
		const sound = sound01.components.sound;
		if(sound.isPlaying){
			sound.pauseSound();
			e.target.setAttribute("src", "#istop");
		}else{
			sound.playSound();
			e.target.setAttribute("src", "#iplay");
		}
	});
}
