"use strict"

class CollisionBox{
	//entity: player/enemy to which the box is attached;
	//dimX/dimY: dimensions of collision box;
	//offsetX/offsetY: offset in relation to player possition;
	//collides: array containing collision booleans for all four sides of the player;

	//draw: draw hit box (geometric) on the given canvas;
	//updatePos: update absolute coordinates of collision box;
	//updateCollision: update array "collides" according to image data of the given canvas;
	//checkLeft/checkLower/checkRight/checkUpper: check collision on the sides of the collision box;
	//checkPixel: check opacity of a pixel in a given canvas;

	constructor(entity, dimX, dimY, offsetX, offsetY){
		this.entity = entity;

		this.dimX = dimX;
		this.dimY = dimY;

		this.offsetX = offsetX;
		this.offsetY = offsetY;

		this.collides = new Array();
	}

	updatePos(){
		this.absX = this.entity.x + this.offsetX;
		this.absY = this.entity.y + this.offsetY;
	}

	draw(ctx){
		this.updatePos();

		ctx.fillRect(this.absX, this.absY,
					 this.dimX, this.dimY);
	}

	updateCollision(ctx){
		this.updatePos();

		//Direction guide: 0 = left, 1 = down, 2 = right, 3 = up;
		this.collides[0] = this.checkLeft(ctx);
		this.collides[1] = this.checkLower(ctx);
		this.collides[2] = this.checkRight(ctx);
		this.collides[3] = this.checkUpper(ctx);
	}

	checkPixel(ctx, x, y){
		//Array of values for chosen pixel;
		var pixelData = ctx.getImageData(x, y, 1, 1).data;
		if(pixelData[3] != 0) return true;
		else return false;
	}

	checkLeft(ctx){
		if(this.checkPixel(ctx, this.absX - 1, this.absY)){
			return true;
		}

		if(this.checkPixel(ctx, this.absX - 1, this.absY + this.dimY - 1)){
			return true;
		}

		return false;
	}

	checkLower(ctx){
		if(this.checkPixel(ctx, this.absX, this.absY + this.dimY)){
			return true;
		} 

		if(this.checkPixel(ctx, this.absX + this.dimX - 1, this.absY + this.dimY)){
			return true;
		}

		return false;
	}

	checkRight(ctx){
		if(this.checkPixel(ctx, this.absX + this.dimX, this.absY)){
			return true;
		} 

		if(this.checkPixel(ctx, this.absX + this.dimX, this.absY + this.dimY - 1)){
			return true;
		}

		return false;
	}

	checkUpper(ctx){
		if(this.checkPixel(ctx, this.absX, this.absY - 1)){
			return true;
		} 

		if(this.checkPixel(ctx, this.absX + this.dimX - 1, this.absY - 1)){
			return true;
		}

		return false;
	}
}