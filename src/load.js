class Load extends Phaser.Scene {

    constructor() {
        super({ key: 'load'});
    }

    preload() {
        console.log("Load");
        this.load.image('tiles', 'assets/tileset.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 8, frameHeight: 8 });
        this.load.tilemapTiledJSON('map1', 'assets/map1.json');
    }

    create() {
        this.scene.start("level");
    }

    update() {

    }

}