import { Sliders } from "./color_picker_menus/sliders.js";
import { SavedColors } from "./color_picker_menus/saved_colors.js";

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
 * ## How the menus function:
 *  Whenever you select a color in one of the menus it is automatically used for the active color and also applied in the other two menus. Meaning that all thee menus always display the same color.
 * 
 */
export class ColorPicker {

    private mainMenu: HTMLDivElement;

    private buttons: [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement];
    private menus: [HTMLDivElement, HTMLDivElement, HTMLDivElement];

    private sliders: Sliders;
    private savedColors: SavedColors;

    constructor() {
        this.mainMenu = document.getElementById("color picker") as HTMLDivElement;
        
        this.buttons = [
            document.getElementById("color picker grid button") as HTMLButtonElement,
            document.getElementById("color picker spectrum button") as HTMLButtonElement,
            document.getElementById("color picker sliders button") as HTMLButtonElement,
        ]

        this.menus = [
            document.getElementById("color sliders") as HTMLDivElement,
            document.getElementById("") as HTMLDivElement,
            document.getElementById("") as HTMLDivElement,
        ]

        this.sliders = new Sliders(this);
        this.savedColors = new SavedColors(this);

        this.setOnClicks();
    }

    /**
     * When one of the buttons ("buttons") is pressed only the corresponding menu (from "menus") is shown, the other two are hidden.
     */
    private setOnClicks() {
        this.buttons[0].onclick = () => {
            this.menus[0].hidden = false;
            this.menus[1].hidden = true;
            this.menus[2].hidden = true;
        }

        this.buttons[1].onclick = () => {
            this.menus[0].hidden = true;
            this.menus[1].hidden = false;
            this.menus[2].hidden = true;
        }

        this.buttons[2].onclick = () => {
            this.menus[0].hidden = true;
            this.menus[1].hidden = true;
            this.menus[2].hidden = false;
        }
    }

    show() {
        this.mainMenu.hidden = false;
    }

    hide() {
        this.mainMenu.hidden = true;
    }

    getInputColor(): string {
        return this.sliders.getHexValue();
    }

    getActiveColor(): string {
        return this.savedColors.getActiveColor();
    }

    changeActiveColor(color: string) {
        this.savedColors.setActiveColor(color);

        this.sliders.setColor(color);
    }
}
