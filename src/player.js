class Player {

    constructor(nPoints) {
        this.stats = [0, 0, 0];
        this.points = nPoints;
        this.score = 0;
        this.sacrifices = 0;
        this.sprite = null;
        this.axes = 0;
        this.block = 0;
        this.pos = [0, 0];
        this.nextPos = [];
        this.finishedLevel = false;
        this.gameOver = false;
    }

    init(x, y, scene) {
        this.pos = [x, y];
        console.log(this.pos);

        this.sprite = scene.add.sprite((x - y) * 47 - 26, (x + y) * 27 - 87, 'player', 0);
        this.sprite.setOrigin(0, 0);
        this.sprite.depth = 1000;
        this.sprite.setFrame(21);
    }

    update() {
        if (this.block) {
            this.block--;

            if (this.nextPos.length && this.block % 2 == 0) {
                var nP = this.nextPos.pop();
                this.sprite.x += nP[1];
                this.sprite.y += nP[2];
                this.sprite.setFrame(nP[0]);
            }
        }
    }

    move(scene, map, direction) {
        // Next position
        var nPos = [this.pos[0] + direction[0], this.pos[1] + direction[1]];
        var cost = moveCost(nPos, map);

        // Tree ?
        if (!this.block && map.isTree(nPos)) {

            // Can we cut ?
            if (this.stats[1] >= CUT_COST && this.axes > 0) {
                map.cut(scene, nPos);
                this.stats[1] -= CUT_COST;
                this.axes -= 1;
                this.block = 30;
            } else {
                return false
            }

        } else {

            // The player can't move
            if (this.block || oob(nPos, map) || checkCollision(nPos, map) || this.stats[0] < cost) {
                if (!this.block)
                    this.updateFacing(direction);
                return false;
            }

            // Let's move
            this.block = 30;
            this.pos = nPos;
            this.sprite.depth = 500 + nPos[0] + nPos[1];

            switch (direction) {
                case dir.UP:
                    this.nextPos = [[1, 0, 0], [1, 0, 0], [1, 0, 0], [2, 12, -7], [2, 12, -7], [3, 6, -4], [3, 6, -3], [4, 6, -3], [4, 5, -3], [0, 0, 0]].reverse();
                    break;
                case dir.DOWN:
                    this.nextPos = [[2 * 7 + 1, 0, 0], [2 * 7 + 1, 0, 0], [2 * 7 + 1, 0, 0], [2 * 7 + 2, -12, 7], [2 * 7 + 2, -12, 7], [2 * 7 + 3, -6, 4], [2 * 7 + 3, -6, 3], [2 * 7 + 4, -6, 3], [2 * 7 + 4, -6, 3], [2 * 7, 0, 0]].reverse();
                    break;
                case dir.LEFT:
                    this.nextPos = [[7 + 1, 0, 0], [7 + 1, 0, 0], [7 + 1, 0, 0], [7 + 2, -12, -7], [7 + 2, -12, -7], [7 + 3, -6, -4], [7 + 3, -6, -3], [7 + 4, -6, -3], [7 + 4, -5, -3], [7 + 0, 0, 0]].reverse();
                    break;
                case dir.RIGHT:
                    this.nextPos = [[3 * 7 + 1, 0, 0], [3 * 7 + 1, 0, 0], [3 * 7 + 1, 0, 0], [3 * 7 + 2, 12, 7], [3 * 7 + 2, 12, 7], [3 * 7 + 3, 6, 4], [3 * 7 + 3, 6, 3], [3 * 7 + 4, 6, 3], [3 * 7 + 4, 5, 3], [3 * 7 + 0, 0, 0]].reverse();
                    break;
            }

            // Found axe ?
            if (map.getAxe(scene, this.pos)) {
                this.axes += 1;
            }

            // Update stats
            this.stats[0] -= cost;
            this.score += this.stats[2];

            // The level is over
            if (this.pos[0] == map.goal[0] && this.pos[1] == map.goal[1]) {
                this.finishedLevel = true;
            } else if (this.points == 0 && this.stats[0] == 0 && (this.stats[1] + this.stats[2]) < PENALTY) {
                this.gameOver = true;
            }

        }

        return true;
    }

    canSacrifice() {
        return this.stats[0] > 0 || this.stats[1] > 0 || this.stats[2] > 0
    }

    reset(scene) {
        if (this.canSacrifice()) {
            this.points += this.stats[0] + this.stats[1] + this.stats[2];
            this.stats = [0, 0, 0];
            this.points = Math.max(0, this.points - PENALTY);
            scene.cameras.main.shake(250, 0.005);
            this.sacrifices++;
        }
        if (this.points == 0 && this.stats[0] == 0 && (this.stats[1] + this.stats[2]) < PENALTY) {
            this.gameOver = true;
        }
    }

    updateFacing(direction) {
        switch (direction) {
            case dir.UP:
                this.sprite.setFrame(0);
                break;
            case dir.DOWN:
                this.sprite.setFrame(14);
                break;
            case dir.LEFT:
                this.sprite.setFrame(7);
                break;
            case dir.RIGHT:
                this.sprite.setFrame(21);
                break;
        }
    }

}