import { InsertImage } from "./image_picker_menus/insert_image.js";
import { LibraryMenu } from "./image_picker_menus/library.js";
import { UploadMenu } from "./image_picker_menus/upload.js";
export class ImagePicker {
    canvas;
    mainMenu;
    showMenuButton;
    closeMenuButton;
    libraryMenu;
    uploadMenu;
    insertImage;
    constructor(canvas) {
        this.canvas = canvas;
        this.mainMenu = document.getElementById("chooseImageMenu");
        this.showMenuButton = document.getElementById("chooseImage");
        this.closeMenuButton = document.getElementById("chooseImageMenuClose");
        this.showMenuButton.onclick = () => {
            this.show();
        };
        this.closeMenuButton.onclick = () => {
            this.hide();
        };
        this.libraryMenu = new LibraryMenu(this);
        this.uploadMenu = new UploadMenu(this, this.libraryMenu);
        this.insertImage = new InsertImage(this, this.libraryMenu);
    }
    show() {
        this.mainMenu.hidden = false;
        this.canvas.hide();
    }
    hide() {
        this.mainMenu.hidden = true;
        this.canvas.show();
    }
    hideSubMenus() {
        this.libraryMenu.hide();
        this.uploadMenu.hide();
        this.insertImage.hide();
    }
}
