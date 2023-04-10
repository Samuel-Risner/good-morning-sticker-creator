import { Sliders } from "./color_picker_menus/sliders.js";
import { SavedColors } from "./color_picker_menus/saved_colors.js";
import { Grid } from "./color_picker_menus/grid.js";
import { anyColorToHex } from "./misc.js";
/**
 * # Explanation:
 *
 * ## Selecting a color is made out of four menus:
 *  1. Active color and saved colors
 *
 *  This menu is always visible for as long as the color selector is activated.
 *  The currently active color is displayed there and can also be saved. The saved colors can also be deleted.
 *
 * 2. Sliders Menu
 *
 * This menu consists of three parts:
 *  - Three range input elements for selection the three rgb parts.
 *  - Three number input elements fort the same reason.
 *  - One text input element for getting and displaying the hex value of the selected color.
 *
 * // TODO: Add the other two menus
 *
 * ## How the menus function:
 *  Whenever you select a color in one of the menus it is automatically used for the active color and also applied in the other two menus. Meaning that all thee menus always display the same color.
 *
 * // TODO: elaborate
 *
 */
export class ColorPicker {
    mainMenu;
    buttons;
    menus;
    grid;
    sliders;
    savedColors;
    closeButton;
    constructor() {
        this.mainMenu = document.getElementById("color picker");
        this.buttons = [
            document.getElementById("color picker grid button"),
            document.getElementById("color picker spectrum button"),
            document.getElementById("color picker sliders button"),
        ];
        this.menus = [
            document.getElementById("color picker grid menu"),
            document.getElementById("color picker spectrum menu"),
            document.getElementById("color picker sliders menu"),
        ];
        this.grid = new Grid(this);
        this.sliders = new Sliders(this);
        this.savedColors = new SavedColors(this);
        this.closeButton = document.getElementById("color picker close button");
        this.closeButton.onclick = () => { this.hide(); };
        this.setOnClicks();
    }
    /**
     * When one of the buttons ("buttons") is pressed only the corresponding menu (from "menus") is shown, the other two are hidden.
     */
    setOnClicks() {
        this.buttons[0].onclick = () => {
            this.menus[0].hidden = false;
            this.menus[1].hidden = true;
            this.menus[2].hidden = true;
        };
        this.buttons[1].onclick = () => {
            this.menus[0].hidden = true;
            this.menus[1].hidden = false;
            this.menus[2].hidden = true;
        };
        this.buttons[2].onclick = () => {
            this.menus[0].hidden = true;
            this.menus[1].hidden = true;
            this.menus[2].hidden = false;
        };
    }
    show() {
        this.mainMenu.hidden = false;
    }
    hide() {
        this.mainMenu.hidden = true;
    }
    getInputColor() {
        return this.sliders.getHexValue();
    }
    getActiveColor() {
        return this.savedColors.getActiveColor();
    }
    /**
     * Changes the active color and the inputs of the different menus to match the color.
     * @param color Should be formatted as hex ("#xxxxxx"), rgb ("rgb(x,x,x)") or rgba ("rgba(x,x,x)").
     */
    changeActiveColor(color) {
        const hex = anyColorToHex(color);
        this.savedColors.setActiveColor(hex);
        this.grid.setColor(hex);
        this.sliders.setColor(hex);
    }
}
