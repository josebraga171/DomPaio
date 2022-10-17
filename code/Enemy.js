"use strict"

class Enemy extends Character{
	//x/y: character position (upper left corner);
	//spriteSheet: image containing all the sprites (animations) for the character;
	//health: character health level, to be increased or depleted;
	//attack: ammount of hit points it deals to another character;
	//speed: movement multiplier, constant throughout the game;
	//playerInfo: player object, access player variables easily;

	//draw: draw current player sprite on the given canvas;
	//updateAnim: update current frame of current player animation;
	//resetAnim(): simply reset frame parameter to zero (for animation transitions);

	constructor(x, y, spriteSheet, colX, colY, health, attack, speed, playerInfo){
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

		this.typeOfPatrulha = Math.floor(Math.random() * (5 - +1) ) + +1;

		this.direction[0] = false;
		this.direction[1] = false;
		this.direction[2] = false;
		this.direction[3] = false;

		this.countPatrulhaFrames = 0;
		this.playerDetected = false;

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

		if(this.dead){
			this.anim = 8;
			this.playerDetected = false;
			this.collisionBox.offsetX = -1000;
			this.collisionBox.offsetY = -1000;
			this.collisionBox.updatePos();
		}

		ctx.drawImage(this.spriteSheet.image,
					  this.frame * this.dimX, this.anim * this.dimY, this.dimX, this.dimY,
					  drawX, drawY, this.dimX, this.dimY);
	}

	updateAnim(){
		if(!this.dead && !this.playerInfo.dead && !this.playerInfo.win){

			this.frame = (this.frame + 1) % 8;

			if(this.playerDetected){
				this.killPlayer();
				this.beginPatrulha = false;
			}


			if(this.beginPatrulha){
				switch(this.typeOfPatrulha){
					case(1):
						this.patrulha_Tipo_A();
						break;
					case(2):
						this.patrulha_Tipo_B();
						break;
					case(3):
						this.patrulha_Tipo_C();
						break;
					case(4):
						this.patrulha_Tipo_D();
						break;
				}
			}
		}
	}

	patrulha_Tipo_A(){

			this.searchPlayer();

			this.countPatrulhaFrames++;

			this.direction[0] = false;
			this.direction[1] = false;
			this.direction[2] = false;
			this.direction[3] = false;

			if ( this.countPatrulhaFrames <= 32 ){
				this.direction[0] = true;
				this.x -= this.speed;
			}

			else if ( this.countPatrulhaFrames <= 48 ){
				this.direction[3] = true;
				this.y += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 64 ){
				this.direction[2] = true;
				this.x += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 96 ){
				this.direction[1] = true;
				this.y -= this.speed;
			}

			else if ( this.countPatrulhaFrames <= 112 ){
				this.direction[2] = true;
				this.x += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 128 ){
				this.direction[3] = true;
				this.y += this.speed;
			}

			else if ( this.countPatrulhaFrames > 128 ){
				this.countPatrulhaFrames = 0;

			}
	}


	patrulha_Tipo_B(){

		this.searchPlayer();

			this.countPatrulhaFrames++;

			this.direction[0] = false;
			this.direction[1] = false;
			this.direction[2] = false;
			this.direction[3] = false;

			if ( this.countPatrulhaFrames <= 16 ){
				this.direction[0] = true;
				this.x -= this.speed;
			}

			else if ( this.countPatrulhaFrames <= 32 ){
				this.direction[3] = true;
				this.y += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 48 ){
				this.direction[2] = true;
				this.x += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 64 ){
				this.direction[1] = true;
				this.y -= this.speed;
			}
			else if ( this.countPatrulhaFrames > 64 ){
				this.countPatrulhaFrames = 0;
			}

	}

	patrulha_Tipo_C(){

		this.searchPlayer();

			this.countPatrulhaFrames++;

			this.direction[0] = false;
			this.direction[1] = false;
			this.direction[2] = false;
			this.direction[3] = false;

			if ( this.countPatrulhaFrames <= 32 ){
				this.direction[2] = true;
				this.x += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 64 ){
				this.direction[0] = true;
				this.x -= this.speed;
			}

			else if ( this.countPatrulhaFrames > 64 ){
				this.countPatrulhaFrames = 0;
			}

	}

