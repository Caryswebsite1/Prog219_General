import Phaser from ‘phaser’;
import GameScene from ‘./js/dragonGame’;
import VictoryLap from ‘./js/starsGame’;

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
  
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
game.scene.add(‘dragonGame ’, dragonGame );
game.scene.add(‘starsGame’, starsGame);

