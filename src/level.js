const STATES = {
    STATS: 0,
    MOVE: 1,
    WON: 2,
    TWEEN: 3,
    GAME_OVER: 4
};

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });

        this.state = STATES.MOVE;
        this.lvlNumber = 0;

        // Main UI
        this.player = null;
        this.map = null;
        this.guiCam = null;
        this.gui = null;
        this.popup = null;

        // Keys
        this.TABKey = null;
        this.RKey = null;
        this.SKey = null;
        this.SPACEKey = null;
        this.ESCKey = null;

        // States
        this.distribStats = null;
    }

    init(data) {
        this.lvlNumber = data["lvlNumber"];
    }

    preload() {
        console.log("Level " + this.lvlNumber);
    }

    create() {
        // Init
        this.state = STATES.MOVE;
        this.bestScore = new BestScores();

        // Create tilemap
        this.map = new Tilemap(`map${this.lvlNumber}`, this);
        this.map.buildMap(this);

        // Create player
        this.player = new Player(this.map.points);
        this.player.init(this.map.startingPos[0], this.map.startingPos[1], this);
        this.cameras.main.startFollow(this.player.sprite, false, 1, 1, -32 + 157, -32);
        this.cameras.main.setZoom(1);

        // Create GUI
        this.gui = new GUI(this, this.map);
        this.gui.update(this.player);
        this.popup = new Popup(this);

        // Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.TABKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.ESCKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {

        this.map.update();

        switch (this.state) {
            case STATES.MOVE:
                this.player.update();
                this.gui.update(this.player);

                // Moving the player
                if (this.cursors.left.isDown) {
                    this.player.move(this, this.map, dir.LEFT);
                }
                else if (this.cursors.right.isDown) {
                    this.player.move(this, this.map, dir.RIGHT);
                }
                else if (this.cursors.up.isDown) {
                    this.player.move(this, this.map, dir.UP);
                }
                else if (this.cursors.down.isDown) {
                    this.player.move(this, this.map, dir.DOWN);
                }

                // Edit stats
                if (this.TABKey.isDown && this.player.block == 0) {
                    this.gui.selected = 0;
                    this.cameras.main.fadeOut(350, 100, 100, 100);
                    this.fadeTo(this.gui.r1, 0.25, STATES.STATS);
                }
                else if (Phaser.Input.Keyboard.JustDown(this.SKey) && this.player.canSacrifice()) {
                    this.gui.selected = 0;
                    this.sacrifice();
                    this.cameras.main.fadeOut(350, 100, 100, 100);
                    this.fadeTo(this.gui.r1, 0.25, STATES.STATS);
                }
                
                // The player won
                if (this.player.finishedLevel && this.player.block == 4) {
                    this.openPopup();
                    this.cameras.main.fadeOut(350, 100, 100, 100);
                    this.state = STATES.WON;
                }
                
                // The player lost
                if ((this.player.gameOver && this.player.block == 4) || this.ESCKey.isDown) {
                    this.openPopup();
                    this.cameras.main.fadeOut(350, 100, 100, 100);
                    this.state = STATES.GAME_OVER;
                }

                break;

            case STATES.STATS:
                // Go back to MOVE state
                if (this.TABKey.isDown) {
                    this.cameras.main.fadeFrom(350, 100, 100, 100);
                    this.fadeTo(
                        [this.gui.r1, this.gui.r2, this.gui.r3],
                        0, STATES.MOVE);
                }

                // Change selected stat
                if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                    this.gui.move(-1);
                }
                else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                    this.gui.move(1);
                }
                else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
                    if (this.player.points > 0) {
                        this.player.points--;
                        this.player.stats[this.gui.selected]++;
                    }
                }
                else if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
                    this.sacrifice();
                }

                this.gui.update(this.player);
                break;

            case STATES.WON:
                if (this.SPACEKey.isDown) {
                    this.scene.start("levelSelect");
                }
                break;

            case STATES.GAME_OVER:
                if (this.SPACEKey.isDown) {
                    this.scene.start("levelSelect");
                }
                else if (Phaser.Input.Keyboard.JustDown(this.RKey)) {
                    this.scene.start("level", {lvlNumber: this.lvlNumber});
                }
                break;
        }
    }

    sacrifice() {
        this.player.reset(this);
        if (this.player.gameOver) {
            this.fadeTo(this.cameras.main, 0.25, STATES.GAME_OVER);
            this.openPopup();
        }
    }

    fadeTo(targets, alpha, state) {
        this.state = STATES.TWEEN;
        var tween = this.tweens.add({
            targets: targets,
            alpha: alpha,
            ease: 'Power1',
            duration: 350,
            repeat: 0
        });
        tween.setCallback("onComplete", function (scene) { if (scene.state != STATES.GAME_OVER) scene.state = state }, [this,]);
    }

    openPopup() {
        let targets = [];

        switch (this.player.finishedLevel) {
            case false:
                this.popup.title.text = GAME_OVER_TEXT;
                targets = [this.popup.bg, this.popup.title, this.popup.GOline1, this.popup.GOline2];
                break;

            default:
                this.score = Math.round(this.player.score / this.map.score * 100);
                this.bestScore.setScore(this.lvlNumber, this.score, this.player.gem);
                this.popup.title.text = "Level " + this.lvlNumber + " Complete!";
                this.popup.Wline1.text = this.player.sacrifices + ' sacrifices - ' + this.player.score + ' points';
                this.popup.Wline2.text = this.score + "%";
                targets = [this.popup.bg, this.popup.title, this.popup.Wline1, this.popup.Wline2, this.popup.Wline3];
                break;
        }

        this.tweens.add({
            targets: targets,
            props: {
                y: { value: '-=64', duration: 350, ease: 'Power1' },
                alpha: { value: '+=1', duration: 350, ease: 'Power1' }
            },
        });
    }

}