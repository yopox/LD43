var config = {
    type: Phaser.WEBGL,
    backgroundColor: "#cbdbfc",
    width: 896,
    height: 504,
    pixelArt: true,
    scene: [ Load, Title, Level ]
    // scene: [ Title, Load, Level ]
};

var game = new Phaser.Game(config);
var cursors;