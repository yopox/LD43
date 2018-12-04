class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'levelSelect' });
        this.selected = -1;
        this.rectangles = [];
        this.scores = [];
        this.bestScores = new BestScores();
        this.toUpdateScores = false;
        this.block = true;
    }

    preload() {
    }

    create() {
        playMusic(BGM.TITLE);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.bestScores.update();

        this.add.text(320, -4, '--- Level Selection ---',
            { fontFamily: 'm3x6', fontSize: '48px', color: '#000000' });

        this.selected = -1;
        this.rectangles = [];
        this.imageSize = 80;
        this.halfSeparator = 4;
        this.step = this.imageSize + 2 * this.halfSeparator;

        for (let i = 0; i < this.scores.length; i++) {
            this.scores[i].destroy();
        }
        this.scores = [];

        this.drawMenu();

        this.select(0);

        this.cameras.main.setAlpha(0).setScroll(0, -32);
        var alphaTween = this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            ease: 'Power1',
            duration: 500,
            repeat: 0
        });
        this.tweens.add({
            targets: this.cameras.main,
            scrollY: 0,
            ease: 'Power1',
            duration: 500,
            repeat: 0
        });
        alphaTween.setCallback("onComplete", function (scene) { scene.block = false; }, [this,]);

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
                    this.scene.start("level", { lvlNumber: i });
                }, this));
        this.add.image(200 + x, y, "lvl" + i).setDisplaySize(this.imageSize, this.imageSize);
        this.drawText(300 + x, y - 32, "Level " + i, 48);
        this.drawText(114 + x, y - 4, "BEST", 32).setOrigin(0.5, 1);
        var score = this.bestScores.getScore(i);
        this.scores.push(this.drawText(116 + x, y + 28, score[0] + "%", 48).setOrigin(0.5, 1));
        var gem = this.add.image(48 + x, y + 14, "gem").setScale(2);
        if (!score[1]) {
            gem.setTint(0x000000);
        }
    }

    select(rect) {
        // First : unselect
        if (this.selected !== -1)
            this.rectangles[this.selected].setAlpha(0);
        // Then : select
        this.rectangles[rect].setAlpha(1);
        // Finaly : set flag
        this.selected = rect;
    }

    update() {
        if (!this.block) {
            if (this.cursors.space.isDown) {
                playSFX(SFX.MENU);
                this.block = true;
                var alphaTween = this.tweens.add({
                    targets: this.cameras.main,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 400,
                    repeat: 0
                });
                this.tweens.add({
                    targets: this.cameras.main,
                    scrollY: -32,
                    ease: 'Power1',
                    duration: 400,
                    repeat: 0
                });
                alphaTween.setCallback("onComplete", function (scene) { scene.scene.start("level", { lvlNumber: scene.selected }); }, [this,]);
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.selected > 0) {
                playSFX(SFX.MENU);
                this.select(this.selected - 1);
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && this.selected < LEVEL_NUMBER - 1) {
                playSFX(SFX.MENU);
                this.select(this.selected + 1);
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) && this.selected < LEVEL_NUMBER / 2) {
                playSFX(SFX.MENU);
                this.select(this.selected + LEVEL_NUMBER / 2)
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left) && this.selected >= LEVEL_NUMBER / 2) {
                playSFX(SFX.MENU);
                this.select(this.selected - LEVEL_NUMBER / 2)
            }
        }
    }
}