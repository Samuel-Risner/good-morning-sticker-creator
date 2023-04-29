import { ImagePicker } from "./../image_picker.js";
import { LibraryMenu } from "./library.js";

export class InsertImage {
    
    private showMenuButton: HTMLButtonElement;
    private menu: HTMLDivElement;

    constructor(
        private imagePicker: ImagePicker,
        private libraryMenu: LibraryMenu
    ) {
        this.showMenuButton = document.getElementById("chooseImageMenuInsertImageButton") as HTMLButtonElement;
        this.menu = document.getElementById("chooseImageMenuInsertImage") as HTMLDivElement;

        this.showMenuButton.onclick = () => {
            this.show();
        }
    }

    hide() {
        this.menu.hidden = true;
    }

    show() {
        this.imagePicker.hideSubMenus();
        this.menu.hidden = false;
    }

}
