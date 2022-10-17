"use strict";

(function(){
	window.addEventListener("load", main);
}());

////////////////////////////////////////////////////////////////////////////////////////////////////

function main(){

	var frameCounter = 0;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//Scaled up to 4x;
	ctx.imageSmoothingEnabled = false;
	ctx.scale(4, 4);

	var sairB  =  document.getElementById("sairBotao");

	var texto = new Image();
	texto.id = "texto";
	texto.addEventListener("load", loadHandler);
	texto.src = "assets/IntroText.png";

	function loadHandler(ev){
		var img = ev.target;

		introLoop(img);
	}


	function introLoop(img){
		var t = function(time){
			introLoop(img);
		}

		var reqID = window.requestAnimationFrame(t);

		var dimX = 192;
		var dimY = 192;

		if(Math.round(frameCounter/4) < img.naturalHeight - 192){
			ctx.clearRect(0, 0, dimX, dimY);

			ctx.drawImage(img, 0, Math.round(frameCounter/4), dimX, dimY, 0, 0, dimX, dimY);
		}

		frameCounter += 1;
	}

	var msg = function(ev) {
        messageHandler(ev, sairB, "2");
    }
    window.addEventListener("message", msg);
}
 
function messageHandler(ev, Btn, option) {
    var main = ev.source;
 
    var changePage = function(ev) {
        main.postMessage(option, '*');
    }

    Btn.addEventListener("click", changePage);
}       
