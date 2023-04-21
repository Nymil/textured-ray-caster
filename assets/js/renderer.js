class Renderer {
    constructor(game) {
        this.game = game;
        this.texture = document.querySelector('img');
    }

    renderView(rays) {
        rays.forEach((ray, index) => {
            const rayLength = ray.length * Math.cos(this.game.player.angle - ray.angle); // for removing fish eye effect
            const wallHeight = 100000 / rayLength;
            const wallWidth = _$canvas.width / rays.length;
            const posX = index * wallWidth;
            const posY = (_$canvas.height - wallHeight) / 2;
        })
        _ctx.drawImage(this.texture, 0, 0);
    }
}
