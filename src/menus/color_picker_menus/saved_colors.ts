import { removeElementFromList } from "./../../misc.js";
import { Sliders } from "./sliders.js";
import { ColorPicker } from "./../color_picker.js";

/**
 * Handles the menu for selecting colors.
 */
export class SavedColors {

    /**
     * The element in which the saved colors are stored.
     */
    private savedColorsContainer: HTMLDivElement;
    /**
     * All the html elements of the saved colors.
     */
    private savedColors: HTMLDivElement[];

    /**
     * Button used to delete saved colors.
     */
    private deleteColorButton: HTMLButtonElement;
    /**
     * Button used to add a new color to the saved colors. The new color is the currently active color.
     */
    private addColorButton: HTMLButtonElement;
    /**
     * Button used to confirm the deletion of selected colors.
     */
    private confirmDeleteButton: HTMLButtonElement;

    /**
     * If the delete-mode is currently active. In delete-mode the "confirmDeleteButton" is visible but the "addColorButton" is not.
     */
    private inDeleteMode: boolean;
    /**
     * The colors which are selected to be deleted.
     */
    private colorsToDelete: HTMLDivElement[];

    /**
     * The html element which displays the currently active color.
     */
    private activeColorDisplay: HTMLDivElement

    constructor(
        private colorPicker: ColorPicker
    ) {
        this.savedColorsContainer = document.getElementById("color picker saved colors") as HTMLDivElement;
        this.savedColors = [];

        this.deleteColorButton = document.getElementById("color picker delete color") as HTMLButtonElement;
        this.addColorButton = document.getElementById("color picker add color") as HTMLButtonElement;
        this.confirmDeleteButton = document.getElementById("color picker confirm delete") as HTMLButtonElement;

        this.inDeleteMode = false;
        this.colorsToDelete = [];

        this.activeColorDisplay = document.getElementById("color picker active color") as HTMLDivElement;

        this.addOnClicks();
    }

    private blurElement(el: HTMLElement) {
        el.className = el.className + " blur-md";
    }

    private unBlurElement(el: HTMLElement) {
        el.className = el.className.substring(0, el.className.length - " blur-xx".length);
    }

    /**
     * Adds the onclick-events to the three buttons, saved colors and the display for the currently active color.
     */
    private addOnClicks() {
        // When the delete button is pressed:
        this.deleteColorButton.onclick = () => {
            // When the delete mode is already active the deletion is canceled.
            if (this.inDeleteMode) {
                this.inDeleteMode = false;
                for (const el of this.colorsToDelete) {
                    this.unBlurElement(el);
                }
                this.colorsToDelete = [];
                this.confirmDeleteButton.hidden = true;
                this.addColorButton.hidden = false;
            // If the delete mode is not jet active it is activated.
            } else {
                this.inDeleteMode = true;
                this.addColorButton.hidden = true;
                this.confirmDeleteButton.hidden = false;
            }
        }

        // When the confirm deletion button is pressed:
        this.confirmDeleteButton.onclick = () => {
            // All the selected elements are deleted.
            for (const el of this.colorsToDelete) {
                el.remove();
                this.savedColors = removeElementFromList(this.savedColors, el);
            }
            // And the progress is reset.
            this.inDeleteMode = false;
            this.confirmDeleteButton.hidden = true;
            this.addColorButton.hidden = false;
            this.colorsToDelete = [];
        }

        // When the add color button is pressed:
        this.addColorButton.onclick = () => {
            // Create a new element for the color.
            const el = document.createElement("div");
            el.className = "w-8 h-8 rounded-full";
            el.style.backgroundColor = this.activeColorDisplay.style.backgroundColor;
            this.savedColorsContainer.appendChild(el);
            this.savedColors.push(el);

            // What happens when the color is clicked:
            el.onclick = () => {
                // If the delete mode is active:
                if (this.inDeleteMode) {
                    // If the color is already supposed to be removed cancel the removal for that color.
                    if (this.colorsToDelete.includes(el)) {
                        this.colorsToDelete = removeElementFromList(this.colorsToDelete, el);
                        this.unBlurElement(el);
                    // Otherwise add the color to be removed.
                    } else {
                        this.colorsToDelete.push(el);
                        this.blurElement(el);
                    }
                // If the delete mode is not active the active color is set to be the elements color.
                } else {
                    this.activeColorDisplay.style.backgroundColor = el.style.backgroundColor;
                }
            }
        }

        // When the display for the currently active color is pressed the selected color (from the inputs) is used for the new active color.
        this.activeColorDisplay.onclick = () => {
            this.activeColorDisplay.style.backgroundColor = this.colorPicker.getInputColor();
        }
    }

    getActiveColor(): string {
        return this.activeColorDisplay.style.backgroundColor;
    }

    /**
     * Sets the selected color display to match the passed color.
     * @param color The color formatted as hex ("#xxxxxx") or rgb ("rgb(x,x,x)").
     */
    setActiveColor(color: string) {
        this.activeColorDisplay.style.backgroundColor = color;
    }

}
