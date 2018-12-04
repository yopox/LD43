const POPUP_OFFSET = 128 * 40;
const GAME_OVER_TEXT = 'Game Over ;c';
const WIN_TEXT = 'Level Complete !';

class Popup {

    constructor(scene) {
        // POPUP
        this.bg = scene.add.rectangle(POPUP_OFFSET, 64, 320, 208, 0xffffff).setOrigin(0).setDepth(2500).setAlpha(0);
        this.title = this.addText(scene, 160, 32 + 56, '64px', '').setAlpha(0);
        this.Wline1 = this.addText(scene, 160, 64 + 64, '32px', '').setAlpha(0);
        this.Wline2 = this.addText(scene, 160, 96 + 64, '128px', '84%').setAlpha(0);
        this.Wline3 = this.addText(scene, 160, 168 + 64, '48px', 'Press SPACE to continue').setAlpha(0);
        this.GOline1 = this.addText(scene, 160, 96 + 64, '48px', 'Press R to retry').setAlpha(0);
        this.GOline2 = this.addText(scene, 160, 152 + 64, '48px', 'Press SPACE to\nplay another level').setAlpha(0);

        // Camera
        this.popupCam = scene.cameras.add(304+152-32, 148, 320, 272);
        this.popupCam.scrollX = POPUP_OFFSET;
    }

    addText(scene, x, y, size, text) {
        return scene.add.text(POPUP_OFFSET + x, y, text, { fontFamily: 'm3x6', fontSize: size, color: '#000000', width: 300, align: 'center' }).setOrigin(0.5).setDepth(2510).setLineSpacing(-16);
    }

    fade(scene) {
        scene.tweens.add({
            targets: this.popupCam,
            alpha: 0,
            ease: 'Power1',
            duration: 250,
            repeat: 0
        });
    }

}