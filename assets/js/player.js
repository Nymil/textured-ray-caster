class Player {
    constructor(game) {
        this.map = game.map;
        this.x = this.map.board.length / 2;
        this.y = this.map.board.length / 2;
        this.angle = 0;
        this.angleVel = 0.06;
        this.vel = 0.08;
    }

    draw() {
        const visualCenter = {x: this.x * this.map.cellLength, y: this.y * this.map.cellLength};
        drawCircle('white', [visualCenter.x, visualCenter.y], 7);
        drawLine('#a1a1a1', [visualCenter.x, visualCenter.y, visualCenter.x + 15 * Math.cos(this.angle), visualCenter.y + 15 * Math.sin(this.angle)]);
    }

    move(direction) {
        let nextX;
        let nextY;

        if (direction === 'forward') {
            nextX = this.x + this.vel * Math.cos(this.angle);
            nextY = this.y + this.vel * Math.sin(this.angle);
        } else if (direction === 'backward') {
            nextX = this.x - this.vel * Math.cos(this.angle);
            nextY = this.y - this.vel * Math.sin(this.angle);
        } else if (direction === 'left') {
            nextX = this.x + this.vel * Math.cos(this.angle - Math.PI / 2);
            nextY = this.y + this.vel * Math.sin(this.angle - Math.PI / 2);
        } else {
            nextX = this.x + this.vel * Math.cos(this.angle + Math.PI / 2);
            nextY = this.y + this.vel * Math.sin(this.angle + Math.PI / 2);
        }

        if (this.validXMovement(nextX)) this.x = nextX;
        if (this.validYMovement(nextY)) this.y = nextY;
    }

    validXMovement(nextX) {
        return !this.map.isWall(Math.floor(nextX), this.mapPos.row);
    }

    validYMovement(nextY) {
        return !this.map.isWall(this.mapPos.col, Math.floor(nextY));
    }

    turn(direction) {
        if (direction === 'right') {
            this.angle += this.angleVel;
        } else {
            this.angle -= this.angleVel;
        }
    }

    get mapPos() {
        return {
            col: Math.floor(this.x),
            row: Math.floor(this.y)
        }
    }
}