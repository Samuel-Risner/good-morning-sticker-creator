/**
 * Handles the inputs from the sliders menu.
 */
export class Sliders {
    colorPicker;
    /**
     * The input element for displaying the selected color as hex.
     */
    hexInput;
    /**
     * The sliders for selecting the color in three parts (rgb).
     */
    rangeInputs;
    /**
     * The input elements displaying the selected color in three parts (rgb).
     */
    numberInputs;
    constructor(colorPicker) {
        this.colorPicker = colorPicker;
        this.hexInput = document.getElementById("color slider hex input");
        this.rangeInputs = [
            document.getElementById("color picker sliders range r"),
            document.getElementById("color picker sliders range g"),
            document.getElementById("color picker sliders range b"),
        ];
        this.numberInputs = [
            document.getElementById("color picker sliders number r"),
            document.getElementById("color picker sliders number g"),
            document.getElementById("color picker sliders number b"),
        ];
        this.linkInputs();
    }
    /**
     * Converts the rgb input from the three sliders ("rangeInputs") into hex and stores it in the hex input element ("hexInput").
     */
    rgbToHex() {
        this.hexInput.value = (1 << 24 | Number(this.rangeInputs[0].value) << 16 | Number(this.rangeInputs[1].value) << 8 | Number(this.rangeInputs[2].value)).toString(16).slice(1);
    }
    /**
     * Converts the hex input ("hexInput") into rgb and applies that to the three sliders ("rangeInputs") and the number inputs ("numberInputs").
     * The format of the hex input is also checked, if it is not correctly formatted the input from the sliders is used for the hex value instead (by calling "rgbToHex").
     */
    hexToRgb() {
        const hexValidChars = "abcdef0123456789";
        if (this.hexInput.value.length !== 6) {
            this.rgbToHex();
            return;
        }
        for (const character of this.hexInput.value) {
            if (!hexValidChars.includes(character)) {
                this.rgbToHex();
                return;
            }
        }
        this.rangeInputs[0].value = String(parseInt(this.hexInput.value.substring(0, 2), 16));
        this.rangeInputs[1].value = String(parseInt(this.hexInput.value.substring(2, 4), 16));
        this.rangeInputs[2].value = String(parseInt(this.hexInput.value.substring(4, 6), 16));
        this.numberInputs[0].value = this.rangeInputs[0].value;
        this.numberInputs[1].value = this.rangeInputs[1].value;
        this.numberInputs[2].value = this.rangeInputs[2].value;
    }
    /**
     * Links all the input options together.
     */
    linkInputs() {
        for (let i = 0; i < this.rangeInputs.length; i++) {
            const r = this.rangeInputs[i];
            const n = this.numberInputs[i];
            // When the sliders receive input:
            r.oninput = () => {
                // Set the number inputs to be the same.
                n.value = r.value;
                // Set the hex value/input.
                this.rgbToHex();
                // Change the currently active color.
                this.colorPicker.changeActiveColor(this.getHexValue());
            };
            // When the number inputs receive input:
            n.onchange = () => {
                // If the input is invalid "0" is used instead.
                if (n.value === "") {
                    n.value = "0";
                }
                else if (Number(n.value) > 255) {
                    n.value = "0";
                }
                else if (Number(n.value) < 0) {
                    n.value = "0";
                }
                // Set the slider inputs to be the same.
                r.value = n.value;
                // Set the hex value/input.
                this.rgbToHex();
                // Change the currently active color.
                this.colorPicker.changeActiveColor(this.getHexValue());
            };
        }
        // When the hex input receives input:
        this.hexInput.onchange = () => {
            // Use it (checks are done in the other function).
            this.hexToRgb();
        };
    }
    getHexValue() {
        return "#" + this.hexInput.value;
    }
    setColor(color) {
        this.hexInput.value = color;
        this.hexToRgb();
    }
}
