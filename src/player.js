class Player {

    constructor() {
        this.stats = [];
        this.points = 100;
        this.sprite = null;
        this.block = 0;
        this.pos = [0, 0];
        this.nextPos = [];
    }

    init(x, y, scene) {
        this.pos = [x, y];
        this.sprite = scene.add.sprite((x - y - 1) * 32, (x + y + 3.5) * 16, 'player', 0);
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
        // Next position
        var nPos = [this.pos[0] + direction[0],
                    this.pos[1] + direction[1]];

        // The player can't move
        if (this.block || oob(nPos, map) || checkCollision(nPos, map))
            return false

        // Let's move
        this.block = 16;
        this.pos = nPos;

        switch (direction) {
            case dir.UP:
                this.nextPos = [[32, -16]];
                break;
            case dir.DOWN:
                this.nextPos = [[-32, 16]];
                break;
            case dir.LEFT:
                this.nextPos = [[-32, -16]];
                break;
            case dir.RIGHT:
                this.nextPos = [[32, 16]];
                break;
        }
    }

}