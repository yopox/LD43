var config = {
    type: Phaser.WEBGL,
    backgroundColor: "#cbdbfc",
    width: 896,
    height: 504,
    pixelArt: true,
    scene: [ Load, Title, LevelSelect, Level ]
};

var game = new Phaser.Game(config);
