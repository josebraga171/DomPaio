"use strict";
 
(function() {
    window.addEventListener("load", main);
}());
 

function main() {

    var frm = document.getElementsByTagName("iframe")[0];

    var sairB  =  document.getElementById("sairBotao");

    var numberOfPlayers = parent.numero_jogadores;
    var score_array = new Array();

    console.log("score"+parent.score);
    console.log("num"+parent.numero_jogadores);

    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
    if( numberOfPlayers != 0){
        score_array = parent.score;
        score_array = bubbleSort(score_array);
    	for(let i = 0; i < 5 && i < numberOfPlayers; i++ ){
    		ctx.font = "40px Consolas";
    		ctx.fillStyle = "white";
    		ctx.fillText("PLAYER"+"_"+(i+1)+"\t................\t"+score_array[i], 75, 250+ 100*i);

    	}
    }

    function bubbleSort(arr) {
    for(let j=0;j<arr.length;j++) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i]<arr[i+1]) {
                var temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }      
    return arr;
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

  
	sairB.addEventListener("mouseover", buttonListener1);
    sairB.addEventListener("mouseout", buttonListener2);

    var msg = function(ev) {
		messageHandler(ev, sairB, "0");
	}
    
	window.addEventListener("message", msg);
}

function messageHandler(ev, Btn, option) {
    var main = ev.source;
 
    var changePage = function(ev) {
        main.postMessage(option, '*');
        console.log(option);
    }
    Btn.addEventListener("click", changePage);
}      