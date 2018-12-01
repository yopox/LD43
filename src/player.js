class Player {

    constructor() {
        this.stats = [];
        this.points = 100;
        this.sprite = null;
        this.block = 0;
        this.nextPos = [];
    }

    init(x, y, scene) {
        this.sprite = scene.add.sprite((x + y) * 32, (x - y) * 16 + 40, 'player', 0);
        this.sprite.setOrigin(0, 0);
        this.sprite.depth = 1000;
        scene.cameras.main.startFollow(this.sprite);
    }

    update() {
        if (this.block) {
            this.block--;
            var nP = this.nextPos.pop();

            if (nP) {
                this.sprite.x += nP[0];
                this.sprite.y += nP[1];
            }
        }
    }

    move(map, direction) {
        var nPos = [Math.floor(this.sprite.x / 8) + direction[0],
        Math.floor(this.sprite.y / 8) + direction[1]];

        if (this.block || oob(nPos, map) || checkCollision(nPos, map))
            return false

        this.block = 16;
        switch (direction) {
            case dir.UP:
                this.nextPos = [[0, -1], [0, -1], [0, -1], [0, -1], [0, -2], [0, -2]];
                break;
            case dir.DOWN:
                this.nextPos = [[0, 1], [0, 1], [0, 1], [0, 1], [0, 2], [0, 2]];
                break;
            case dir.LEFT:
                this.nextPos = [[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-2, 0], [-2, 0]];
                break;
            case dir.RIGHT:
                this.nextPos = [[1, 0], [1, 0], [1, 0], [1, 0], [2, 0], [2, 0]];
                break;
        }
    }

}