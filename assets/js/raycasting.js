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
        const mapOrigin = this.game.player.mapPos;

        let rayAngle = this.game.player.angle - (this.game.player.fov / 2) + 0.00001;
        for (let ray = 0; ray < this.rayCount; ray++) {
            const sinAngle = Math.sin(rayAngle);
            const cosAngle = Math.cos(rayAngle);

            // check horizontal collisions
            const stepHor = {};
            const intersectHor = {};
            if (sinAngle > 0) {
                stepHor.dy = 1;
                intersectHor.y = mapOrigin.row + 1;
            } else {
                stepHor.dy = -1;
                intersectHor.y = mapOrigin.row - 1e-6;
            }

            let depthHor = (intersectHor.y - origin.y) / sinAngle;
            intersectHor.x = origin.x + depthHor * cosAngle;

            const deltaDepthHor = stepHor.dy / sinAngle;
            stepHor.dx = deltaDepthHor * cosAngle;

            for (let i = 0; i < this.maxRayDepth; i++) {
                const tileCoords = {col: Math.floor(intersectHor.x), row: Math.floor(intersectHor.y)};
                if (this.game.map.isWall(tileCoords.col, tileCoords.row)) {
                    break
                }
                intersectHor.y += stepHor.dy;
                intersectHor.x += stepHor.dx;
                depthHor += deltaDepthHor;
            }

            // check vertical collisions
            const stepVert = {};
            const intersectVert = {};
            if (cosAngle > 0) {
                stepVert.dx = 1;
                intersectVert.x = mapOrigin.col + 1;
            } else {
                stepVert.dx = -1;
                intersectVert.x = mapOrigin.col - 1e-6;
            }

            let depthVert = (intersectVert.x - origin.x) / cosAngle;
            intersectVert.y = origin.y + depthVert * sinAngle;

            const deltaDepthVert = stepVert.dx / cosAngle;
            stepVert.dy = deltaDepthVert * sinAngle;

            for (let i = 0; i < this.maxRayDepth; i++) {
                const tileCoords = {col: Math.floor(intersectVert.x), row: Math.floor(intersectVert.y)};
                if (this.game.map.isWall(tileCoords.col, tileCoords.row)) {
                    break
                }
                intersectVert.y += stepVert.dy;
                intersectVert.x += stepVert.dx;
                depthVert += deltaDepthVert;
            }

            if (depthVert < depthHor) {
                this.rayCastingResult.push([origin.x, origin.y, intersectVert.x, intersectVert.y]);
            } else {
                this.rayCastingResult.push([origin.x, origin.y, intersectHor.x, intersectHor.y]);
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
