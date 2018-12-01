class Title extends Phaser.Scene {
    constructor() {
        super({key: 'title'});
    }

    preload() {
        console.log("Title");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.add.text(350, 32, 'LD43',
            { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' } )
    }

    update() {
        if (cursors.space.isDown) {
            this.scene.start("level");
        }
    }
}