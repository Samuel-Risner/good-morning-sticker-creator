import { ColorPicker } from "../color_picker.js";
import { rgbToHex } from "./../misc.js";

/**
 * Handles the inputs from the sliders menu.
 */
export class Sliders {

    /**
     * The input element for displaying the selected color as hex ("#xxxxxx").
     */
    private hexInput: HTMLInputElement;

    /**
     * The sliders for selecting the color in three parts (rgb).
     */
    private rangeInputs: [HTMLInputElement, HTMLInputElement, HTMLInputElement];
    /**
     * The input elements displaying the selected color in three parts (rgb).
     */
    private numberInputs: [HTMLInputElement, HTMLInputElement, HTMLInputElement];

    constructor(
        private colorPicker: ColorPicker
    ) {
        this.hexInput = document.getElementById("color slider hex input") as HTMLInputElement;

        this.rangeInputs = [
            document.getElementById("color picker sliders range r") as HTMLInputElement,
            document.getElementById("color picker sliders range g") as HTMLInputElement,
            document.getElementById("color picker sliders range b") as HTMLInputElement,
        ]
        this.numberInputs = [
            document.getElementById("color picker sliders number r") as HTMLInputElement,
            document.getElementById("color picker sliders number g") as HTMLInputElement,
            document.getElementById("color picker sliders number b") as HTMLInputElement,
        ]

        this.linkInputs();
    }

    /**
     * Converts the rgb input from the three sliders ("rangeInputs") into hex and stores it in the hex input element ("hexInput").
     */
    private rgbToHex() {
        this.hexInput.value = rgbToHex(this.rangeInputs[0].value, this.rangeInputs[1].value, this.rangeInputs[2].value);
    }

    /**
     * Converts the hex input ("hexInput") into rgb and applies that to the three sliders ("rangeInputs") and the number inputs ("numberInputs").
     * The format of the hex input is also checked, if it is not correctly formatted the input from the sliders is used for the hex value instead (by calling "rgbToHex").
     */
    private hexToRgb() {
        const hexValidChars = "abcdef0123456789";
        
        // If the hex input does not have seven characters ("#xxxxxx") the sliders inputs are used to create a new hex value.
        if ((this.hexInput.value.length !== 7) || (!this.hexInput.value.startsWith("#"))) {
            this.rgbToHex();
            return;
        }

        // Check the last six characters/not the first one.
        for (const character of this.hexInput.value.substring(1)) {
            if (!hexValidChars.includes(character)) {
                this.rgbToHex();
                return;
            }
        }

        // Set the other inputs to match the hex value.

        this.rangeInputs[0].value = String(parseInt(this.hexInput.value.substring(1, 3), 16));
        this.rangeInputs[1].value = String(parseInt(this.hexInput.value.substring(3, 5), 16));
        this.rangeInputs[2].value = String(parseInt(this.hexInput.value.substring(5, 7), 16));

        this.numberInputs[0].value = this.rangeInputs[0].value;
        this.numberInputs[1].value = this.rangeInputs[1].value;
        this.numberInputs[2].value = this.rangeInputs[2].value;
    }

    /**
     * Links all the input options together.
     */
    private linkInputs() {
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
            }

            // When the number inputs receive input:
            n.onchange = () => {
                // If the input is invalid "0" is used instead.
                if (n.value === "") {
                    n.value = "0";
                } else if (Number(n.value) > 255) {
                    n.value = "0";
                } else if (Number(n.value) < 0) {
                    n.value = "0";
                }

                // Set the slider inputs to be the same.
                r.value = n.value;
                // Set the hex value/input.
                this.rgbToHex();
                // Change the currently active color.
                this.colorPicker.changeActiveColor(this.getHexValue());
            }
        }

        // When the hex input receives input:
        this.hexInput.onchange = () => {
            // Use it (checks are done in the other function).
            this.hexToRgb();
            // Change the currently active color.
            this.colorPicker.changeActiveColor(this.getHexValue());
        }
    }

    getHexValue(): string {
        return this.hexInput.value;
    }

    /**
     * Sets the hex input to match the passed colors and calls "hexToRgb".
     * @param color The color as hex ("#xxxxxx").
     */
    setColor(color: string) {
        this.hexInput.value = color;
        this.hexToRgb();
    }
}
