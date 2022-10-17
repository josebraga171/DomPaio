"use strict"

//readMap: read text file containing tile map of the objects;

class MapReader{

	constructor(){
		
	}

	readMap(fileName){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET', fileName, false);
		xmlhttp.send();
		var text = xmlhttp.responseText;
		
		return(text);
	}
}
