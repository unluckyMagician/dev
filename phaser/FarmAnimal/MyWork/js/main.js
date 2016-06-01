var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	
	preload: function() {
		this.game.load.image('background', 'assets/images/background.png');
	},

	create: function() {
		this.background = this.game.add.sprite(0, 0, 'background')
	},

	update: function() {

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
