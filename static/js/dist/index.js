import { Canvas } from "./canvas.js";
import { BgColor } from "./menus/bg_color.js";
import { ColorPicker } from "./menus/color_picker.js";
export class MenuHandler {
    canvas;
    colorPicker;
    bgColor;
    constructor() {
        this.canvas = new Canvas();
        this.colorPicker = new ColorPicker();
        this.bgColor = new BgColor(this.colorPicker, this.canvas);
    }
}
