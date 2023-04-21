class Renderer {
    constructor(game) {
        this.game = game;
        this.texture = '../images/wall.png';
    }

    renderView(rays) {
        rays.forEach((ray, index) => {
            const rayLength = ray.length * Math.cos(this.game.player.angle - ray.angle); // for removing fish eye effect
            const wallHeight = 100000 / rayLength;
            const wallWidth = _$canvas.width / rays.length;
            const posX = index * wallWidth;
            const posY = (_$canvas.height - wallHeight) / 2;
            const brightness = 10000 / (rayLength ** 2) > 1 ? 1 : 10000 / (rayLength ** 2);
            drawRect(`rgb(${255 * brightness}, ${255 * brightness}, ${255 * brightness})`, [posX, posY, wallWidth + 0.75, wallHeight]);
        })
    }
}
