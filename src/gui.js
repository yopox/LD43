const STATS = ["Stamina", "STAT2", "STAT3"];

class GUI {

    constructor(scene) {
        this.text1 = this.addText(scene, 16, 32, '64px', "1");
        this.text2 = this.addText(scene, 16, 32 * 2, '64px', "1");
        this.text3 = this.addText(scene, 16, 32 * 3, '64px', "1");
    }

    update(player) {
        this.text1.text = STATS[0] + " : " + player.stats[0];
        this.text2.text = STATS[1] + " : " + player.stats[1];
        this.text3.text = STATS[2] + " : " + player.stats[2];
    }

    addText(scene, x, y, size, text) {
        return scene.add.text(x, y, text, { fontFamily: 'm3x6', fontSize: size, color: '#000000', width: 300 }).setScrollFactor(0);
    }

}