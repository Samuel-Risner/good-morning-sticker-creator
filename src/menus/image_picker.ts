import { Canvas } from "../canvas.js";
import { InsertImage } from "./image_picker_menus/insert_image.js";
import { LibraryMenu } from "./image_picker_menus/library.js";
import { UploadMenu } from "./image_picker_menus/upload.js";

export class ImagePicker {

    private mainMenu:HTMLDivElement;
    private showMenuButton: HTMLButtonElement;

    private uploadMenu: UploadMenu;
    private libraryMenu: LibraryMenu;
    private insertImage: InsertImage;

    constructor(
        private canvas: Canvas
    ) {
        this.mainMenu = document.getElementById("chooseImageMenu") as HTMLDivElement;
        this.showMenuButton = document.getElementById("chooseImage") as HTMLButtonElement;

        this.showMenuButton.onclick = () => {
            this.show();
            this.getAvailableImages();
        }

        this.uploadMenu = new UploadMenu(this);
        this.libraryMenu = new LibraryMenu(this);
        this.insertImage = new InsertImage(this);
    }

    private async getAvailableImages() {
        await fetch("/data/img_data.json").then(
            async (res) => {
                await res.json().then(
                    (_res) => {
                        console.log(_res);
                    }
                ).catch(
                    (_err) => {
                        console.log(_err);
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
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
