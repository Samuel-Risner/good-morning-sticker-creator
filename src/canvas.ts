export class Canvas {

    private canvasContainer: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D

    private bgColor: string | null;
    private border: string | null;
    private image: string | null;
    private text: string | null;

    constructor() {
        this.canvasContainer = document.getElementById("canvasContainer") as HTMLDivElement;
        this.canvas= document.createElement("canvas");
        this.canvasContainer.appendChild(this.canvas);
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.bgColor = null;
        this.border = null;
        this.image = null;
        this.text = null;
    }

    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.bgColor !== null) {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    setBgColor(bgColor: string) {
        this.bgColor = bgColor;
        this.drawCanvas();
    }

}
