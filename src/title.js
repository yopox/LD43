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

        this.add.text(GAME_WIDTH,  64, 'Scariflag',
            { fontFamily: 'm3x6', fontSize: '284px', color: '#000000', width: 300, align: 'center' } )
            .setOrigin(0.5);

        this.add.text(GAME_WIDTH, 256, '[Press SPACE]',
            { fontFamily: 'm3x6', fontSize: '96px', color: '#000000', width: 300, align: 'center' })
            .setOrigin(0.5);


        this.add.text(GAME_WIDTH, 1.20 * GAME_HEIGHT, "Art: A_Do\n Music: Le Art\nCode: Hadri, yopox",
            { fontFamily: 'm3x6', fontSize: '64px', color: '#000000', width: 300, align: 'center' })
            .setOrigin(0.5);

        this.map = new Tilemap(`title-map`, this);
        this.map.buildMap(this);

        // Create player
        this.player = new Player(this.map.points);
        this.player.init(this.map.startingPos[0], this.map.startingPos[1], this);
        this.player.stats = [10000, 10000, 10000];
        this.cameras.main.setZoom(.5);

        this.time.addEvent({
            delay: 1000,
            callback: this.move,
            callbackScope: this,
            loop: true,
        });
        this.lastDir = dir.DOWN;
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