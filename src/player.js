class Player {

    constructor() {
        this.stats = [0, 0, 0];
        this.points = 20;
        this.score = 0;
        this.sprite = null;
        this.block = 0;
        this.pos = [0, 0];
        this.nextPos = [];
        this.finishedLevel = false;
        this.gameOver = false;
    }

    init(x, y, scene) {
        this.pos = [x, y];
        this.sprite = scene.add.sprite((x - y - 1) * 32, (x + y + 3.5) * 16, 'player', 0);
        this.sprite.setOrigin(0, 0);
        this.sprite.depth = 1000;
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

    move(map, direction) {
        // Next position
        var nPos = [this.pos[0] + direction[0], this.pos[1] + direction[1]];
        var cost = moveCost(nPos, map);

        // The player can't move
        if (this.block || oob(nPos, map) || checkCollision(nPos, map) || this.stats[0] < cost) {
            // console.log(`Player can't move : \n - block=${this.block}\n - oob=${oob(nPos, map)}\n - checkcollision=${checkCollision(nPos, map)}\n - cost=${cost}, stats=${this.stats[0]} )`);
            return false;
        }

        // Let's move
        this.block = 24;
        this.pos = nPos;

        switch (direction) {
            case dir.UP:
                this.nextPos = [[1, 0, 0], [2, 8, -4], [3, 8, -4], [4, 4, -2], [5, 4, -2], [6, 4, -2], [7, 4, -2], [0, 0, 0]];
                break;
            case dir.DOWN:
                this.nextPos = [[1, 0, 0], [2, -8, 4], [3, -8, 4], [4, -4, 2], [5, -4, 2], [6, -4, 2], [7, -4, 2], [0, 0, 0]];
                break;
            case dir.LEFT:
                this.nextPos = [[1, 0, 0], [2, -8, -4], [3, -8, -4], [4, -4, -2], [5, -4, -2], [6, -4, -2], [7, -4, -2], [0, 0, 0]];
                break;
            case dir.RIGHT:
                this.nextPos = [[1, 0, 0], [2, 8, 4], [3, 8, 4], [4, 4, 2], [5, 4, 2], [6, 4, 2], [7, 4, 2], [0, 0, 0]];
                break;
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

    reset() {
        if (this.stats[0] > 0 || this.stats[1] > 0 || this.stats[2] > 0) {
            this.points += this.stats[0] + this.stats[1] + this.stats[2];
            this.stats = [0, 0, 0];
            this.points = Math.max(0, this.points - PENALTY);
        }
        if (this.points == 0 && this.stats[0] == 0 && (this.stats[1] + this.stats[2]) < PENALTY) {
            this.gameOver = true;
        }
    }

}