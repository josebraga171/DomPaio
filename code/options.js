"use strict";
 
(function() {
    window.addEventListener("load", main);
}());
 
function main() {

    var frm = document.getElementsByTagName("iframe")[0];
 
    var musicaB = document.getElementById("musicaB");
    var somB = document.getElementById("somB");
    var sairB  =  document.getElementById("sairBotao");

    var soundMusica = parent.mus;
    var soundSons = parent.som;

    if(soundMusica == 0){
        musicaB.src = "./resources/soundOFF.png";
    }
    else{
        musicaB.src = "./resources/soundON.png";
    }

    if(soundSons == 0){
        somB.src = "./resources/soundOFF.png";
    }
    else{
        somB.src = "./resources/soundON.png";
    }

    function buttonListener1(ev) {
 
        switch(ev.currentTarget.id) {
        	case "sairBotao":
            sairB.src = "./resources/sairBotON.png";
            break;
        }
    }

    function buttonListener2(ev) {
 
        switch(ev.currentTarget.id) {
        	case "sairBotao":
            sairB.src = "./resources/sairBotOFF.png";
            break;
        }
    }

     function buttonListener3(ev) {
     	switch(ev.currentTarget.id) {
        case "musicaB":
        	if(soundMusica == 0){
        		musicaB.src = "./resources/soundON.png";
        		soundMusica = 1;
                parent.postMessage("music", "*");
        	}
        	else{
        		musicaB.src = "./resources/soundOFF.png";
        		soundMusica = 0;
                parent.postMessage("music", "*");
        	}

        	break;

        case "somB":
        	if(soundSons==1){
        		somB.src = "./resources/soundOFF.png";
        		soundSons=0;
                parent.postMessage("sound", "*");
        	}
            
        	else{
        		somB.src = "./resources/soundON.png";
        		soundSons=1;
                parent.postMessage("sound", "*");
        	}

        	break;
        }
	}

	sairB.addEventListener("mouseover", buttonListener1);
    sairB.addEventListener("mouseout", buttonListener2);
    musicaB.addEventListener("click", buttonListener3);
    somB.addEventListener("click", buttonListener3);

    var msg = function(ev) {
		messageHandler(ev, sairB, "0");
	}
    
	window.addEventListener("message", msg);
}

function messageHandler(ev, Btn, option) {
    var main = ev.source;
 
    var changePage = function(ev) {
        console.log(option);
        main.postMessage(option, '*');
    }

    Btn.addEventListener("click", changePage);
}      