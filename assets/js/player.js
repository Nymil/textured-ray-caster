class Player {
    constructor(game) {
        this.map = game.map;
        this.x = _$canvas.height / 2
        this.y = _$canvas.height / 2;
        this.angle = 0;
        this.angleVel = 1 / 20;
        this.vel = 4;
    }

    draw() {
        drawCircle('white', [this.x, this.y], 7);
        drawLine('#a1a1a1', [this.x, this.y, this.x + 15 * Math.cos(this.angle), this.y + 15 * Math.sin(this.angle)]);
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
        return !this.map.isWall(Math.floor(nextX / this.map.cellLength), Math.floor(this.y / this.map.cellLength))
    }

    validYMovement(nextY) {
        return !this.map.isWall(Math.floor(this.x / this.map.cellLength), Math.floor(nextY / this.map.cellLength))
    }

    turn(direction) {
        if (direction === 'right') {
            this.angle += this.angleVel;
        } else {
            this.angle -= this.angleVel;
        }
    }
}