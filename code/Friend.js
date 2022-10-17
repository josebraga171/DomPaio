"use strict"

class Friend extends Character{
	//x/y: character position (upper left corner);
	//spriteSheet: image containing all the sprites (animations) for the character;
	//health: character health level, to be increased or depleted;
	//attack: ammount of hit points it deals to another character;
	//speed: movement multiplier, constant throughout the game;
	//playerInfo: player object, access player variables easily;

	//draw: draw current player sprite on the given canvas;
	//updateAnim: update current frame of current player animation;
	//resetAnim(): simply reset frame parameter to zero (for animation transitions);

	constructor(x, y, spriteSheet, colX, colY, health, attack, speed, playerInfo, enemyArray){
		super(x, y, spriteSheet, colX, colY, health, attack, speed)

		this.dimX = this.spriteSheet.dimX;
		this.dimY = this.spriteSheet.dimY;

		this.anim = 0;
		this.frame = 0;

		this.moving = false;
		this.attacking = false;
		this.beginPatrulha = true;

		this.direction = new Array();
		this.playerArray = new Array();

		this.playerInfo = playerInfo;
		this.enemyArray = enemyArray;
		this.stop = false;
		this.chasingEnemy = false;
		this.enemyNumber = -1;

		this.direction[0] = false;
		this.direction[1] = false;
		this.direction[2] = false;
		this.direction[3] = false;

		this.dead = false;

		this.aux = 0;

		this.keys = new Array();

		//Attach collision boxes;
		this.collisionBox = new CollisionBox(this, this.colX, this.colY, -Math.round(this.colX/2), -this.colY);
	}

	draw(ctx){
		var drawX = Math.round(this.x - this.spriteSheet.dimX/2);
		var drawY = Math.round(this.y - this.spriteSheet.dimY);

		if (this.direction[0])
			this.anim = 0;
		if (this.direction[1])
			this.anim = 3;
		if (this.direction[2])
			this.anim = 1;
		if (this.direction[3])
			this.anim = 2;

		if (this.attacking){
			if (this.direction[0])
				this.anim = 5;
			if (this.direction[1])
				this.anim = 6;
			if (this.direction[2])
				this.anim = 4;
			if (this.direction[3])
				this.anim = 7;
		}

		if(this.dead)
			this.anim = 8;

		ctx.drawImage(this.spriteSheet.image,
					  this.frame * this.dimX, this.anim * this.dimY, this.dimX, this.dimY,
					  drawX, drawY, this.dimX, this.dimY);
	}

	updateAnim(){
		if(!this.dead && !this.playerInfo.dead && !this.playerInfo.win){
			if(!this.stop){
				this.frame = (this.frame + 1) % 8;
			}
			else{
				this.resetAnim();
			}
			if(!this.chasingEnemy)
				this.followPlayer();
			else
				this.searchEnemy();
		}
	}

	resetAnim(){
		this.frame = 0;
	}

//FOLLOW PLAYER
	followPlayer(){
//		console.log("following");

		var dif_X = this.x - this.playerInfo.x;
		var dif_Y = this.y - this.playerInfo.y;
		var dif_Eixos = dif_X - dif_Y;

		if(Math.abs( dif_X ) + Math.abs( dif_Y ) > 90){
			this.speed = 6;
		}
		else{
			this.speed = 3;
		}


		if (Math.abs( dif_X ) + Math.abs( dif_Y ) < 50){
			this.resetAnim();
			this.searchEnemy();
		}

		else{

			this.stop = true;

			if(Math.abs(dif_X) < 20 && dif_Y > 20){
				this.direction[0] = false;
				this.direction[1] = true;
				this.direction[2] = false;
				this.direction[3] = false;
				if(!this.collisionBox.collides[1]){
					this.stop = false;
					this.y -= this.speed;
				}
			}

			else if(Math.abs(dif_X) < 20 && dif_Y < -20){
				this.direction[0] = false;
				this.direction[1] = false;
				this.direction[2] = false;
				this.direction[3] = true;
				if(!this.collisionBox.collides[3]){
					this.y += this.speed;
					this.stop = false;
				}
			}

			else if(Math.abs(dif_Y) < 20 && dif_X > 20){
				this.direction[0] = true;
				this.direction[1] = false;
				this.direction[2] = false;
				this.direction[3] = false;
				if(!this.collisionBox.collides[0]){
					this.x -= this.speed;
					this.stop = false;
				}
			}

			else if(Math.abs(dif_Y) < 20 && dif_X < -20){
				this.direction[0] = false;
				this.direction[1] = false;
				this.direction[2] = true;
				this.direction[3] = false;
				if(!this.collisionBox.collides[2]){
					this.x += this.speed;
					this.stop = false;
				}
			}

			else{
				if(dif_X < 0){
					this.direction[0] = false;
					this.direction[1] = false;
					this.direction[2] = true;
					this.direction[3] = false;
					if(!this.collisionBox.collides[2]){
						this.x += this.speed;
						this.stop = false;
					}
				}
				else{
					this.direction[0] = true;
					this.direction[1] = false;
					this.direction[2] = false;
					this.direction[3] = false;
					if(!this.collisionBox.collides[0]){
						this.x -= this.speed;
						this.stop = false;
					}
				}

				if(dif_Y < 0){
					this.direction[0] = false;
					this.direction[1] = false;
					this.direction[2] = false;
					this.direction[3] = true;
					if(!this.collisionBox.collides[3]){
						this.y += this.speed;
						this.stop = false;
					}
				}
				else{
					this.direction[0] = false;
					this.direction[1] = true;
					this.direction[2] = false;
					this.direction[3] = false;
					if(!this.collisionBox.collides[1]){
						this.y -= this.speed;
						this.stop = false;
					}
				}
			}
		}
		if( this.frame == 7 && this.attacking == true ){
			this.resetAnim();
			this.attacking = false;
		}

	}

