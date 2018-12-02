var controls;

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });
        this.player = null;
        this.map = null;
        this.guiCam = null;
        this.gui = null;
        this.zoomState = 0;
        this.ZKey = null;
        this.canZoom = true;
        this.blockMove = false;
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

    }

    update() {

        if (!this.blockMove) {

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
                    this.zoom();
                }
            } else {
                this.canZoom = true;
            }

        } else {
            // Control popups

        }

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