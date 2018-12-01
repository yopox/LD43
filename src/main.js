var config = {
    type: Phaser.WEBGL,
    width: 480,
    height: 480,
    pixelArt: true,
    scene: [ Load, Level ]
};

var game = new Phaser.Game(config);
var cursors;

const dir = {
    LEFT: 'left',
    UP: 'up',
    RIGHT: 'right',
    DOWN: 'down'
};