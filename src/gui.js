const STATS = ["Stamina", "Strength", "Luck"];

class GUI {

    constructor(scene) {
        this.bg = scene.add.rectangle(32, 32, 240, 288, 0xffffff).setOrigin(0).setScrollFactor(0).setDepth(1500);
        this.addText(scene, 48, 16, '64px', "----STATS----");
        this.left = this.addText(scene, 48, 16 * 4, '48px', "Left : 1");
        this.text1 = this.addText(scene, 48, 16 * 7, '48px', "1");
        this.text2 = this.addText(scene, 48, 16 * 9, '48px', "1");
        this.text3 = this.addText(scene, 48, 16 * 11, '48px', "1");
        this.addText(scene, 48, 16 * 14, '48px', "SPACE : confirm");
        this.addText(scene, 48, 16 * 16, '48px', "R : reset (-2)");
    }

    update(player) {
        this.left.text = "Left : " + player.points;
        this.text1.text = STATS[0] + " : " + player.stats[0];
        this.text2.text = STATS[1] + " : " + player.stats[1];
        this.text3.text = STATS[2] + " : " + player.stats[2];
    }

    addText(scene, x, y, size, text) {
        return scene.add.text(x, y, text, { fontFamily: 'm3x6', fontSize: size, color: '#000000', width: 300 }).setScrollFactor(0).setDepth(1501);
    }

}