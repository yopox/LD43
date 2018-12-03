class Title extends Phaser.Scene {
    constructor() {
        super({key: 'title'});
        this.cursors = null;
    }

    preload() {
        console.log("Title");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(320, 128, 'LD43',
            { fontFamily: 'm3x6', fontSize: '128px', color: '#000000', width: 300, align: 'center' } )
    }

    update() {
        if (this.cursors.space.isDown) {
            this.scene.start("levelSelect");
        }
    }
}