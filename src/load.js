class Load extends Phaser.Scene {

    constructor() {
        super({ key: 'load'});
    }

    preload() {
        console.log("Load");
        this.load.image('tiles', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map1', 'assets/map1.json');
    }

    create() {
        this.scene.start("level");
    }

    update() {

    }

}