	patrulha_Tipo_D(){

		this.searchPlayer();

		this.countPatrulhaFrames++;

			this.direction[0] = false;
			this.direction[1] = false;
			this.direction[2] = false;
			this.direction[3] = false;

			if ( this.countPatrulhaFrames <= 32 ){
				this.direction[3] = true;
				this.y += this.speed;
			}

			else if ( this.countPatrulhaFrames <= 64 ){
				this.direction[1] = true;
				this.y -= this.speed;
			}

			else if ( this.countPatrulhaFrames > 64 ){
				this.countPatrulhaFrames = 0;
			}

	}




	resetAnim(){
		this.frame = 0;
	}

	searchPlayer(){

		switch(this.anim){
			case(0):
				 if ((this.x - this.playerInfo.x) < 75 && (this.x - this.playerInfo.x ) > 0 &&
				 	Math.abs( this.y - this.playerInfo.y ) < 50){

					this.playerDetected = true;
				}
			break;

			case(1):
				if ( ( this.playerInfo.x - this.x ) < 75 && ( this.playerInfo.x - this.x ) > 0 &&
					Math.abs( this.y - this.playerInfo.y ) < 50){

					this.playerDetected = true;
				}
			break;

			case(2):
				if ( ( this.playerInfo.y - this.y ) < 75 && ( this.playerInfo.y - this.y ) > 0 &&
					Math.abs( this.x - this.playerInfo.x ) < 50){

					this.playerDetected = true;
				}
			break;

			case(3):
				if ((this.y - this.playerInfo.y) < 75 && (this.y - this.playerInfo.y) > 0 &&
					Math.abs( this.x - this.playerInfo.x ) < 50){

					this.playerDetected = true;
				}
			break;

		}

		if( this.playerDetected == true ){

			var detection = document.getElementsByTagName("audio")[9];
			detection.volume =  0.2 * parent.som;
			detection.play();

		}
	}

	killPlayer(){

		var dif_X = this.x - this.playerInfo.x;
		var dif_Y = this.y - this.playerInfo.y;
		var dif_Eixos = dif_X - dif_Y;

		if (Math.abs( dif_X ) + Math.abs( dif_Y ) < 25){
			this.attacking = true;

			if(this.frame == 3){
				var swordSwing = document.getElementsByTagName("audio")[7];
				swordSwing.volume = 0.5 * parent.som;
				swordSwing.play();
			}

			if(this.frame == 5){
				var swordHit = document.getElementsByTagName("audio")[5];
				swordHit.volume = 0.5 * parent.som;
				swordHit.play();

				this.playerInfo.updateHealth(-this.attack);

				if(this.playerInfo.health == 0){
					this.playerDetected = false;
				}
			}

		}

		if (!this.attacking){
			if(Math.abs(dif_X) < 20 && dif_Y > 20){
				this.direction[0] = false;
				this.direction[1] = true;
				this.direction[2] = false;
				this.direction[3] = false;
				if(!this.collisionBox.collides[1])
					this.y -= this.speed;
			}

			else if(Math.abs(dif_X) < 20 && dif_Y < -20){
				this.direction[0] = false;
				this.direction[1] = false;
				this.direction[2] = false;
				this.direction[3] = true;
				if(!this.collisionBox.collides[3])
					this.y += this.speed;
			}

			else if(Math.abs(dif_Y) < 20 && dif_X > 20){
				this.direction[0] = true;
				this.direction[1] = false;
				this.direction[2] = false;
				this.direction[3] = false;
				if(!this.collisionBox.collides[0])
					this.x -= this.speed;
			}

			else if(Math.abs(dif_Y) < 20 && dif_X < -20){
				this.direction[0] = false;
				this.direction[1] = false;
				this.direction[2] = true;
				this.direction[3] = false;
				if(!this.collisionBox.collides[2])
					this.x += this.speed;
			}


			else{
				if(dif_X < 0){
					this.direction[0] = false;
					this.direction[1] = false;
					this.direction[2] = true;
					this.direction[3] = false;
					if(!this.collisionBox.collides[2])
						this.x += this.speed;
				}
				else{
					this.direction[0] = true;
					this.direction[1] = false;
					this.direction[2] = false;
					this.direction[3] = false;
					if(!this.collisionBox.collides[0])
						this.x -= this.speed;
				}

				if(dif_Y < 0){
					this.direction[0] = false;
					this.direction[1] = false;
					this.direction[2] = false;
					this.direction[3] = true;
					if(!this.collisionBox.collides[3])
						this.y += this.speed;
				}
				else{
					this.direction[0] = false;
					this.direction[1] = true;
					this.direction[2] = false;
					this.direction[3] = false;
					if(!this.collisionBox.collides[1])
						this.y -= this.speed;
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
