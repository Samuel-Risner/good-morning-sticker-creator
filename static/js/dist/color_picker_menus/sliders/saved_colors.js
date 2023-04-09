import { removeElementFromList } from "./../../misc.js";
export class SavedColors {
    activeColorDisplay;
    savedColorsContainer;
    savedColors;
    deleteColorButton;
    addColorButton;
    confirmDeleteButton;
    inDeleteMode;
    colorsToDelete;
    constructor(activeColorDisplay) {
        this.activeColorDisplay = activeColorDisplay;
        this.savedColorsContainer = document.getElementById("color picker saved colors");
        this.savedColors = [];
        this.deleteColorButton = document.getElementById("color picker delete color");
        this.addColorButton = document.getElementById("color picker add color");
        this.confirmDeleteButton = document.getElementById("color picker confirm delete");
        this.inDeleteMode = false;
        this.colorsToDelete = [];
        this.addOnClicks();
    }
    blurElement(el) {
        el.className = el.className + " blur-md";
    }
    unBlurElement(el) {
        el.className = el.className.substring(0, el.className.length - " blur-xx".length);
    }
    addOnClicks() {
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
            }
            else {
                this.inDeleteMode = true;
                this.addColorButton.hidden = true;
                this.confirmDeleteButton.hidden = false;
            }
        };
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
        };
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
                    }
                    else {
                        this.colorsToDelete.push(el);
                        this.blurElement(el);
                    }
                    // If the delete mode is not active the active color is set to be the elements color.
                }
                else {
                    this.activeColorDisplay.style.backgroundColor = el.style.backgroundColor;
                }
            };
        };
    }
}
