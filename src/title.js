class Title extends Phaser.Scene {
    constructor() {
        super({key: 'title'});
        this.cursors = null;
        this.map = null;
        this.lastDir = null;
        this.block = false;
    }

    preload() {
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.map = new Tilemap(`title-map`, this);
        this.map.buildMap(this);

        // Create player
        this.player = new Player(this.map.points);
        this.player.init(8, 8, this);
        this.player.stats = [10000, 10000, 10000];
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, GAME_HEIGHT * 0.72);

        this.time.addEvent({
            delay: 1000,
            callback: this.move,
            callbackScope: this,
            loop: true,
        });
        this.lastDir = dir.DOWN;

        this.add.text(0,  GAME_HEIGHT * 0.6, 'Sacriflag',
            { fontFamily: 'm3x6', fontSize: '128px', color: '#000000', width: 300, align: 'center' } )
            .setOrigin(0.5).setDepth(100);

        this.add.text(0, GAME_HEIGHT + 40, '[Press SPACE]',
            { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' })
            .setOrigin(0.5).setDepth(100);

        this.add.text(0, GAME_HEIGHT + 64, "Art: A_Do - Music: Le Art - Code: Hadri, yopox",
            { fontFamily: 'm3x6', fontSize: '32px', color: '#000000', width: 300, align: 'center' })
            .setOrigin(0.5, 0).setDepth(100);

    }

    update() {
        if (!this.block) {
            this.player.update();
            this.map.update();
            if (this.cursors.space.isDown) {
                this.block = true;
                var alphaTween = this.tweens.add({
                    targets: this.cameras.main,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 250,
                    repeat: 0
                });
                this.tweens.add({
                    targets: this.cameras.main,
                    scrollY: 112 - 32,
                    ease: 'Power1',
                    duration: 250,
                    repeat: 0
                });
                alphaTween.setCallback("onComplete", function (scene) { scene.scene.start("levelSelect"); }, [this,]);
            }
        }
    }

    getRandomDirection() {
        let arrayDir = [dir.DOWN, dir.UP, dir.RIGHT, dir.LEFT, dir.DOWN, dir.UP, dir.RIGHT, dir.LEFT, this.lastDir,
            this.lastDir, this.lastDir, this.lastDir];
        arrayDir.splice(arrayDir.indexOf(- this.lastDir, 1));
        return arrayDir[Math.floor(Math.random() * arrayDir.length)];
    }

    move(){
        let direction = this.getRandomDirection();
        let count = 0;
        while(!this.player.move(this, this.map, direction) && count < 100) {
            count++;
            direction = this.getRandomDirection();
        }
        this.lastDir = direction;
    }
}