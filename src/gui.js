const STATS = ["Stamina", "Strength", "Wisdom"];
const RESET_TEXT = "S to sacrifice (-2)";
const GUI_OFFSET = 128 * 16;
const GUI_Y = [16, 96, 360];

class GUI {

    constructor(scene, map) {

        // SCORE
        scene.add.rectangle(GUI_OFFSET, GUI_Y[0], 240, 64, 0xffffff).setOrigin(0).setDepth(1500);
        this.score = this.addText(scene, 16, GUI_Y[0]- 16, '48px', "");
        this.sacrifices = this.addText(scene, 16, GUI_Y[0] + 16, '48px', "");

        // STATS
        scene.add.rectangle(GUI_OFFSET, GUI_Y[1], 240, 248, 0xffffff).setOrigin(0).setDepth(1500);
        this.addText(scene, 16, GUI_Y[1] - 16, '64px', "STATS");
        this.left = this.addText(scene, 16, GUI_Y[1] + 16 * 2, '48px', "");
        this.text1 = this.addText(scene, 16, GUI_Y[1] + 16 * 5, '48px', "");
        this.r1 = scene.add.rectangle(GUI_OFFSET, GUI_Y[1] + 16 * 6, 240, 32, 0xdddddd).setAlpha(0).setOrigin(0).setDepth(1501);
        this.text2 = this.addText(scene, 16, GUI_Y[1] + 16 * 7, '48px', "");
        this.r2 = scene.add.rectangle(GUI_OFFSET, GUI_Y[1] + 16 * 8, 240, 32, 0xdddddd).setAlpha(0).setOrigin(0).setDepth(1501);
        this.text3 = this.addText(scene, 16, GUI_Y[1] + 16 * 9, '48px', "");
        this.r3 = scene.add.rectangle(GUI_OFFSET, GUI_Y[1] + 16 * 10, 240, 32, 0xdddddd).setAlpha(0).setOrigin(0).setDepth(1501);
        this.addText(scene, 16, GUI_Y[1] + 16 * 12, '48px', RESET_TEXT);

        // TEXT
        scene.add.rectangle(GUI_OFFSET, GUI_Y[2], 240, 128, 0xffffff).setOrigin(0).setDepth(1500);
        this.addText(scene, 16, GUI_Y[2], '48px', map.desc).setLineSpacing(-16);

        // Cameras
        this.guiCam0 = scene.cameras.add(32, GUI_Y[0], 240, 64);
        this.guiCam0.scrollX = GUI_OFFSET;
        this.guiCam0.scrollY = GUI_Y[0];
        this.guiCam1 = scene.cameras.add(32, GUI_Y[1], 240, 248);
        this.guiCam1.scrollX = GUI_OFFSET;
        this.guiCam1.scrollY = GUI_Y[1];
        this.guiCam2 = scene.cameras.add(32, GUI_Y[2], 240, 128);
        this.guiCam2.scrollX = GUI_OFFSET;
        this.guiCam2.scrollY = GUI_Y[2];

        // Non visual
        this.selected = 0;
    }

    update(player) {
        this.score.text = "Points : " + player.score;
        this.sacrifices.text = "Sacrifices : " + player.sacrifices;
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
        return scene.add.text(GUI_OFFSET + x, y, text, { fontFamily: 'm3x6', fontSize: size, color: '#000000', width: 300 }).setDepth(1510);
    }

    fadeAll(scene) {
        scene.tweens.add({
            targets: [this.guiCam0, this.guiCam1, this.guiCam2],
            alpha: 0,
            ease: 'Power1',
            duration: 250,
            repeat: 0
        });
    }

}