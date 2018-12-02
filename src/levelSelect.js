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
            {fontFamily: 'm3x6', fontSize: '48px', color: '#000000'});

        let y_offset = 32;

        for (let i = 1; i <= LEVEL_NUMBER; i++) {
            this.add.image(150, y_offset + 120 * i, "lvl" + i).setDisplaySize(96, 96);
            this.add.rectangle(448, y_offset + 120 * i, 896, 120, 0xdddddd, 0)
            // .setAlpha(0) //.setDepth(0)
                .setInteractive()
                .on('pointerdown', function () {
                    this.scene.start("level", {lvlNumber: i});
                }, this);
            this.add.text(250, y_offset + 120 * i - 32, "Level " + i, {
                fontFamily: 'm3x6',
                fontSize: '48px',
                color: '#000000'
            })
        }
    }

    update() {
        if (this.cursors.space.isDown) {
            this.scene.start("level", {lvlNumber: 1});
        }
    }
}