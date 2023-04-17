export class Canvas {
    canvasContainer;
    canvas;
    ctx;
    bgColor;
    border;
    image;
    text;
    constructor() {
        this.canvasContainer = document.getElementById("canvasContainer");
        this.canvas = document.createElement("canvas");
        this.canvasContainer.appendChild(this.canvas);
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d");
        this.bgColor = null;
        this.border = null;
        this.image = null;
        this.text = null;
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.bgColor !== null) {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    setBgColor(bgColor) {
        this.bgColor = bgColor;
        this.drawCanvas();
    }
}
