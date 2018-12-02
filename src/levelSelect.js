class LevelSelect extends Phaser.Scene {
    constructor() {
        super({key: 'levelSelect'});
    }

    preload() {
        console.log("LevelSelect");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(320, 32, '--- Level Selection ---',
            {fontFamily: 'm3x6', fontSize: '48px', color: '#000000'})

        for (let i = 1; i <= LEVEL_NUMBER; i++)
            this.add.image(320, 128, "lvl" + i)
                .setInteractive()
                .on('pointerdown', function () {
                    this.scene.start("level", {lvlNumber: i});
                }, this);
    }

    update() {
        if (this.cursors.space.isDown) {
            this.scene.start("level", {lvlNumber: 1});
        }
    }
}