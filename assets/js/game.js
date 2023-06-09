class Game {
    constructor() {
        this.map = new Map();
        this.player = new Player(this);
        this.raycasting = new Raycasting(this);
        this.fps = 1000 / 60;
        this.pressedKeys = [];
        this.addEventListeners();
    }

    update() {
        if (this.pressedKeys.includes('arrowright')) {
            this.player.turn('right');
        } if (this.pressedKeys.includes('arrowleft')) {
            this.player.turn('left');
        }

        if (this.pressedKeys.includes('z')) {
            this.player.move('forward');
        } if (this.pressedKeys.includes('s')) {
            this.player.move('backward');
        } if (this.pressedKeys.includes('d')) {
            this.player.move('right');
        } if (this.pressedKeys.includes('q')) {
            this.player.move('left');
        }
        this.raycasting.rayCast();
    }

    draw() {
        drawRect('black', [0, 0, _$canvas.width, _$canvas.height]);
        this.map.draw();
        this.player.draw();
        this.raycasting.draw();
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
        }, this.fps);
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => this.addPressedKey(e.key.toLowerCase()));
        document.addEventListener('keyup', (e) => this.remPressedKey(e.key.toLowerCase()));
    }
}
