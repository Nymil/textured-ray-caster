class Game {
    constructor() {
        this.player = new Player();
        this.fps = 60;
        this.pressedKeys = [];
        this.addEventListeners();
    }

    update() {
    }

    draw() {
        drawRect('black', [0, 0, _$canvas.width, _$canvas.height]);
    }

    addPressedKey(key) {
        if (!this.pressedKeys.includes(key)) this.pressedKeys.push(key);
    }

    remPressedKey(key) {
        this.pressedKeys = this.pressedKeys.filter(pressedKey => key !== pressedKey);
    }

    run() {
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.fps);
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => this.addPressedKey(e.key.toLowerCase()));
        document.addEventListener('keyup', (e) => this.remPressedKey(e.key.toLowerCase()));
    }
}