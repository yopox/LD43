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
        this.load.spritesheet('tree', 'assets/tree.png', { frameWidth: 70, frameHeight: 134 });
        this.load.image('axe', 'assets/axe.png');
        this.load.image('rock', 'assets/rock.png');
        this.load.image('gem', 'assets/gem.png');
        this.load.json("title-map", 'assets/title-map.json');
        for (let i = 0; i < LEVEL_NUMBER; i++) {
            this.load.json(`map${i}`, `assets/map${i}.json`);
            this.load.image(`lvl${i}`, `assets/map${i}.png`);
        }
        this.load.audio('carac', 'assets/SFX/carac.ogg');
        this.load.audio('cut', 'assets/SFX/cut.ogg');
        this.load.audio('gem', 'assets/SFX/gem.ogg');
        this.load.audio('jump', 'assets/SFX/jump.ogg');
        this.load.audio('menu', 'assets/SFX/menu.ogg');
        this.load.audio('rock', 'assets/SFX/rock.ogg');
        this.load.audio('sacrifice', 'assets/SFX/sacrifice.ogg');
    }

    create() {
        SOUNDS.push(this.sound.add('carac').setVolume(0.25));
        SOUNDS.push(this.sound.add('cut').setVolume(0.25));
        SOUNDS.push(this.sound.add('gem').setVolume(0.25));
        SOUNDS.push(this.sound.add('jump').setVolume(0.025));
        SOUNDS.push(this.sound.add('menu').setVolume(0.025));
        SOUNDS.push(this.sound.add('rock').setVolume(0.25));
        SOUNDS.push(this.sound.add('sacrifice').setVolume(0.25));
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