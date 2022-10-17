"use strict";

(function(){
	window.addEventListener("load", main);
}());

////////////////////////////////////////////////////////////////////////////////////////////////////

function main(){
	var loaded = 0;
	var total = 24;

	var frameNum = 0;
	var frameCycle = 5;

	var keys = new Array;
	var entities = new Array();
	var enemyArray = new Array();
	var friendsArray = new Array();
	var pickupArray = new Array();

	var mapReader = new MapReader();

	var levelCounter = 1;

	var bgSoundFlag = false;
	var firstLoad = true;

	//HTML buttons;
	var sairB  =  document.getElementById("sairBotao");
	var replayB  =  document.getElementById("replayBotao");

	//Key listeners (movement);
	window.addEventListener("keydown", function(ev){
		keys[ev.keyCode] = true;
	});

	window.addEventListener("keyup", function(ev){
		keys[ev.keyCode] = false;
	});

	//..............................................................................................
	//Load image assets;


	var level1 = mapReader.readMap("levels/level" + levelCounter + ".txt");

	var layout1 = new Image();
	layout1.id = "layout1";
	layout1.addEventListener("load", loadHandler);
	layout1.src = "assets/Level1.png";

	var layout2 = new Image();
	layout2.id = "layout2";
	layout2.addEventListener("load", loadHandler);
	layout2.src = "assets/Level2.png";

	var layout3 = new Image();
	layout3.id = "layout3";
	layout3.addEventListener("load", loadHandler);
	layout3.src = "assets/Level3.png";

	var playerAnim = new Image();
	playerAnim.id = "playerAnim";
	playerAnim.addEventListener("load", loadHandler);
	playerAnim.src = "assets/AnimSheetKnightBlackVersion.png";

	var playerFriend = new Image();
	playerFriend.id = "playerFriend";
	playerFriend.addEventListener("load",loadHandler);
	playerFriend.src = "assets/AnimSheetKnight.png";

	var enemyAnim = new Image();
	enemyAnim.id = "enemyAnim";
	enemyAnim.addEventListener("load", loadHandler);
	enemyAnim.src = "assets/AnimSheetEnemy.png";

	var enemyAnim2 = new Image();
	enemyAnim2.id = "enemyAnim2";
	enemyAnim2.addEventListener("load", loadHandler);
	enemyAnim2.src = "assets/AnimSheetEnemyYellow.png";

	var barrelSprite = new Image();
	barrelSprite.id = "barrelSprite";
	barrelSprite.addEventListener("load", loadHandler);
	barrelSprite.src = "assets/BarrelSprite.png";

	var boxV1 = new Image();
	boxV1.id = "boxV1";
	boxV1.addEventListener("load", loadHandler);
	boxV1.src = "assets/BoxV1.png";

	var treeV1 = new Image();
	treeV1.id = "treeV1";
	treeV1.addEventListener("load", loadHandler);
	treeV1.src = "assets/TreeV1.png";

	var rockV1 = new Image();
	rockV1.id = "rockV1";
	rockV1.addEventListener("load", loadHandler);
	rockV1.src = "assets/RockV1.png";

	var bushV1 = new Image();
	bushV1.id = "bushV1";
	bushV1.addEventListener("load", loadHandler);
	bushV1.src = "assets/BushV1.png";

	var health = new Image();
	health.id = "health";
	health.addEventListener("load",loadHandler);
	health.src = "assets/Health.png";

	var healthBorder = new Image();
	healthBorder.id = "healthBorder";
	healthBorder.addEventListener("load",loadHandler);
	healthBorder.src = "assets/HealthBorder.png";

	var deadScreen = new Image();
	deadScreen.id = "deadScreen";
	deadScreen.addEventListener("load",loadHandler);
	deadScreen.src = "assets/Dead.png";

	var winScreen = new Image();
	winScreen.id = "winScreen";
	winScreen.addEventListener("load",loadHandler);
	winScreen.src = "assets/Vitoria.png";

	var square = new Image();
	square.id = "square";
	square.addEventListener("load",loadHandler);
	square.src = "assets/Square.png";

	var numbers = new Image();
	numbers.id = "numbers";
	numbers.addEventListener("load",loadHandler);
	numbers.src = "assets/Numbers.png";

	var chorizo = new Image();
	chorizo.id = "chorizo";
	chorizo.addEventListener("load",loadHandler);
	chorizo.src = "assets/Chorizo.png";

	var coroa = new Image();
	coroa.id = "coroa";
	coroa.addEventListener("load",loadHandler);
	coroa.src = "assets/Coroa.png";

	var muslimTent = new Image();
	muslimTent.id = "muslimTent";
	muslimTent.addEventListener("load", loadHandler);
	muslimTent.src = "assets/WarTentMuslim.png";

	var poteNumPau = new Image();
	poteNumPau.id = "poteNumPau";
	poteNumPau.addEventListener("load", loadHandler);
	poteNumPau.src = "assets/PoteNumPau.png";

	var fogueira = new Image();
	fogueira.id = "fogueira";
	fogueira.addEventListener("load", loadHandler);
	fogueira.src = "assets/Fogueira.png";

	var vinho = new Image();
	vinho.id = "vinho";
	vinho.addEventListener("load",loadHandler);
	vinho.src = "assets/Vinho.png";

	//..............................................................................................

	//Only visible canvas, equivalent to a camera or the game window;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//Scaled up to 4x;
	ctx.imageSmoothingEnabled = false;
	ctx.scale(4, 4);

	//For tileset (terrain and static boundaries);
	var layoutCanvas = document.getElementById("layoutCanvas");
	var layoutCtx = layoutCanvas.getContext("2d");

	//For entities and objects;
	var entityCanvas = document.getElementById("entityCanvas");
	var entityCtx = entityCanvas.getContext("2d");

	//For dynamic collision boxes (entities);
	var entityHitCanvas = document.getElementById("entityHitCanvas");
	var entityHitCtx = entityHitCanvas.getContext("2d");

	////////////////////////////////////////////////////////////////////////////////////////////////

	function loadHandler(ev){
		var img = ev.target;

		loaded++;

		if(loaded == total){
			//Declare camera dimensions and starting point;
			var cam = new Viewport(0, 0, 192, 192);

			var reqID;

			nextLevel(levelCounter, ctx, cam, reqID);
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	function gameLoop(ctx, cam, player, ui, trigger){
		var t = function(time){
			gameLoop(ctx, cam, player, ui, trigger);
		}

		var reqID = window.requestAnimationFrame(t);

		//Update enemyArray inside player class, for attacking;
		player.enemyArray = enemyArray;

		//Sort entities by Y, for drawing purposes;
		entities.sort(function(a, b){
			return ((a.y) - (b.y));
		});

		//Play background sound;
		if(!bgSoundFlag){
			//console.log("ddd");
			bgSoundFlag = true;
			var background_sound = document.getElementsByTagName("audio")[8];
			background_sound.volume = 0.1 * parent.som;
			background_sound.play();
		}

		//Check for player on next level trigger;
		if (trigger.checkTrigger(player)){
			levelCounter += 1;
			cancelAnimationFrame(reqID);
			nextLevel(levelCounter, ctx, cam, player, reqID);
		}

		//Movement, attack, block;
		handleAction(ctx, cam, player, trigger);

		//Draw layers onto viewport canvas;
		render(ctx, cam, player, ui, trigger);

		//Frame cicle resets every x frames (animation timer);
		frameNum += 1;

		if(frameNum % frameCycle == 0){
			frameNum = 0;
			player.updateAnim();
			for(let i = 0; i < enemyArray.length; i++){
				enemyArray[i].updateAnim();
			}
			for(let k = 0; k < friendsArray.length; k++){
				friendsArray[k].updateAnim();
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	function render(ctx, cam, player, ui, trigger){
		entityCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		entityHitCtx.clearRect(cam.x, cam.y, cam.width, cam.height);

		for(let i = 0; i < pickupArray.length; i++){
			pickupArray[i].draw(entityCtx);
		}

		for(let i = 0; i < entities.length; i++){
			entities[i].draw(entityCtx);
			entities[i].collisionBox.draw(entityHitCtx);
		}

		//..........................................................................................
		/*
		ctx.drawImage(image,
					  offset x, offset y, crop size x, crop size y,
					  pos x, pos y, size x, size y);
		*/

		ctx.clearRect(0, 0, cam.width, cam.height);

		ctx.drawImage(layoutCanvas,
					  cam.x, cam.y, cam.width, cam.height,
					  0, 0, cam.width, cam.height);

		ctx.drawImage(entityCanvas,
					  cam.x, cam.y, cam.width, cam.height,
					  0, 0, cam.width, cam.height);

		/*ctx.font = "15px Georgia";
		if(player.health>0){
			ctx.fillText(player.health,10,20);
		}
		else{
			ctx.fillText("DEAD",10,20);
		}*/

		/*
		ctx.drawImage(layoutHitCanvas, //Temporary;
					  cam.x, cam.y, cam.width, cam.height,
					  0, 0, cam.width, cam.height);
		*/

		/*
		ctx.drawImage(entityHitCanvas, //Temporary;
					  cam.x, cam.y, cam.width, cam.height,
					  0, 0, cam.width, cam.height);
		*/

		ui.draw(ctx);

	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	function handleAction(ctx, cam, player, trigger){
		//Handle player movement and set direction;
		//Direction guide: 0 = left, 1 = down, 2 = right, 3 = up;

		player.collisionBox.updateCollision(entityHitCtx);

		for(let i = 0; i < enemyArray.length; i++){
				if(enemyArray[i].playerDetected){
					enemyArray[i].collisionBox.updateCollision(entityHitCtx);
				}
		}

		for(let i = 0; i < friendsArray.length;i++){
			friendsArray[i].collisionBox.updateCollision(entityHitCtx);
		}

		//Check for ground pick-up items;
		for(let i = 0; i < pickupArray.length; i++){
			pickupArray[i].updatePickUp(player);
		}

		player.moving = false;

		//Player cannot move if attacking;
		if(!player.attacking && !player.dead && !player.win){
			//Walk left;
			if(keys[65]){
				player.direction[0] = true;
				player.direction[1] = false;
				player.direction[2] = false;
				player.direction[3] = false;

				if(!player.collisionBox.collides[0]){
					player.moving = true;
					player.x -= player.speed;
				}
			}

			//Walk right;
			if(keys[68]){
				player.direction[0] = false;
				player.direction[1] = false;
				player.direction[2] = true;
				player.direction[3] = false;

				if(!player.collisionBox.collides[2]){
					player.moving = true;
					player.x += player.speed;
				}
			}

			//Walk up
			if(keys[87]){
				player.direction[0] = false;
				player.direction[1] = true;
				player.direction[2] = false;
				player.direction[3] = false;

				if(!player.collisionBox.collides[3]){
					player.moving = true;
					player.y -= player.speed;
				}
			}

			//Walk down;
			if(keys[83]){
				player.direction[0] = false;
				player.direction[1] = false;
				player.direction[2] = false;
				player.direction[3] = true;

				if(!player.collisionBox.collides[1]){
					player.moving = true;
					player.y += player.speed;
				}
			}

			//basic sprint
			if(keys[16]){
				player.speed = 2;
			}
			else
				player.speed = 1;
		}

		//Attacking, press C;
		if(keys[75] && !player.attacking && !player.dead && !player.win){
			player.resetAnim();
			player.attacking = true;
		}

		//Healing, press E;
		if(keys[69] && !player.isHealing && player.pickups>0 && !player.dead){
			player.isHealing = true;
			player.updateHealth(20);
			var eat = document.getElementsByTagName("audio")[10];
			eat.volume =  0.5 * parent.som;
			eat.play();
			player.pickups-=1;
		}

		else if(!keys[69] && !player.dead){
			player.isHealing = false;
		}

		//..........................................................................................

		//Snap camera to player position;
		cam.snapTo(player);
	}

	function nextLevel(levelCounter,ctx, cam,reqID){
		//SpriteSheets;
		//Player/Enemy guy;
		var playerSheet = new SpriteSheet(playerAnim, 75, 75, 9);
		var friendSheet = new SpriteSheet(playerFriend, 75, 75, 9);
		var player = new Player(0, 0, playerSheet, 20, 12, 100, 50, 1);

		var trigger = new Trigger(0, 0);

		var enemySheet = new SpriteSheet(enemyAnim, 50, 50, 8);
		var enemySheet2 = new SpriteSheet(enemyAnim2, 50, 50, 8);

		//UI;
		var healthSheet = new SpriteSheet(health, health.naturalWidth, health.naturalHeight, 1);

		var healthBorderSheet = new SpriteSheet(healthBorder, healthBorder.naturalWidth, healthBorder.naturalHeight, 1);

		var deadSheet = new SpriteSheet(deadScreen, deadScreen.naturalWidth, deadScreen.naturalHeight, 1);

		var squareSheet = new SpriteSheet(square, square.naturalWidth, square.naturalHeight,1);

		var numberSheet = new SpriteSheet(numbers, 9, numbers.naturalHeight, 10);

		var winSheet = new SpriteSheet(winScreen, winScreen.naturalWidth, winScreen.naturalHeight, 1);

		var ui = new UI(player, healthSheet, healthBorderSheet, deadSheet, squareSheet, numberSheet, winSheet);

		//Objects;
		var barrelSheet = new SpriteSheet(barrelSprite, barrelSprite.naturalWidth, barrelSprite.naturalHeight, 1);

		var boxV1Sheet = new SpriteSheet(boxV1, boxV1.naturalWidth, boxV1.naturalHeight, 1);

		var treeSheet1 = new SpriteSheet(treeV1, treeV1.naturalWidth, treeV1.naturalHeight, 1);

		var rockSheet1 = new SpriteSheet(rockV1, rockV1.naturalWidth, rockV1.naturalHeight, 1);

		var bushSheet1 = new SpriteSheet(bushV1, bushV1.naturalWidth, bushV1.naturalHeight, 1);

		var chorizoSheet = new SpriteSheet(chorizo, chorizo.naturalWidth, chorizo.naturalHeight, 1);

		var muslimTentSheet = new SpriteSheet(muslimTent, muslimTent.naturalWidth, muslimTent.naturalHeight, 1 );

		var poteNumPauSheet = new SpriteSheet(poteNumPau, poteNumPau.naturalWidth, poteNumPau.naturalHeight, 1);

		var fogueiraSheet = new SpriteSheet(fogueira, fogueira.naturalWidth, fogueira.naturalHeight, 1);

		var vinhoSheet = new SpriteSheet(vinho, vinho.naturalWidth, vinho.naturalHeight, 1);

		var coroaSheet = new SpriteSheet(coroa, coroa.naturalWidth, coroa.naturalHeight, 1);

		entities.length=0;
		enemyArray.length=0;
		pickupArray.length=0;

		//Clear level layout canvas;
		var currLayoutWidth = layoutCtx.naturalWidth;
		var currLayoutHeight = layoutCtx.naturalHeight;

		layoutCtx.clearRect(0, 0, currLayoutWidth, currLayoutHeight);

		//Draw next level;
		if (levelCounter==1){
			//Size of level layout given;
			var layout1Width = layout1.naturalWidth;
			var layout1Height = layout1.naturalHeight;

			//Resize invisible canvasses according to level size;
			layoutCanvas.width = entityCanvas.width = entityHitCanvas.width = layout1Width;
			layoutCanvas.height = entityCanvas.height = entityHitCanvas.height = layout1Height;

			//Draw level layout (only needed once);
			layoutCtx.drawImage(layout1, 0, 0, layout1Width, layout1Height);
		}

		else if (levelCounter==2){
			//Size of level layout given;
			var layout2Width = layout2.naturalWidth;
			var layout2Height = layout2.naturalHeight;

			//Resize invisible canvasses according to level size;
			layoutCanvas.width = entityCanvas.width = entityHitCanvas.width = layout2Width;
			layoutCanvas.height = entityCanvas.height = entityHitCanvas.height = layout2Height;

			//Draw level layout (only needed once);
			layoutCtx.drawImage(layout2, 0, 0, layout2Width, layout2Height);
		}

		else if (levelCounter==3){
			//Size of level layout given;
			var layout3Width = layout3.naturalWidth;
			var layout3Height = layout3.naturalHeight;

			//Resize invisible canvasses according to level size;
			layoutCanvas.width = entityCanvas.width = entityHitCanvas.width = layout3Width;
			layoutCanvas.height = entityCanvas.height = entityHitCanvas.height = layout3Height;

			//Draw level layout (only needed once);
			layoutCtx.drawImage(layout3, 0, 0, layout3Width, layout3Height);
		}

		//Read next level's object map;
		var level = mapReader.readMap("levels/level" + levelCounter + ".txt");

		var n = 0, k = 0, a=0, l=0;

		for(let i = 0; i < 100; i++){
			for(let j = 0; j < 175; j++){
				switch(level[j + (i*177)]){
					case '0':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Bound(x, y, playerSheet, 24, 24);
						break;
					case 'p':
						player.x = (j*24) + 12;
						player.y = (i+1) * 24;
						entities[n++] = player;
						break;
					case 's':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, rockSheet1, 20, 12);
						break;
					case 'b':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, barrelSheet, 20, 12);
						break;
					case 'c':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, boxV1Sheet, 20, 12);
						break;
					case 'a':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, treeSheet1, 20, 12);
						break;
					case 'q':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Friend(x,y,friendSheet,20,12,100,30,2,player,enemyArray);
						friendsArray[l++] = entities[n-1];
						break;
					case 'i':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Enemy(x, y, enemySheet, 20, 12, 100, 10, 2, player);
						enemyArray[k++] = entities[n-1];
						break;
					case 'o':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Enemy(x, y, enemySheet2, 20, 12, 100, 10, 2, player);
						enemyArray[k++] = entities[n-1];
						break;
					case 'h':
						var x = (j*24) - 12;
						var y = (i+1) * 24;
						pickupArray[a++] = new Pickup(x, y, chorizoSheet, false);
						break;
					case 'm':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, muslimTentSheet, 75, 50);
						break;
					case 'g':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, poteNumPauSheet, 20, 12);
						break;
					case 'v':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						pickupArray[a++] = new Pickup(x, y, vinhoSheet, "v");
						break;
					case 'f':
						var x = (j*24) + 12;
						var y = (i+1) * 24;
						entities[n++] = new Object(x, y, fogueiraSheet, 20, 12);
						break;
					case 't':
						trigger.x = (j*24) - 12;
						trigger.y = (i+1) * 24;
						break;
					case 'w':
				        var x = (j*24) - 12;
						var y = (i+1) * 24;
						pickupArray[a++] = new Pickup(x, y, coroaSheet, "c");
						break;
				}
			}
		}

		gameLoop(ctx, cam, player, ui, trigger);
	}

	var msg = function(ev) {
  		messageHandler(ev, replayB, "2");
        messageHandler(ev, sairB, "0");
    }

    window.addEventListener("message", msg);
}

function messageHandler(ev, Btn, option) {
    var main = ev.source;

    var changePage = function(ev) {
        main.postMessage(option, '*');
    }

    Btn.addEventListener("click", changePage);
}
