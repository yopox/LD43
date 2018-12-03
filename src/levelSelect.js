class LevelSelect extends Phaser.Scene {
    constructor() {
        super({key: 'levelSelect'});
        this.selected = -1;
        this.rectangles = [];
        this.scores = [];
        this.bestScores = new BestScores();
        this.toUpdateScores = false;
    }

    preload() {
        console.log("LevelSelect");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bestScores.update();

        this.add.text(320, 0, '--- Level Selection ---',
            {fontFamily: 'm3x6', fontSize: '48px', color: '#000000'});

        this.selected = -1;
        this.rectangles = [];
        this.imageSize = 80;
        this.halfSeparator = 4;
        this.step = this.imageSize + 2 * this.halfSeparator;

        this.drawMenu();

        this.select(0);

    }

    drawText(x, y, text, size) {
        return this.add.text(x, y, text, {
            fontFamily: 'm3x6',
            fontSize: size + 'px',
            color: '#000000'
        })
    }

    drawMenu() {
        let halfLvlNb = Math.floor(LEVEL_NUMBER / 2);
        let yOffset = 100;

        for (let i = 0; i < LEVEL_NUMBER; i++) {
            if (i < halfLvlNb) {
                this.drawThing(0, yOffset, i);
            } else {
                this.drawThing(GAME_WIDTH / 2, yOffset - this.step * halfLvlNb, i)
            }
        }

    }

    drawThing(x, y, i) {
        y += i * this.step;

        this.rectangles.push(
            this.add.rectangle(x + GAME_WIDTH / 4, y, GAME_WIDTH / 2, this.step, 0xffffff)
                .setAlpha(0).setInteractive()
                .on('pointerdown', function () {
                    this.scene.start("level", {lvlNumber: i});
                }, this));
        this.add.image(200 + x, y, "lvl" + i).setDisplaySize(this.imageSize, this.imageSize);
        this.drawText(300 + x, y - 32, "Level " + i, 48);
        this.drawText(50 + x, y + 20, "Best:", 36).setOrigin(0, 1);
        this.scores.push(this.drawText(100 + x, y + 20, this.bestScores.getScore(i), 48).setOrigin(0, 1));
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
        if (this.cursors.space.isDown) {
            this.scene.start("level", {lvlNumber: this.selected});
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.selected > 0) {
            this.select(this.selected - 1);
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && this.selected < LEVEL_NUMBER - 1) {
            this.select(this.selected + 1);
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) && this.selected < LEVEL_NUMBER / 2) {
            this.select(this.selected + LEVEL_NUMBER / 2)
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left) && this.selected >= LEVEL_NUMBER / 2) {
            this.select(this.selected - LEVEL_NUMBER / 2)
        }
    }
}