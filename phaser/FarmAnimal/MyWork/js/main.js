var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	
	preload: function() {
		this.game.load.image('background', 'assets/images/background.png');
		this.game.load.image('chicken', 'assets/images/chicken.png');
		this.game.load.image('horse', 'assets/images/horse.png');
		this.game.load.image('pig', 'assets/images/pig.png');
		this.game.load.image('sheep', 'assets/images/sheep3.png');
	},

	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.background = this.game.add.sprite(0, 0, 'background')
		this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
		this.chicken.anchor.setTo(0.5);
		this.chicken.scale.setTo(1.5);

	},

	update: function() {
		this.chicken.angle -= 1
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