	//CLOSE ENOUGH TO PLAYER, SEARCH ANY ENEMY BETWEEN A CERTAIN RANGE
		searchEnemy(){
			this.chasingEnemy = false;
			//console.log("searching");
			for(let i = 0; i < this.enemyArray.length; i++){
				if(this.enemyArray[i].playerDetected){
					var dif_X = this.x - this.enemyArray[i].x;
					var dif_Y = this.y - this.enemyArray[i].y;
					if (Math.abs( dif_X ) + Math.abs( dif_Y ) < 100){
						let k = i;
						if(!this.enemyArray[i].dead){
							if(this.enemyNumber == -1){
								this.enemyNumber = k;
							}
							this.chasingEnemy = true;
							//console.log("este"+this.enemyNumber);
							this.killEnemy(this.enemyNumber);
						}
					}
				}
			}
		}

//ENEMY TO BE KILLED
	killEnemy(k){
		//console.log("killing");
	//	console.log(k);

		var dif_X = this.x - this.enemyArray[k].x;
		var dif_Y = this.y - this.enemyArray[k].y;
		var dif_Eixos = dif_X - dif_Y;

		if (Math.abs( dif_X ) + Math.abs( dif_Y ) < 25){
				this.attacking = true;
				if(this.frame == 5){

					var swordHit = document.getElementsByTagName("audio")[15];
					swordHit.volume = 0.5 * parent.som;
					swordHit.play();

					this.enemyArray[k].updateHealth(-this.attack);
					if(this.enemyArray[k].health <= 0){
						this.chasingEnemy = false;
						this.attacking = false;
						this.enemyNumber = -1;
					}
				}
			}

		else if(!this.attacking){

			this.stop = true;

			if(Math.abs(dif_X) < 20 && dif_Y > 20){
				this.direction[0] = false;
				this.direction[1] = true;
				this.direction[2] = false;
				this.direction[3] = false;
				if(!this.collisionBox.collides[1]){
					this.stop = false;
					this.y -= this.speed;
				}
			}

			else if(Math.abs(dif_X) < 20 && dif_Y < -20){
				this.direction[0] = false;
				this.direction[1] = false;
				this.direction[2] = false;
				this.direction[3] = true;
				if(!this.collisionBox.collides[3]){
					this.y += this.speed;
					this.stop = false;
				}
			}

			else if(Math.abs(dif_Y) < 20 && dif_X > 20){
				this.direction[0] = true;
				this.direction[1] = false;
				this.direction[2] = false;
				this.direction[3] = false;
				if(!this.collisionBox.collides[0]){
					this.x -= this.speed;
					this.stop = false;
				}
			}

			else if(Math.abs(dif_Y) < 20 && dif_X < -20){
				this.direction[0] = false;
				this.direction[1] = false;
				this.direction[2] = true;
				this.direction[3] = false;
				if(!this.collisionBox.collides[2]){
					this.x += this.speed;
					this.stop = false;
				}
			}

			else{
				if(dif_X < 0){
					this.direction[0] = false;
					this.direction[1] = false;
					this.direction[2] = true;
					this.direction[3] = false;
					if(!this.collisionBox.collides[2]){
						this.x += this.speed;
						this.stop = false;
					}
				}
				else{
					this.direction[0] = true;
					this.direction[1] = false;
					this.direction[2] = false;
					this.direction[3] = false;
					if(!this.collisionBox.collides[0]){
						this.x -= this.speed;
						this.stop = false;
					}
				}

				if(dif_Y < 0){
					this.direction[0] = false;
					this.direction[1] = false;
					this.direction[2] = false;
					this.direction[3] = true;
					if(!this.collisionBox.collides[3]){
						this.y += this.speed;
						this.stop = false;
					}
				}
				else{
					this.direction[0] = false;
					this.direction[1] = true;
					this.direction[2] = false;
					this.direction[3] = false;
					if(!this.collisionBox.collides[1]){
						this.y -= this.speed;
						this.stop = false;
					}
				}
			}
	}
		if( this.frame == 7 && this.attacking == true ){
			this.resetAnim();
			this.attacking = false;
		}

	}


	updateHealth(val){
		if(this.health > 0 && this.health <= this.maxHealth){
			this.health += val;
		}

		if(this.health <= 0 && this.aux == 0){
			this.aux++;
			var enemyDeath = document.getElementsByTagName("audio")[4];
			enemyDeath.volume = 0.5 * parent.som;
			enemyDeath.play();

			this.dead = true;
			this.playerInfo.score += 25;

			this.resetAnim();
		}
	}

}
