var SpaceHipster = SpaceHipster || {};

SpaceHipster.GameState = {

  //initiate game settings
  init: function() {
    //use all the area, don't distort scale
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //game constants
    this.PLAYER_SPEED = 200;
    this.BULLET_SPEED = -1000;

  },

  //load the game assets before the game starts
  preload: function() {
    this.load.image('space', 'assets/images/space.png');    
    this.load.image('player', 'assets/images/player.png');    
    this.load.image('bullet', 'assets/images/bullet.png');    
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png');    
    this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);   
    this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);   
    this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);       
  },
  //executed after everything is loaded
  create: function() {
    //moving stars background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');    
    
    this.background.autoScroll(0, 30);
    
    //player
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;  
    
    //initiate player bullets and player shooting
    this.initBullets();
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5, this.createPlayerBullet, this);
    
    //initiate the enemies
    this.initEnemies();
    
  },
  update: function() {
    
    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
    
    this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPlayer, null, this);
    
    //player is not moving by default
    this.player.body.velocity.x = 0;
    
    //listen to user input
    if(this.game.input.activePointer.isDown) {
      //get the location of the touch
      var targetX = this.game.input.activePointer.position.x;   
      
      //define the direction of the speed
      var direction = targetX >= this.game.world.centerX ? 1 : -1;   
      
      //move the player
      this.player.body.velocity.x = direction * this.PLAYER_SPEED; 
    }
  },
  
  //initiate the player bullets group
  initBullets: function(){
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
  },
  
  //create or reuse a bullet - pool of objects
  createPlayerBullet: function(){
    var bullet = this.playerBullets.getFirstExists(false);
    
    //only create a bullet if there are no dead ones available to reuse
    if(!bullet) {
      bullet = new SpaceHipster.PlayerBullet(this.game, this.player.x, this.player.top);
      this.playerBullets.add(bullet);
    }
    else {
      //reset position
      bullet.reset(this.player.x, this.player.top);
    }
    
    //set velocity
    bullet.body.velocity.y = this.BULLET_SPEED;
    
  },
  
  initEnemies: function(){
  
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    
    this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;
    
    
    var enemy = new SpaceHipster.Enemy(this.game, 100, 100, 'greenEnemy', 10, this.enemyBullets);
    this.enemies.add(enemy);  
    
    enemy.body.velocity.x = 100;
    enemy.body.velocity.y = 50;
  },
  
  damageEnemy: function(bullet, enemy) {
    enemy.damage(1);    
    bullet.kill();
  },
  
  killPlayer: function() {
    this.player.kill();
    this.game.state.start('GameState');
  }

  

};