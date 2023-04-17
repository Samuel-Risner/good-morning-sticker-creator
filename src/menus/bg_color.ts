import { Canvas } from "../canvas";
import { ColorPicker } from "./color_picker";

export class BgColor {

    private button: HTMLButtonElement;

    constructor(
        private colorPicker: ColorPicker,
        private canvas: Canvas

    ) {
        this.button = document.getElementById("chooseBackgroundColor") as HTMLButtonElement;
        this.button.onclick = () => {
            console.log("foo");
            this.show();
        }
    }

    private applyColor() {
        this.canvas.setBgColor(this.colorPicker.getActiveColor());
    }

    show() {
        this.colorPicker.setApplyButtonOnClick(() => {
            this.applyColor();
        });
        this.colorPicker.setApplyButtonText("Apply Background Color");
        this.colorPicker.show();
    }
}
