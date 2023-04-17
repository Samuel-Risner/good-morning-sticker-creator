export class BgColor {
    colorPicker;
    canvas;
    button;
    constructor(colorPicker, canvas) {
        this.colorPicker = colorPicker;
        this.canvas = canvas;
        this.button = document.getElementById("chooseBackgroundColor");
        this.button.onclick = () => {
            console.log("foo");
            this.show();
        };
    }
    applyColor() {
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
