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
        this.load.spritesheet('tiles', 'assets/tileset.png', { frameWidth: 94, frameHeight: 88 });
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 53, frameHeight: 94 });
        for (let i = 1; i <= LEVEL_NUMBER; i++) {
            this.load.json(`map${i}`, `assets/map${i}.json`);
            this.load.image(`lvl${i}`, `assets/lvl${i}.png`);
        }
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
        if (fontReady) {
            this.scene.start("title");
        }
    }

}