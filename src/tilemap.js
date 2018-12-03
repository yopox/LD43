class Tilemap {

    constructor(map, scene) {
        var data = scene.cache.json.get(map);

        this.desc = data.properties[0].value;
        this.points = data.properties[1].value;
        this.score = data.properties[2].value;

        this.tileWidthHalf = 47;
        this.tileHeightHalf = 27;

        this.layers = data.layers;

        this.width = data.layers[0].width;
        this.height = data.layers[0].height;

        this.startingPos = [0, 0];
        this.goal = [0, 0];

        this.axes = [];
        this.axesSpr = [];
        this.trees = [];
        this.treesSpr = [];
        this.rocks = [];
        this.rocksSpr = [];
        this.gem = [];
        this.gemSpr = [];

        this.frame = 0;

        // Get starting, ending, axe, tree positions
        for (let i = 0; i < this.layers[0].data.length; i++) {
            var j = Math.floor(i / this.width);

            // Starting & Ending
            if (this.layers[0].data[i] == 6) {
                this.startingPos = [i % this.width, j];
            } else if (this.layers[0].data[i] == 7) {
                this.goal = [i % this.width, j];
            }

            // Axe and tree
            switch (this.layers[1].data[i]) {
                case 11:
                    this.axes.push([i % this.width, j, true]);
                    break;
                case 12:
                    this.trees.push([i % this.width, j, true]);
                    break;
                case 13:
                    this.rocks.push([i % this.width, j]);
                    break;
                case 14:
                    this.gem.push([i % this.width, j, true]);
                    break;
                default:
                    break;
            }
        }

        for (let i = 0; i < this.axes.length; i++) {
            var x = this.axes[i][0];
            var y = this.axes[i][1];
            this.axesSpr.push(scene.add.sprite((x - y) * 47 + 2, (x + y) * 27 - 25, 'axe', 0).setDepth(500 + x + y));
        }

        for (let i = 0; i < this.trees.length; i++) {
            var x = this.trees[i][0];
            var y = this.trees[i][1];
            this.treesSpr.push(scene.add.sprite((x - y) * 47 - 2, (x + y) * 27 - 68, 'tree', 0).setDepth(500 + x + y));
        }

        for (let i = 0; i < this.rocks.length; i++) {
            var x = this.rocks[i][0];
            var y = this.rocks[i][1];
            this.rocksSpr.push(scene.add.sprite((x - y) * 47, (x + y) * 27, 'rock').setDepth(500 + x + y));
        }

        for (let i = 0; i < this.gem.length; i++) {
            var x = this.gem[i][0];
            var y = this.gem[i][1];
            this.gemSpr.push(scene.add.sprite((x - y) * 47, (x + y) * 27 - 8, 'gem').setDepth(500 + x + y));
        }

    }

    buildMap(scene) {
        var centerX = 0;
        var centerY = 0;
        var layer = this.layers[0].data;

        var i = 0;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var id = layer[i] - 1;

                var tx = (x - y) * this.tileWidthHalf;
                var ty = (x + y) * this.tileHeightHalf;

                if (id >= 0) {
                    var tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);
                    tile.depth = x + y;
                }
                i++;
            }
        }
    }

    update() {
        this.frame = (this.frame + 1) % 64;

        if (!(this.frame % 8)) {
            for (let i = 0; i < this.axesSpr.length; i++) {
                if (this.frame / 8 < 4) {
                    this.axesSpr[i].y += 1;
                } else {
                    this.axesSpr[i].y -= 1;
                }
            }
                
            if (this.gem[0][2]) {
                if (this.frame / 8 < 4) {
                    this.gemSpr[0].y += 1;
                } else {
                    this.gemSpr[0].y -= 1;
                }
            }
        }

    }

    isTree(pos) {
        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i][2] && this.trees[i][0] == pos[0] && this.trees[i][1] == pos[1]) {
                return true;
            }
        }
        return false;
    }

    isRock(pos) {
        for (let i = 0; i < this.rocks.length; i++) {
            if (this.rocks[i][0] == pos[0] && this.rocks[i][1] == pos[1]) {
                return true;
            }
        }
        return false;
    }

    cut(scene, pos) {
        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i][2] && this.trees[i][0] == pos[0] && this.trees[i][1] == pos[1]) {
                this.trees[i][2] = false;
                var x = pos[0];
                var y = pos[1];
                scene.tweens.add({
                    targets: this.treesSpr[i],
                    alpha: 0,
                    ease: 'Power1',
                    duration: 250,
                    delay: 50,
                    repeat: 0
                });
                this.treesSpr.push(scene.add.sprite((x - y) * 47 - 2, (x + y) * 27 - 68, 'tree', 1).setDepth(499));

                return true;
            }
        }
    }

    getAxe(scene, pos) {
        for (let i = 0; i < this.axes.length; i++) {
            if (this.axes[i][2] && this.axes[i][0] == pos[0] && this.axes[i][1] == pos[1]) {
                this.axes[i][2] = false;
                scene.tweens.add({
                    targets: this.axesSpr[i],
                    alpha: 0,
                    ease: 'Power1',
                    duration: 250,
                    delay: 50,
                    repeat: 0
                });
                return true;
            }
        }

        return false;
    }

    getGem(scene, pos) {
        if (this.gem[0][2] && this.gem[0][0] == pos[0] && this.gem[0][1] == pos[1]) {
            this.gem[0][2] = false;
            scene.tweens.add({
                targets: this.gemSpr[0],
                alpha: 0,
                ease: 'Power1',
                duration: 250,
                delay: 50,
                repeat: 0
            });
            return true;
        }

        return false;
    }

    checkCollision(pos) {

        var coll = false;

        for (let i = 0; i < this.axes.length; i++) {
            if (this.axes[i][2]) {
                var x = this.axes[i][0];
                var y = this.axes[i][1];
                coll = coll || (pos[0] == x && pos[1] == y);
            }
        }

        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i][2]) {
                var x = this.trees[i][0];
                var y = this.trees[i][1];
                coll = coll || (pos[0] == x && pos[1] == y);
            }
        }

        for (let i = 0; i < this.rocks.length; i++) {
            var x = this.rocks[i][0];
            var y = this.rocks[i][1];
            coll = coll || (pos[0] == x && pos[1] == y);
        }

        return coll;
    }

    pushRock(scene, nPos, direction) {

        for (let i = 0; i < this.rocks.length; i++) {
            var x = this.rocks[i][0];
            var y = this.rocks[i][1];

            if (x == nPos[0] && y == nPos[1]) {
                this.rocks[i][0] += direction[0];
                this.rocks[i][1] += direction[1];

                var vx = (direction[0] - direction[1]) * this.tileWidthHalf;
                var vy = (direction[0] + direction[1]) * this.tileHeightHalf;

                this.rocksSpr[i].setDepth(500 + this.rocks[i][0] + this.rocks[i][1]);

                scene.tweens.add({
                    targets: this.rocksSpr[i],
                    props: {
                        x: { value: '+=' + vx, duration: 350, ease: 'Power1' },
                        y: { value: '+=' + vy, duration: 350, ease: 'Power1' }
                    },
                    repeat: 0
                });
            }

        }

    }

}