"use strict"

class Entity{
	//x/y: entity position (upper left corner);
	//spriteSheet: entity sprite sheet (only one sprite if static);

	constructor(x, y, spriteSheet, colX, colY){
		this.x = x;
		this.y = y;

		this.spriteSheet = spriteSheet;

		this.colX = colX;
		this.colY = colY;
	}
}