class AnimationElement extends HTMLElement {
    private ctx: CanvasRenderingContext2D;
    private sprite: HTMLImageElement;
    private height: number;
    private width: number;
    private currentPos: number = 0;
    private spritesCount: number;
    private currFrame: number = 0;
    private fps: number;

    constructor() {
        super();
    }

    connectedCallback() {
        const image = this.querySelector('img');
        if (!image) {
            console.error('Animation Element needs a Sprite Image');
            return null;
        } else {
            this.sprite = image;
        }
        this.sprite.style.display = 'none';
        this.width = Number(this.getAttribute('width') || 640);
        this.height = Number(this.getAttribute('height') || 480);
        this.spritesCount = Number(this.getAttribute('sprites-count') || 1);
        this.fps = Number(this.getAttribute('fps') || 24)
        console.log(this.spritesCount)
        this.createCanvas();
        this.draw();
        console.log("Custom element added to page.", this.width, this.height);
        setInterval(() => {
            this.animate();
        }, 1000 / this.fps);
    }

    private animate() {
        this.update();
        this.draw();
    }

    private update() {
        this.currFrame++;
        this.currentPos = this.currFrame % this.spritesCount;
    }

    private draw() {
        this.ctx.drawImage(this.sprite, this.width * -this.currentPos,0);
    }

    private createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext('2d')!;
        this.append(canvas);
    }

}

customElements.define('animation-element', AnimationElement);