import { ColorPicker } from "./color_picker.js";
export class MenuHandler {
    colorPicker;
    showColorPickerButtons;
    constructor() {
        this.colorPicker = new ColorPicker();
        this.showColorPickerButtons = document.getElementsByName("button show color picker");
        for (const btn of this.showColorPickerButtons) {
            btn.onclick = () => {
                this.colorPicker.show();
            };
        }
    }
}
