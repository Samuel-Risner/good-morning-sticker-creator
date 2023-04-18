import { ImagePicker } from "./../image_picker.js";

export class LibraryMenu {
    
    private showMenuButton: HTMLButtonElement;
    private menu: HTMLDivElement;

    constructor(
        private imagePicker: ImagePicker
    ) {
        this.showMenuButton = document.getElementById("chooseImageMenuLibraryMenuButton") as HTMLButtonElement;
        this.menu = document.getElementById("chooseImageMenuLibrary") as HTMLDivElement;

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
