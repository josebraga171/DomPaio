"use strict"

//checkTrigger: check if player is on trigger area;

class Trigger{

	constructor(x, y, spriteSheet){
		this.x = x;
		this.y = y;

		this.drawCheck = true;
	}

	checkTrigger(player){
		var distX = this.x - player.x;
		var distY = this.y - player.y;

		if (Math.abs( distX ) + Math.abs(distY) < 24 && this.drawCheck){
			this.drawCheck=false;
			return true;
		}

		else return false;
	}
}