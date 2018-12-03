class LevelSelect extends Phaser.Scene {
    constructor() {
        super({key: 'levelSelect'});
        this.selected = -1;
        this.rectangles = [];
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

        this.selected = -1;
        this.rectangles = [];
        let halfLvlNb = Math.floor(LEVEL_NUMBER / 2);
        for (let i = 0; i < halfLvlNb; i++) {
            this.rectangles.push(
                this.add.rectangle(GAME_WIDTH / 4, yOffset + step * i, GAME_WIDTH / 2, step, 0xffffff)
                    .setAlpha(0).setInteractive()
                    .on('pointerdown', function () {
                        this.scene.start("level", {lvlNumber: i});
                    }, this));
            this.add.image(150, yOffset + step * i, "lvl" + i).setDisplaySize(imageSize, imageSize);
            this.add.text(250, yOffset + step * i - 32, "Level " + i, {
                fontFamily: 'm3x6',
                fontSize: '48px',
                color: '#000000'
            })
        }
        for (let i = 0; i < LEVEL_NUMBER / 2; i++) {
            this.rectangles.push(
                this.add.rectangle(3 * GAME_WIDTH / 4, yOffset + step * i, GAME_WIDTH / 2, step, 0xffffff)
                    .setAlpha(0).setInteractive()
                    .on('pointerdown', function () {
                        this.scene.start("level", {lvlNumber: i});
                    }, this));
            this.add.image(150 + GAME_WIDTH / 2, yOffset + step * i, "lvl" + (i + halfLvlNb)).setDisplaySize(imageSize, imageSize);
            this.add.text(250 + GAME_WIDTH / 2, yOffset + step * i - 32, "Level " + (i + halfLvlNb), {
                fontFamily: 'm3x6',
                fontSize: '48px',
                color: '#000000'
            })
        }

    }

    select(rect) {
        this.rectangles[rect].setAlpha(1);
        console.log("Select " + rect);
    }

    unselect(rect) {
        this.rectangles[rect].setAlpha(0);
    }

    update() {
        let up = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        let down = Phaser.Input.Keyboard.JustDown(this.cursors.down);
        if (this.cursors.space.isDown) {
            this.scene.start("level", {lvlNumber: this.selected !== -1 ? this.selected: 1});
        } else if ((up || down) && this.selected === -1) {
            this.select(0);
            this.selected = 1;
        } else if (up && this.selected > 0) {
            this.unselect(this.selected);
            this.selected--;
            this.select(this.selected);
        } else if (down && this.selected < LEVEL_NUMBER - 1) {
            this.unselect(this.selected);
            this.selected++;
            this.select(this.selected);
        }
    }
}