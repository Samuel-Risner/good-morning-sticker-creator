import { ColorPicker } from "./color_picker.js";

export class MenuHandler {

    private colorPicker: ColorPicker;
    private showColorPickerButtons: NodeListOf<HTMLButtonElement>;

    constructor()  {
        this.colorPicker = new ColorPicker();
        this.showColorPickerButtons = document.getElementsByName("button show color picker") as NodeListOf<HTMLButtonElement>;
        for (const btn of this.showColorPickerButtons) {
            btn.onclick = () => {
                this.colorPicker.show();
            }
        }
    }
}
