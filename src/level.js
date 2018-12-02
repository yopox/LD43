const STATES = {
    STATS: 0,
    MOVE: 1,
    WON: 2,
    TWEEN: 3
};

class Level extends Phaser.Scene {

    constructor() {
        super({ key: 'level' });

        this.state = STATES.MOVE;

        // Main UI
        this.player = null;
        this.map = null;
        this.guiCam = null;
        this.gui = null;

        // Zoom
        this.zoomState = 0;
        this.ZKey = null;
        this.canZoom = true;

        // States
        this.blockMove = false;
        this.dark = null;
        this.TABKey = null;
        this.RKey = null;
        this.SPACEKey = null;
        this.distribStats = null;
    }

    preload() {
        console.log("Level");
    }

    create() {
        // Init
        this.state = STATES.MOVE;

        // Create tilemap
        this.map = new Tilemap('map1', this);
        this.map.buildMap(this);

        // Create player
        this.player = new Player();
        this.player.init(this.map.startingPos[0], this.map.startingPos[1], this);
        this.cameras.main.startFollow(this.player.sprite, false, 1, 1, -32 + 157, -32);
        this.cameras.main.setZoom(1);

        // Create GUI
        this.gui = new GUI(this, this.map);
        this.gui.update(this.player);
        this.dark = this.add.rectangle(0, 0, 896 * 2, 504 * 2, 0x000000).setScrollFactor(0).setAlpha(0).setDepth(2000);

        // Keyboard
        cursors = this.input.keyboard.createCursorKeys();
        RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.TABKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {

        switch (this.state) {
            case STATES.MOVE:
                this.player.update();
                this.gui.update(this.player);

                // Moving the player
                if (cursors.left.isDown) {
                    this.player.move(this.map, dir.LEFT);
                }
                else if (cursors.right.isDown) {
                    this.player.move(this.map, dir.RIGHT);
                }
                else if (cursors.up.isDown) {
                    this.player.move(this.map, dir.UP);
                }
                else if (cursors.down.isDown) {
                    this.player.move(this.map, dir.DOWN);
                }

                // Edit stats
                if (this.TABKey.isDown && this.player.block == 0) {
                    this.gui.selected = 0;
                    this.dark.setDepth(1499);
                    this.fadeTo([this.dark, this.gui.r1], 0.25, STATES.STATS);
                }

                // Stats
                if (this.player.finishedLevel && this.player.block == 4) {
                    this.blockMove = true;
                    this.dark.setDepth(2000);
                    this.fadeTo(this.dark, 0.25, STATES.WON);
                }
                break;

            case STATES.STATS:
                // Go back to MOVE state
                if (this.TABKey.isDown) {
                    this.fadeTo(
                        [this.dark, this.gui.r1, this.gui.r2, this.gui.r3],
                        0, STATES.MOVE);
                }

                // Change selected stat
                if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
                    this.gui.move(-1);
                }
                else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
                    this.gui.move(1);
                }
                // Spend a point
                else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
                    if (this.player.points > 0) {
                        this.player.points--;
                        this.player.stats[this.gui.selected]++;
                    }
                }
                // Reset stats
                else if (Phaser.Input.Keyboard.JustDown(RKey)) {
                    this.player.reset();
                }

                this.gui.update(this.player);
                break;
            case STATES.WON:
                if (this.SPACEKey.isDown) {
                    this.scene.start("title");
                }
                break;
        }
    }

    fadeTo(targets, alpha, state) {
        this.state = STATES.TWEEN;
        var tween = this.tweens.add({
            targets: targets,
            alpha: alpha,
            ease: 'Power1',
            duration: 350,
            repeat: 0,
        });
        tween.setCallback("onComplete", function (scene) { scene.state = state }, [this,]);
    }
}