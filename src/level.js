var controls;

const STATES = {
    STATS: 0,
    MOVE: 1,
    WON: 2
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
        this.SKey = null;
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

        // Create GUI
        this.gui = new GUI(this);
        this.gui.update(this.player);

        this.zoom();
        this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

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

                // Zoom
                if (this.ZKey.isDown) {
                    if (this.canZoom && !this.cameras.main.zoomEffect.isRunning) {
                        this.canZoom = false;
                        // this.zoom();
                    }
                } else {
                    this.canZoom = true;
                }

                // Stats
                if (this.player.finishedLevel && this.player.block == 4) {
                    this.blockMove = true;
                    var tween = this.tweens.add({
                        targets: this.dark,
                        alpha: 0.75,
                        ease: 'Power1',
                        duration: 500,
                        repeat: 0,
                    });
                    tween.setCallback("onComplete", function (lvl) { lvl.tweenOver() }, [this,]);
                }
                break;

            case STATES.STATS:
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

    zoom() {
        switch (this.zoomState) {
            case 0:
                this.cameras.main.startFollow(this.player.sprite, false, 1, 1, -32, -32);
                this.cameras.main.zoomTo(1, 350);
                break;

            case 1:
                var w = this.map.width * 64;
                var h = this.map.height * 32;
                this.cameras.main.stopFollow();
                this.cameras.main.pan(0, this.map.height * 32 - 16, 350);
                if (w >= h) {
                    this.cameras.main.zoomTo(896 / w, 350);
                } else {
                    this.cameras.main.zoomTo(504 / h, 350);
                }
                break;
        }
        this.zoomState = 1 - this.zoomState;
    }

}