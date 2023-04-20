import { flash } from "./../../misc.js";
export class UploadMenu {
    imagePicker;
    libraryMenu;
    showMenuButton;
    menu;
    dragElement;
    fileInput;
    constructor(imagePicker, libraryMenu) {
        this.imagePicker = imagePicker;
        this.libraryMenu = libraryMenu;
        this.showMenuButton = document.getElementById("chooseImageMenuUploadMenuButton");
        this.menu = document.getElementById("chooseImageMenuUploadMenu");
        this.showMenuButton.onclick = () => {
            this.show();
        };
        this.dragElement = document.getElementById("dragBackgroundImageUpload");
        this.dragElement.ondrop = (ev) => {
            this.onDrop(ev);
        };
        this.dragElement.ondragover = (ev) => {
            this.onDragOver(ev);
        };
        this.fileInput = document.getElementById("uploadedBackgroundImage");
        this.fileInput.oninput = () => {
            const fileList = this.fileInput.files;
            flash(`Successfully uploaded the file with the name "${fileList[0].name}"`, "");
            this.libraryMenu.addUploadedImage(URL.createObjectURL(fileList[0]));
        };
    }
    hide() {
        this.menu.hidden = true;
    }
    show() {
        this.imagePicker.hideSubMenus();
        this.menu.hidden = false;
    }
    onDrop(ev) {
        ev.preventDefault();
        // See: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
        const dataTransfer = ev.dataTransfer;
        if (dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    // console.log(`file[${i}].name = ${file.name}`);
                    // console.log(file);
                    flash(`Successfully uploaded the file with the name "${file.name}"`, "");
                    this.libraryMenu.addUploadedImage(URL.createObjectURL(file));
                }
            });
        }
        else {
            // Use DataTransfer interface to access the file(s)
            [...dataTransfer.files].forEach((file, i) => {
                // console.log(`file[${i}].name = ${file.name}`);
                flash(`Successfully uploaded the file with the name "${file.name}"`, "");
                this.libraryMenu.addUploadedImage(URL.createObjectURL(file));
            });
        }
    }
    onDragOver(ev) {
        // Prevent default behavior (Prevent file from being opened).
        ev.preventDefault();
    }
}
