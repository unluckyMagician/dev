var SpaceHipster = SpaceHipster || {};

SpaceHipster.Enemy = function(game, x, y, key, health, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, key);
  
  this.game = game;
  
  //enable physics
  this.game.physics.arcade.enable(this);
  
  this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);
  this.anchor.setTo(0.5);
  this.health = health;
  
  this.enemyBullets = enemyBullets;
};

SpaceHipster.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.Enemy.prototype.constructor = SpaceHipster.Enemy;

SpaceHipster.Enemy.prototype.update = function() {
  
  //bounce on the borders
  if(this.position.x < 0.05 * this.game.world.width) {
    this.position.x = 0.05 * this.game.world.width + 2;
    this.body.velocity.x *= -1;
  }
  else if(this.position.x > 0.95 * this.game.world.width) {
    this.position.x = 0.95 * this.game.world.width - 2;
    this.body.velocity.x *= -1;
  }

  //kill if off world in the bottom
  if(this.position.y > this.game.world.height) {
    this.kill();
  }
};