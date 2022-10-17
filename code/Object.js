"use strict"

class Object extends Entity{
	//x/y: object position (upper left corner);
	//spriteSheet: object sprite sheet (only one sprite if static);

	//draw: draw object sprite on given canvas;

	constructor(x, y, spriteSheet, colX, colY){
		super(x, y, spriteSheet, colX, colY);

		this.dimX = this.spriteSheet.dimX;
		this.dimY = this.spriteSheet.dimY;

		//Attach collision box;
		this.collisionBox = new CollisionBox(this, this.colX, this.colY, -Math.round(this.colX/2), -this.colY);
	}

	draw(ctx){
		var drawX = this.x - Math.round(this.spriteSheet.dimX/2);
		var drawY = this.y - Math.round(this.spriteSheet.dimY);

		ctx.drawImage(this.spriteSheet.image, 
					  0, 0, this.dimX, this.dimY,
					  drawX, drawY, this.dimX, this.dimY);
	}
}