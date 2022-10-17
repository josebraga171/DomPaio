"use strict"

class SpriteSheet{
	//dimX/dimY: interval between each sprite and each line;
	//lineNum: number of lines of sprites (each one representing an animation);

	constructor(image, dimX, dimY, colNum){
		this.image = image;

		this.dimX = dimX;
		this.dimY = dimY;

		this.colNum = colNum;
	}

	updateAnim(){

	}
}