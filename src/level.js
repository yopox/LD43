var controls;

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });
        this.player = null;
        this.map = null;
        this.guiCam = null;
        this.gui = null;
    }

    preload() {
        console.log("Level");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        // Create tilemap
        this.map = new Tilemap('map1', this);
        this.map.buildMap(this);

        this.player = new Player();
        this.player.init(1, 2, this);
    }

    update() {
        this.player.update();

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

    }

}