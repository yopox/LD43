class LevelSelect extends Phaser.Scene {
    constructor() {
        super({key: 'levelSelect'});
    }

    preload() {
        console.log("LevelSelect");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(320, 8, '--- Level Selection ---',
            {fontFamily: 'm3x6', fontSize: '48px', color: '#000000'});

        let yOffset = 100;
        let imageSize = 80;
        let halfSeparator = 4;
        let step = imageSize + 2 * halfSeparator;

        for (let i = 0; i < LEVEL_NUMBER; i++) {
            this.add.rectangle(GAME_WIDTH / 2, yOffset + step * i, GAME_WIDTH, step, 0, 0)
                .setInteractive()
                .on('pointerdown', function () {
                    this.scene.start("level", {lvlNumber: i});
                }, this);
            this.add.image(150, yOffset + step * i, "lvl" + i).setDisplaySize(imageSize, imageSize);
            this.add.text(250, yOffset + step * i - 32, "Level " + i, {
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