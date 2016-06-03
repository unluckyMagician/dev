var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	
	preload: function() {
		this.game.load.image('background', 'assets/images/background.png');
		this.game.load.image('chicken', 'assets/images/chicken.png');
		this.game.load.image('pig', 'assets/images/pig.png');
		this.game.load.image('horse', 'assets/images/horse.png');
		this.game.load.image('sheep', 'assets/images/sheep3.png');
		this.game.load.image('arrow', 'assets/images/arrow.png')

	},

	create: function() {

		//Scaling
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

		//Align game centered on screen
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//background sprite
		this.background = this.game.add.sprite(0, 0, 'background')
		
		var animalData = [
			{key: 'chicken', text: 'CHICKEN'},
			{key: 'horse', text: 'HORSE'},
			{key: 'pig', text: 'PIG'},
			{key: 'sheep', text: 'SHEEP'}

		];

		this.animals = this.game.add.group();

		var self = this;
		var animal;
		animalData.forEach(function(element) {
			animal = self.animals.create(-1000, self.game.world.centerY, element.key);
			animal.customParams = {text: element.text};
			animal.anchor.setTo(0.5);
			animal.inputEnabled = true;
			animal.input.pixelPerfectClick = true;
			animal.events.onInputDown.add(self.animateAnimal, self);
		});

		this.currentAnimal = this.animals.next();
		this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

		this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.customParams = {direction: 1}

		this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.customParams = {direction: -1}

		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this)

		this.rightArrow.inputEnabled = true;
		this.rightArrow.input.pixelPerfectClick = true;
		this.rightArrow.events.onInputDown.add(this.switchAnimal, this)

	

	},

	update: function() {
	
	},

	switchAnimal: function(sprite, event) {
		console.log('move animal');
	},

	animateAnimal: function(sprite, event) {
		console.log('animate animal');
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
