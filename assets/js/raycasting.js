class Raycasting {
    constructor(game) {
        this.game = game;
        this.rayCount = Math.floor(_$canvas.width / 2);
        this.maxRayDepth = 21;
        this.rayCastingResult = [];
        this.objectsToRender = [];
    }

    rayCast() {
        this.rayCastingResult = [];
        const origin = this.game.player.pos;
        // const mapOrigin = this.game.player.mapPos;

        let rayAngle = this.game.player.angle - (this.game.player.fov / 2) + 0.00001;
        for (let ray = 0; ray < this.rayCount; ray++) {
            const sinAngle = Math.sin(rayAngle);
            const cosAngle = Math.cos(rayAngle);

            const distOne = {
                x: 1 / Math.abs(cosAngle),
                y: 1 / Math.abs(sinAngle)
            }
            const distNext = {
                x: cosAngle < 0 ? (origin.x % 1) * distOne.x + 1e-6 : (1 - (origin.x % 1)) * distOne.x + 1e-6,
                y: sinAngle < 0 ? (origin.y % 1) * distOne.y + 1e-6 : (1 - (origin.y % 1)) * distOne.y + 1e-6
            }

            let distance;
            while (true) {
                if (distNext.x < distNext.y) {
                    distance = distNext.x;
                    distNext.x += distOne.x;
                } else if (distNext.y < distNext.x) {
                    distance = distNext.y;
                    distNext.y += distOne.y;
                } else {
                    distance = distNext.x;
                    distNext.x += distOne.x;
                    distNext.y += distOne.y;
                }

                const curPos = {x: origin.x + distance * cosAngle, y: origin.y + distance * sinAngle};
                if (this.game.map.isWall(Math.floor(curPos.x), Math.floor(curPos.y))) {
                    this.rayCastingResult.push([origin.x, origin.y, curPos.x, curPos.y]);
                    break
                }
            }

            rayAngle += this.game.player.fov / this.rayCount;
        }
    }

    draw() {
        this.rayCastingResult.forEach(result => {
            drawLine('white', result.map(value => value * this.game.map.cellLength))
        });
    }

    getObjectsToRender() {

    }

    update() {
        this.rayCast();
        this.getObjectsToRender();
    }
}
