export class LibraryMenu {
    imagePicker;
    showMenuButton;
    menu;
    constructor(imagePicker) {
        this.imagePicker = imagePicker;
        this.showMenuButton = document.getElementById("chooseImageMenuLibraryMenuButton");
        this.menu = document.getElementById("chooseImageMenuLibrary");
        this.showMenuButton.onclick = () => {
            this.show();
        };
    }
    hide() {
        this.menu.hidden = true;
    }
    show() {
        this.imagePicker.hideSubMenus();
        this.menu.hidden = false;
    }
}
