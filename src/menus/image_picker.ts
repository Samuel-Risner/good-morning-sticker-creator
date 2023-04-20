import { Canvas } from "../canvas.js";
import { InsertImage } from "./image_picker_menus/insert_image.js";
import { LibraryMenu } from "./image_picker_menus/library.js";
import { UploadMenu } from "./image_picker_menus/upload.js";

export class ImagePicker {

    private mainMenu:HTMLDivElement;
    private showMenuButton: HTMLButtonElement;
    private closeMenuButton: HTMLButtonElement;

    private libraryMenu: LibraryMenu;
    private uploadMenu: UploadMenu;
    private insertImage: InsertImage;

    constructor(
        private canvas: Canvas
    ) {
        this.mainMenu = document.getElementById("chooseImageMenu") as HTMLDivElement;
        this.showMenuButton = document.getElementById("chooseImage") as HTMLButtonElement;
        this.closeMenuButton = document.getElementById("chooseImageMenuClose") as HTMLButtonElement;

        this.showMenuButton.onclick = () => {
            this.show();
        }

        this.closeMenuButton.onclick = () => {
            this.hide();
        }

        this.libraryMenu = new LibraryMenu(this);
        this.uploadMenu = new UploadMenu(this, this.libraryMenu);
        this.insertImage = new InsertImage(this);
    }

    show() {
        this.mainMenu.hidden = false;
        this.canvas.hide();
    }

    hide() {
        this.mainMenu.hidden = true;
    }

    hideSubMenus() {
        this.libraryMenu.hide();
        this.uploadMenu.hide();
        this.insertImage.hide();
    }
}
