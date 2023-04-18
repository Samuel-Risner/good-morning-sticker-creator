import { InsertImage } from "./image_picker_menus/insert_image.js";
import { LibraryMenu } from "./image_picker_menus/library.js";
import { UploadMenu } from "./image_picker_menus/upload.js";
export class ImagePicker {
    canvas;
    mainMenu;
    showMenuButton;
    uploadMenu;
    libraryMenu;
    insertImage;
    constructor(canvas) {
        this.canvas = canvas;
        this.mainMenu = document.getElementById("chooseImageMenu");
        this.showMenuButton = document.getElementById("chooseImage");
        this.showMenuButton.onclick = () => {
            this.show();
            this.getAvailableImages();
        };
        this.uploadMenu = new UploadMenu(this);
        this.libraryMenu = new LibraryMenu(this);
        this.insertImage = new InsertImage(this);
    }
    async getAvailableImages() {
        await fetch("/data/img_data.json").then(async (res) => {
            await res.json().then((_res) => {
                console.log(_res);
            }).catch((_err) => {
                console.log(_err);
            });
        }).catch((err) => {
            console.log(err);
        });
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
