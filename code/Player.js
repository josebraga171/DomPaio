"use strict"

class Player extends Character{
	//x/y: character position (upper left corner);
	//health: character health level, to be increased or depleted;
	//attack: ammount of hit points it deals to another character;
	//speed: movement multiplier, constant throughout the game;
	//spriteSheet: image containing all the sprites (animations) for the character;

	//draw: draw current player sprite on the given canvas;
	//updateAnim: update current frame of current player animation;
	//resetAnim: simply reset frame parameter to zero (for animation transitions);
	//updateHealth: subtract or retore health to the player;
	//hitEnemy: play sword hit sound and take health from the enemy;

	constructor(x, y, spriteSheet, colX, colY, health, attack, speed){
		super(x, y, spriteSheet, colX, colY, health, attack, speed)

		this.maxHealth = this.health;

		this.dimX = this.spriteSheet.dimX;
		this.dimY = this.spriteSheet.dimY;

		this.anim = 0;
		this.frame = 0;

		this.dead = false;
		this.win = false;

		this.moving = false;
		this.attacking = false;

		this.direction = new Array();
		this.enemyArray = new Array();

		this.direction[0] = false;
		this.direction[1] = false;
		this.direction[2] = true;
		this.direction[3] = false;

		this.pickups = 0;

		this.score = 0;

		this.isHealing = false;

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

		if(this.win)
			this.anim = 9;

		ctx.drawImage(this.spriteSheet.image,
					  this.frame * this.dimX, this.anim * this.dimY, this.dimX, this.dimY,
					  drawX, drawY, this.dimX, this.dimY);
	}

	updateAnim(){
		if(this.attacking){
			this.frame = (this.frame + 1) % 8;

			if(this.frame == 7){
				this.resetAnim();
				this.attacking = false;
			}

			if(this.frame == 3){
				var soundRdm  = Math.floor(Math.random() * 3);
				var swordSwingSound = document.getElementsByTagName("audio")[soundRdm];
				swordSwingSound.volume = 0.5 * parent.som;
				swordSwingSound.play();
			}

			for(let i = 0; i < this.enemyArray.length; i++){

				switch (this.anim){
					case (5):
						if((this.x - this.enemyArray[i].x) < 30 && (this.x - this.enemyArray[i].x) > 0 &&
							Math.abs(this.y - this.enemyArray[i].y) < 15){

							if(this.frame == 5 && this.enemyArray[i].dead == false){
								this.hitEnemy(i);
							}
						}
						break;

					case (4):
						if((this.enemyArray[i].x - this.x) < 30 && (this.enemyArray[i].x - this.x) > 0 &&
							Math.abs( this.y - this.enemyArray[i].y ) < 15){

							if(this.frame == 5 && this.enemyArray[i].dead == false){
								this.hitEnemy(i);
							}
						}

						break;

					case (7):
						if((this.enemyArray[i].y - this.y) < 30 && (this.enemyArray[i].y - this.y) > 0 &&
							Math.abs( this.x - this.enemyArray[i].x ) < 15){

							if(this.frame == 5 && this.enemyArray[i].dead == false){
								this.hitEnemy(i);
							}
						}

						break;

					case (6):
						if((this.y - this.enemyArray[i].y) < 30 && (this.y - this.enemyArray[i].y) > 0 &&
							Math.abs( this.x - this.enemyArray[i].x ) < 15){

							if(this.frame == 5 && this.enemyArray[i].dead == false){
								this.hitEnemy(i);
							}
						}

						break;
				}
			}
		}

		else if(this.moving){
			this.frame = (this.frame + 1) % 8;
		}

		else if(this.win){
			if(this.frame == 7){
				parent.score[parent.numero_jogadores-1] = this.score;
			}

			else{
				this.frame = (this.frame + 1);
			}
		}

		else
			this.resetAnim();
	}


	resetAnim(){
		this.frame = 0;
	}

	updateHealth(val){
		if(this.health > 0){
			this.health += val;
		}

		if(this.health >= this.maxHealth){
			this.health = this.maxHealth;
		}

		if(this.health <= 0){
			this.health = 0;
			this.dead = true;
			this.moving = false;
			this.attacking = false;
			this.resetAnim();

			var deathSound = document.getElementsByTagName("audio")[6];
			deathSound.volume = 0.5 * parent.som;
			deathSound.play();

			var deathMusic = document.getElementsByTagName("audio")[14];
			deathMusic.volume = 0.5 * parent.mus;
			deathMusic.play();

		}
	}

	hitEnemy(eNum){
		var swordHit = document.getElementsByTagName("audio")[3];
		swordHit.volume = 0.5 * parent.som;
		swordHit.play();

		this.enemyArray[eNum].updateHealth(-this.attack);
	}
}
