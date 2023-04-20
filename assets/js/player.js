class Player {
    constructor() {
        this.x = _$canvas.height / 2
        this.y = _$canvas.height / 2;
        this.angle = 0;
        this.angleVel = 6 / 180;
    }

    draw() {
        drawCircle('white', [this.x, this.y], 7);
        drawLine('#a1a1a1', [this.x, this.y, this.x + 15 * Math.cos(this.angle), this.y + 15 * Math.sin(this.angle)]);
    }

    turn(direction) {
        if (direction === 'right') {
            this.angle += this.angleVel;
        } else {
            this.angle -= this.angleVel;
        }
    }
}