class GUI {

    constructor(scene) {
        scene.add.text(580, 32, 'STATISTICS', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        scene.add.text(580, 480 - 32, 'RETRY LEVEL', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        scene.add.text(580, 480 - 32 * 3, 'RESET', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        scene.add.text(580, 480 - 32 * 6, 'OK', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);

        this.left = scene.add.text(580, 32 * 2, '08 left', { fontFamily: 'm3x6', fontSize: '32px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        scene.add.text(580, 32 * 3, 'Stat 1', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        this.stat1 = scene.add.text(580, 32 * 4, '-  12  +', { fontFamily: 'm3x6', fontSize: '32px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        this.stat2 = scene.add.text(580, 32 * 5, 'Stat 2', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
        this.stat3 = scene.add.text(580, 32 * 7, 'Stat 3', { fontFamily: 'm3x6', fontSize: '48px', color: '#000000', width: 300, align: 'center' }).setOrigin(0.5);
    }

}