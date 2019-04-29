class dragonGame extends Phaser.Scene {

/*method 2 comment this out
    constructor() {
        super({ key: "dragonGame" });
    }// end constructor

*/

    // create a new scene named "Game"
    //gameScene = new Phaser.Scene('Game');

    /*
    // our game's configuration
    let config = {
        type: Phaser.AUTO,
        width: 640,
        height: 360,
        scene: gameScene
    };
    
    // create the game, and pass it the configuration
    let game = new Phaser.Game(config);
    */

    //this.scene.start("SceneMain");

    // some parameters for our scene
    /*   dragoninit = function () {
       this.playerSpeed = 1.5;
       this.enemySpeed = 2;
       this.enemyMaxY = 280;
       this.enemyMinY = 80;
   }*/

    // load asset files for our game
    preload() {

        // load images
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('dragon', 'assets/dragon.png');
        this.load.image('treasure', 'assets/treasure.png');
        this.load.image('sword', 'assets/sword.png');
    };

    // executed once, after assets were loaded
    create() {

        this.playerSpeed = 1.5;
        this.enemySpeed = 2;
        this.enemyMaxY = 280;
        this.enemyMinY = 80;

        // background
        let bg = this.add.sprite(0, 0, 'background');

        // change origin to the top-left of the sprite
        bg.setOrigin(0, 0);

        // player
        this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

        // scale down
        this.player.setScale(0.5);

        // goal
        this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
        this.treasure.setScale(0.6);

        // group of enemies
        this.enemies = this.add.group({
            key: 'dragon',
            repeat: 5,
            setXY: {
                x: 110,
                y: 100,
                stepX: 80,
                stepY: 20
            }
        });

        // scale enemies
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

        // set speeds
        Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
            enemy.speed = Math.random() * 2 + 1;
        }, this);

        // player is alive
        this.isPlayerAlive = true;

        // reset camera
        this.cameras.main.resetFX();

        //  set up cursor (arrow) Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    // executed on every frame (60 times per second)
    update() {

        // only if the player is alive
        if (!this.isPlayerAlive) {
            return;
        }


        // set up cursor movement
        if (this.cursors.left.isDown) {
            this.player.x -= this.playerSpeed;
        }
        else if (this.cursors.right.isDown) {
            this.player.x += this.playerSpeed;
        }


        if (this.cursors.up.isDown) {
            this.player.y -= this.playerSpeed;
        }
        else if (this.cursors.down.isDown) {
            this.player.y += this.playerSpeed;
        }


        // check for active input
        if (this.input.activePointer.isDown) {

            // player walks
            this.player.x += this.playerSpeed;
        }

        // treasure collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
            this.gameOver();
        }

        // enemy movement and collision
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;

        for (let i = 0; i < numEnemies; i++) {

            // move enemies
            enemies[i].y += enemies[i].speed;

            // reverse movement if reached the edges
            if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
                enemies[i].speed *= -1;
            } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
                enemies[i].speed *= -1;
            }

            // enemy collision
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
                this.gameOver();
                break;
            }
        }
    };

    gameOver() {

        // flag to set player is dead
        this.isPlayerAlive = false;

        // shake the camera
        this.cameras.main.shake(500);

        // fade camera
        this.time.delayedCall(250, function () {
            this.cameras.main.fade(250);
        }, [], this);

        // restart game
        this.time.delayedCall(500, function () {
            this.scene.start("starsGame");
        }, [], this);
    };

} // end class

