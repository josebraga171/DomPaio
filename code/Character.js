"use strict"

class Character extends Entity{
	//x/y: character position (upper left corner);
	//health: character health level, to be increased or depleted;
	//attack: ammount of hit points it deals to another character;
	//speed: movement multiplier, constant throughout the game;
	//animSheet: image containing all the sprites (animations) for the character;

	constructor(x, y, spriteSheet, colX, colY, health, attack, speed){
		super(x, y, spriteSheet, colX, colY);

		this.health = health;
		this.attack = attack;
		this.speed = speed;
		
		this.maxHealth = this.health;

		this.dimX = this.spriteSheet.dimX;
		this.dimY = this.spriteSheet.dimY;
	}
}