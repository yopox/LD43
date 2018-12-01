var config = {
    type: Phaser.WEBGL,
    backgroundColor: "#fafafa",
    width: 680,
    height: 480,
    pixelArt: true,
    scene: [ Load, Level ]
};

var game = new Phaser.Game(config);
var cursors;