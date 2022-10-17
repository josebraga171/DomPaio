"use strict"

//draw: draw pick-up item on given canvas;
//updatePickUp: check if player is nearby;

class Pickup{

	constructor(x, y, spriteSheet, type){
		
		this.x=x;
		this.y=y;

		this.spriteSheet=spriteSheet;

		if(type == "v") this.vinho = true;
		if(type == "c") this.coroa = true;

		this.dimX = this.spriteSheet.dimX;
		this.dimY = this.spriteSheet.dimY

		this.drawCheck=true;
	}

	draw(ctx){

		if(this.drawCheck==true){
			var drawX = this.x - Math.round(this.spriteSheet.dimX/2);
			var drawY = this.y - Math.round(this.spriteSheet.dimY);

			ctx.drawImage(this.spriteSheet.image, 
						  0, 0, this.dimX, this.dimY,
						  drawX, drawY, this.dimX, this.dimY);
		}
	}

	updatePickUp(player){
		var distX = this.x - player.x;
		var distY = this.y - player.y;

		if (Math.abs( distX ) + Math.abs( distY ) < 20 && this.drawCheck==true){
			if(this.vinho){
				this.drawCheck = false;
				player.speed *= 2;
				var drink = document.getElementsByTagName("audio")[12];
				drink.volume =  0.5 * parent.som;
				drink.play();
			}

			else if(this.coroa == true ){
				parent.numero_jogadores += 1;
				player.resetAnim();

				this.drawCheck=false;
				player.win = true;
				var winSound = document.getElementsByTagName("audio")[13];
				winSound.volume =  0.5 * parent.som;
				winSound.play();
			}

			else if(player.pickups < 9){
				this.drawCheck = false;
				player.pickups += 1;
				var pick = document.getElementsByTagName("audio")[11];
				pick.volume =  0.5 * parent.som;
				pick.play();
			}

		}
	}

}