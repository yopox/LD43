
var config = {
    type: Phaser.WEBGL,
    backgroundColor: "#cbdbfc",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    pixelArt: true,
    scene: [ Load, Title, LevelSelect, Level ]
};

var game = new Phaser.Game(config);
