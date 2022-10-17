"use strict";
 
(function() {
    window.addEventListener("load", main);
}());
 
function main() {

    var frm = document.getElementsByTagName("iframe")[0];
 
    var jogarB = document.getElementById("jogarBotao");
    var opcaoB = document.getElementById("opcaoBotao");
    var ajudaB = document.getElementById("ajudaBotao");
    var rankB  =  document.getElementById("rankBotao");
    var sairB  =  document.getElementById("sairBotao");
 
    function buttonListener1(ev) {
 
        switch(ev.currentTarget.id) {
 
        case "jogarBotao":
            jogarB.src = "./resources/jogarBotON.png";
            break;
        case "opcaoBotao":
            opcaoB.src = "./resources/opcoesBotON.png";
            break;
        case "ajudaBotao":
            ajudaB.src = "./resources/ajudaBotON.png";
            break;
        case "rankBotao":
            rankB.src = "./resources/rankBotON.png";
            break;
        case "sairBotao":
            sairB.src = "./resources/sairBotON.png";
            break;
        }
    }
    function buttonListener2(ev) {
 
        switch(ev.currentTarget.id) {
 
        case "jogarBotao":
            jogarB.src = "./resources/jogarBotOFF.png";
            break;
        case "opcaoBotao":
            opcaoB.src = "./resources/opcoesBotOFF.png";
            break;
        case "ajudaBotao":
            ajudaB.src = "./resources/ajudaBotOFF.png";
            break;
        case "rankBotao":
            rankB.src = "./resources/rankBotOFF.png";
            break;
        case "sairBotao":
            sairB.src = "./resources/sairBotOFF.png";
            break;
        }
    }

    jogarB.addEventListener("mouseover", buttonListener1); 
    jogarB.addEventListener("mouseout", buttonListener2);
    opcaoB.addEventListener("mouseover", buttonListener1); 
    opcaoB.addEventListener("mouseout", buttonListener2);
    ajudaB.addEventListener("mouseover", buttonListener1);
    ajudaB.addEventListener("mouseout", buttonListener2);
    rankB.addEventListener("mouseover", buttonListener1);
    rankB.addEventListener("mouseout", buttonListener2);
    sairB.addEventListener("mouseover", buttonListener1);
    sairB.addEventListener("mouseout", buttonListener2);
 
 
    var msg = function(ev) {
        messageHandler(ev, jogarB, "1");
        messageHandler(ev, opcaoB, "3");
        messageHandler(ev, ajudaB, "4");
        messageHandler(ev, rankB, "5");
        messageHandler(ev, sairB, "6");
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
