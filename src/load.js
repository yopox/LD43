var fontReady = false;

class Load extends Phaser.Scene {

    constructor() {
        super({ key: 'load' });
    }

    init() {
        // Add pixel font css
        var element = document.createElement('style');
        document.head.appendChild(element);
        var sheet = element.sheet;
        var styles = '@font-face { font-family: "m3x6"; src: url("assets/fonts/m3x6.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);
    }

    preload() {
        console.log("Load");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 8, frameHeight: 8 });
        this.load.tilemapTiledJSON('map1', 'assets/map1.json');
    }

    create() {
        WebFont.load({
            custom: {
                families: ['m3x6']
            },
            active: function () {
                fontReady = true;
            }
        });
    }
    
    update() {
        console.log(fontReady);
        
        if (fontReady) {
            this.scene.start("title");
        }
    }

}