"use strict";
  
(function(){
    window.addEventListener("load", main);
}());

var mus = 1;
var som = 1;

var score = new Array();
var numero_jogadores = 0;

function main() {
    
    var startPage = 0;

    var background_sound = document.getElementsByTagName("audio")[0];
    background_sound.volume = 0.2;
    background_sound.play();

    showPage(startPage);

    window.addEventListener("message", messageHandler);
}
  
function showPage(pageNum) {
    var background_sound = document.getElementsByTagName("audio")[0];
     
    var frm = document.getElementsByTagName("iframe")[0];
 
    if(pageNum === 0){
        frm.src = "menu0.html";
    }

    else if(pageNum === 1)
        frm.src = "intro.html";
 
    else if(pageNum === 2){
        frm.src = "game.html";
        background_sound.pause();
    }

    else if(pageNum === 3)
        frm.src = "menu3.html"

    else if(pageNum === 4) 
        frm.src = "menu4.html";

    else if(pageNum === 5)
            frm.src = "menu5.html";

    else if(pageNum === 6)
        window.close();
    
    var loaded = function(ev) {
        frm.contentWindow.postMessage("", '*');
    }
    //Quando a iframe estiver carregada, mandar uma mensagem a avisar.
    frm.addEventListener("load", loaded);
        
}
  
function hidePage(pageNum) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src = "";
}
 
function messageHandler(ev) {
    var str = ev.data;
    
    changePage(ev);
}
  
function changePage(ev) {
    var background_sound = document.getElementsByTagName("audio")[0];
    var frm = document.getElementsByTagName("iframe")[0];
    var frmName = frm.src;
    var pageNum = Number(frmName.charAt(frmName.length-6));
    var str = ev.data;

    if(str == "music"){
        if(mus == 0){
            background_sound.play();
            mus = 1;
        }
        else{
            background_sound.pause();
            mus = 0;
        }
    }

    else if(str == "sound"){
        if(som == 0) som = 1;
        else som = 0;
    }

    else{
        var newPageNum = parseInt(str); //Obter o número contido na string em causa.

        hidePage(pageNum);
        showPage(newPageNum);
    }
}