class Title extends Phaser.Scene {
    constructor() {
        super({key: 'title'});
        this.cursors = null;
        this.map = null;
        this.lastDir = null;
    }

    preload() {
        console.log("Title");
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
        this.cameras.main.centerOn(0, GAME_HEIGHT * 0.65);
        console.log(this);

        this.time.addEvent({
            delay: 1000,
            callback: this.move,
            callbackScope: this,
            loop: true,
        });
        this.lastDir = dir.DOWN;

        this.add.text(0,  GAME_HEIGHT * 0.55, 'Sacriflag',
            { fontFamily: 'm3x6', fontSize: '192px', color: '#000000', width: 300, align: 'center' } )
            .setOrigin(0.5).setDepth(100);

        this.add.text(- .35 * GAME_WIDTH, GAME_HEIGHT, '[Press SPACE]',
            { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' })
            .setOrigin(0.5).setDepth(100);


        this.add.text(0, GAME_HEIGHT + 32, "Art: A_Do - Music: Le Art - Code: Hadri, yopox",
            { fontFamily: 'm3x6', fontSize: '32px', color: '#000000', width: 300, align: 'center' })
            .setOrigin(0.5, 0).setDepth(100);

    }

    update() {
        this.player.update();
        if (this.cursors.space.isDown) {
            this.scene.start("levelSelect");
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