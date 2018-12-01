class Player {

    constructor() {
        this.stats = [];
        this.points = 100;
        this.sprite = null;
        this.block = 0;
        this.nextPos = [];
    }

    init(x, y, scene) {
        this.sprite = scene.add.sprite(x * 8, y * 8, 'player', 0);
        this.sprite.setOrigin(0, 0);
        
    }
    
    update() {
        if (this.block) {
            this.block--;
            var nP = this.nextPos.pop();
            this.sprite.x += nP[0];
            this.sprite.y += nP[1];
        }
    }

    move(direction) {
        if (this.block)
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
                this.nextPos = [[1, 0],[1, 0], [1, 0], [1, 0], [2, 0], [2, 0]];
                break;
        }
    }

}