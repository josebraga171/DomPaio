"use strict"

class UI{

	constructor(player, healthSheet, healthBorderSheet, deadSheet, squareSheet, numberSheet, winScreen){
		this.player = player;

		this.healthSheet = healthSheet;

		this.healthBorderSheet = healthBorderSheet;

		this.deadSheet = deadSheet;

		this.winScreen = winScreen;

		this.squareSheet = squareSheet;

		this.numberSheet = numberSheet;
	}

	draw(ctx){
		var dimX = this.healthBorderSheet.dimX;
		var dimY = this.healthBorderSheet.dimY;

		ctx.drawImage(this.healthBorderSheet.image, 5, 5, dimX, dimY);

		var dimX = this.healthSheet.dimX;
		var dimY = this.healthSheet.dimY;

		ctx.drawImage(this.healthSheet.image, 
					0, 0, (dimX/100) * this.player.health, dimY, 
					6, 6, (dimX/100) * this.player.health, dimY);

		var dimX = this.squareSheet.dimX;
		var dimY = this.squareSheet.dimY;

		ctx.drawImage(this.squareSheet.image, 5, 155, dimX, dimY);

		if(this.player.health==0){
			var dimX = this.deadSheet.dimX;
			var dimY = this.deadSheet.dimY;

			ctx.drawImage(this.deadSheet.image, 23 ,30, dimX, dimY);
		}

		var dimX = this.numberSheet.dimX;
		var dimY = this.numberSheet.dimY;

		ctx.drawImage(this.numberSheet.image, 
					  this.player.pickups * dimX, 0, dimX, dimY, 
					  23, 169, dimX, dimY);

		if(this.player.win){
			var dimX = this.winScreen.dimX;
			var dimY = this.winScreen.dimY;

			ctx.drawImage(this.winScreen.image, 23, 30, dimX, dimY);
		}
	}
}