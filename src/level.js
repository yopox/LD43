var controls;

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });
        this.player = null;
    }

    preload() {
        console.log("Level");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setSize(480, 480).setZoom(5);

        // Create tilemap
        var map = this.make.tilemap({ key: 'map1' });
        var tiles = map.addTilesetImage('tileset', 'tiles');
        var layer = map.createStaticLayer(0, tiles, 0, 0);
        var layer2 = map.createStaticLayer(1, tiles, 0, 0);

        // console.log(map.getObjectLayer('objets'));

        this.player = new Player();
        this.player.init(3, 8, this);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    }

    update() {
        this.player.update();

        // Moving the player
        if (cursors.left.isDown) {
            this.player.move(dir.LEFT);
        }
        else if (cursors.right.isDown) {
            this.player.move(dir.RIGHT);
        }
        else if (cursors.up.isDown) {
            this.player.move(dir.UP);
        }
        else if (cursors.down.isDown) {
            this.player.move(dir.DOWN);
        }

    }

}