var controls;

const STATES = {
    STATS: 0,
    MOVE: 1,
    WON: 2,
    TWEEN: 3
};

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });

        this.state = STATES.MOVE;

        // Main UI
        this.player = null;
        this.map = null;
        this.guiCam = null;
        this.gui = null;

        // Zoom
        this.zoomState = 0;
        this.ZKey = null;
        this.canZoom = true;

        // Popup
        this.blockMove = false;
        this.dark = null;
        this.TABKey = null;
        this.distribStats = null;
    }

    preload() {
        console.log("Level");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        // Create tilemap
        this.map = new Tilemap('map1', this);
        this.map.buildMap(this);

        // Create player
        this.player = new Player();
        this.player.init(this.map.startingPos[0], this.map.startingPos[1], this);
        this.cameras.main.startFollow(this.player.sprite, false, 1, 1, -32, -32);
        
        // Create GUI
        this.gui = new GUI(this);
        this.gui.update(this.player);

        this.TABKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        this.dark = this.add.rectangle(0, 0, 896 * 2, 504 * 2, 0x000000).setScrollFactor(0).setAlpha(0).setDepth(2000);

    }

    update() {

        switch (this.state) {
            case STATES.MOVE:
                this.player.update();
                this.gui.update(this.player);

                // Moving the player
                if (cursors.left.isDown) {
                    this.player.move(this.map, dir.LEFT);
                }
                else if (cursors.right.isDown) {
                    this.player.move(this.map, dir.RIGHT);
                }
                else if (cursors.up.isDown) {
                    this.player.move(this.map, dir.UP);
                }
                else if (cursors.down.isDown) {
                    this.player.move(this.map, dir.DOWN);
                }

                // Edit stats
                if (this.TABKey.isDown && this.player.block == 0) {
                    this.state = STATES.TWEEN;
                    this.dark.setDepth(1499);
                    var tween = this.tweens.add({
                        targets: this.dark,
                        alpha: 0.5,
                        ease: 'Power1',
                        duration: 500,
                        repeat: 0,
                    });
                    tween.setCallback("onComplete", function (scene) { scene.state = STATES.STATS }, [this,]);
                }

                // Stats
                if (this.player.finishedLevel && this.player.block == 4) {
                    this.blockMove = true;
                    this.dark.setDepth(2000);
                    var tween = this.tweens.add({
                        targets: this.dark,
                        alpha: 0.75,
                        ease: 'Power1',
                        duration: 500,
                        repeat: 0,
                    });
                    tween.setCallback("onComplete", function (scene) { scene.tweenOver() }, [this,]);
                }
                break;

            case STATES.STATS:
                if (this.TABKey.isDown) {
                    this.state = STATES.TWEEN;
                    var tween = this.tweens.add({
                        targets: this.dark,
                        alpha: 0,
                        ease: 'Power1',
                        duration: 500,
                        repeat: 0,
                    });
                    tween.setCallback("onComplete", function (scene) { scene.state = STATES.MOVE }, [this,]);
                }
                
                break;
            case STATES.WON:
                break;
        }
    }

    tweenOver() {
        console.log("tweenOver");
        console.log(this);
        console.log(this instanceof Level);
        console.log(this.map);
    }

}