var config = {
    type: Phaser.WEBGL,
    backgroundColor: "#fafafa",
    width: 896,
    height: 504,
    pixelArt: true,
    scene: [ Load, Level ]
};

var game = new Phaser.Game(config);
var cursors;