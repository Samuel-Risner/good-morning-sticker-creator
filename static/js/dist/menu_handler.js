import { Canvas } from "./canvas.js";
import { BgColor } from "./menus/bg_color.js";
import { ColorPicker } from "./menus/color_picker.js";
export class MenuHandler {
    canvas;
    colorPicker;
    bgColor;
    showColorPickerButtons;
    constructor() {
        this.canvas = new Canvas();
        this.colorPicker = new ColorPicker();
        this.bgColor = new BgColor(this.colorPicker, this.canvas);
        this.showColorPickerButtons = document.getElementsByName("button show color picker");
        for (const btn of this.showColorPickerButtons) {
            btn.onclick = () => {
                this.colorPicker.show();
            };
        }
    }
}
