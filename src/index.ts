import { Canvas } from "./canvas.js";
import { BgColor } from "./menus/bg_color.js";
import { ColorPicker } from "./menus/color_picker.js";

export class MenuHandler {

    private canvas: Canvas;

    private colorPicker: ColorPicker;
    private bgColor: BgColor;

    constructor()  {
        this.canvas = new Canvas();

        this.colorPicker = new ColorPicker();
        this.bgColor = new BgColor(this.colorPicker, this.canvas);

        window.onresize = () => {
            this.onWindowResize();
        }

        this.onWindowResize();
    }
    
    onWindowResize() {
        this.canvas.adaptCanvasDisplaySize(window.innerWidth, window.innerHeight);
    }
}

const menuHandler = new MenuHandler();
