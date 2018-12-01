var controls;

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level'});
    }

    preload() {
        console.log("Level");
    }

    create() {
        console.log("salut copain");

        this.cameras.main.setSize(480, 480).setZoom(5);

        var map = this.make.tilemap({ key: 'map1' });
        var tiles = map.addTilesetImage('tileset', 'tiles');
        var layer = map.createStaticLayer(0, tiles, 0, 0);
        var layer2 = map.createStaticLayer(1, tiles, 0, 0);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    }

    update() {

    }

}