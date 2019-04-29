// our game's configuration
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [dragonGame, starsGame]
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);