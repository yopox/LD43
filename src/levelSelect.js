const DEFAULT_LEVEL = 0;

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

        this.add.text(320, 0, '--- Level Selection ---',
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
            this.add.image(150 + GAME_WIDTH / 2, yOffset + step * i, "lvl" + (i + halfLvlNb))
                .setDisplaySize(imageSize, imageSize);
            this.add.text(250 + GAME_WIDTH / 2, yOffset + step * i - 32, "Level " + (i + halfLvlNb), {
                fontFamily: 'm3x6',
                fontSize: '48px',
                color: '#000000'
            })
        }

    }

    select(rect) {
        console.log("Select " + rect);
        // First : unselect
        if (this.selected !== -1)
            this.rectangles[this.selected].setAlpha(0);
        // Then : select
        this.rectangles[rect].setAlpha(1);
        // Finaly : set flag
        this.selected = rect;
    }

    update() {
        let up = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        let down = Phaser.Input.Keyboard.JustDown(this.cursors.down);
        let right = Phaser.Input.Keyboard.JustDown(this.cursors.right);
        let left = Phaser.Input.Keyboard.JustDown(this.cursors.left);
        if (this.cursors.space.isDown) {
            this.scene.start("level", {lvlNumber: this.selected !== -1 ? this.selected: DEFAULT_LEVEL});
        } else if ((up || down || right || left) && this.selected === -1) {
            this.select(DEFAULT_LEVEL);
        } else if (up && this.selected > 0) {
            this.select(this.selected -1);
        } else if (down && this.selected < LEVEL_NUMBER - 1) {
            this.select(this.selected + 1);
        } else if (right && this.selected < LEVEL_NUMBER / 2){
            this.select(this.selected + LEVEL_NUMBER / 2)
        }  else if (left && this.selected >= LEVEL_NUMBER / 2){
            this.select(this.selected - LEVEL_NUMBER / 2)
        }
    }
}