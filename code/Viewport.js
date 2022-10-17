"use strict"

class Viewport{
	//x/y: viewport position;
	//width/height: viewport dimensions;

	//snapTo: adjust viewport position to be centered on a given entity;

	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	snapTo(entity){
		this.x = entity.x - Math.round(this.width/2);
		this.y = entity.y - Math.round(entity.dimY/2) - Math.round(this.height/2);
	}
}