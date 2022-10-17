"use strict"

class Bound extends Entity{
	//x/y: object position (upper left corner);
	//spriteSheet: object sprite sheet (only one sprite if static);

	//draw: draw object sprite on given canvas;

	constructor(x, y, spriteSheet, dimX, dimY){
		super(x, y, spriteSheet);

		this.dimX = dimX;
		this.dimY = dimY;

		//Attach collision box;
		this.collisionBox = new CollisionBox(this, dimX, dimY, -Math.round(dimX/2), -Math.round(dimY));
	}

	draw(ctx){
		
	}
}