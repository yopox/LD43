var controls;

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });
        this.player = null;
        this.map = null;
    }

    preload() {
        console.log("Level");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setSize(480, 480).setZoom(5);

        // Create tilemap
        this.map = this.make.tilemap({ key: 'map1' });
        var tiles = this.map.addTilesetImage('tileset', 'tiles');
        var layer = this.map.createStaticLayer(0, tiles, 0, 0);
        var layer2 = this.map.createStaticLayer(1, tiles, 0, 0);

        console.log(this.map);

        this.player = new Player();
        this.player.init(3, 8, this);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

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