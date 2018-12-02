const STATS = ["Stamina", "Strength", "Luck"];

class GUI {

    constructor(scene) {
        // Layout
        this.bg = scene.add.rectangle(32, 32, 240, 256, 0xffffff).setOrigin(0).setScrollFactor(0).setDepth(1500);
        this.addText(scene, 48, 16, '64px', "----STATS----");
        this.left = this.addText(scene, 48, 16 * 4, '48px', "Left : 1");
        this.text1 = this.addText(scene, 48, 16 * 7, '48px', "1");
        this.r1 = scene.add.rectangle(32, 16 * 8, 240, 32, 0xdddddd).setAlpha(0).setOrigin(0).setScrollFactor(0).setDepth(1501);
        this.text2 = this.addText(scene, 48, 16 * 9, '48px', "1");
        this.r2 = scene.add.rectangle(32, 16 * 10, 240, 32, 0xdddddd).setAlpha(0).setOrigin(0).setScrollFactor(0).setDepth(1501);
        this.text3 = this.addText(scene, 48, 16 * 11, '48px', "1");
        this.r3 = scene.add.rectangle(32, 16 * 12, 240, 32, 0xdddddd).setAlpha(0).setOrigin(0).setScrollFactor(0).setDepth(1501);
        this.addText(scene, 48, 16 * 14, '48px', "R : reset (-2)");

        // Non visual
        this.selected = 0;
    }

    update(player) {
        this.left.text = "Left : " + player.points;
        this.text1.text = STATS[0] + " : " + player.stats[0];
        this.text2.text = STATS[1] + " : " + player.stats[1];
        this.text3.text = STATS[2] + " : " + player.stats[2];
    }

    move(i) {
        this.r1.setAlpha(0);
        this.r2.setAlpha(0);
        this.r3.setAlpha(0);
        this.selected = (this.selected + i + 3) % 3;
        switch (this.selected) {
            case 0:
                this.r1.setAlpha(0.5)
                break;
            case 1:
                this.r2.setAlpha(0.5)
                break;
            case 2:
                this.r3.setAlpha(0.5)
                break;
        }
    }

    addText(scene, x, y, size, text) {
        return scene.add.text(x, y, text, { fontFamily: 'm3x6', fontSize: size, color: '#000000', width: 300 }).setScrollFactor(0).setDepth(1510);
    }

}