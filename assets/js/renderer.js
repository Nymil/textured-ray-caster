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
            const offsetPercentage = this.getOffsetPercentage(ray);
            _ctx.drawImage(this.texture, offsetPercentage * this.texture.width, 0, 0.002 * this.texture.width, this.texture.height, posX, posY, wallWidth, wallHeight);
        })
    }

    getOffsetPercentage(ray) {
        let offset;
        if (ray.hitDirection === 0) {
            // use y
            offset = Math.sin(ray.angle) < 0 ? this.game.map.cellLength - (ray.endY % this.game.map.cellLength) : ray.endY % this.game.map.cellLength;
        } else {
            // use x
            offset = Math.cos(ray.angle) < 0 ? ray.endX % this.game.map.cellLength : this.game.map.cellLength - (ray.endX % this.game.map.cellLength);
        }
        return offset / this.game.map.cellLength;
    }
}
