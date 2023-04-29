export class InsertImage {
    imagePicker;
    libraryMenu;
    showMenuButton;
    menu;
    constructor(imagePicker, libraryMenu) {
        this.imagePicker = imagePicker;
        this.libraryMenu = libraryMenu;
        this.showMenuButton = document.getElementById("chooseImageMenuInsertImageButton");
        this.menu = document.getElementById("chooseImageMenuInsertImage");
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
