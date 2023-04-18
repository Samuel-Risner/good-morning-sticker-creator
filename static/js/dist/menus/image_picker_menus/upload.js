export class UploadMenu {
    imagePicker;
    showMenuButton;
    menu;
    dragElement;
    imagePreview;
    constructor(imagePicker) {
        this.imagePicker = imagePicker;
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
        this.imagePreview = document.getElementById("fileUploadImagePreview");
    }
    hide() {
        this.menu.hidden = true;
    }
    show() {
        this.imagePicker.hideSubMenus();
        this.menu.hidden = false;
    }
    onDrop(ev) {
        console.log("Files dropped!");
        ev.preventDefault();
        // See: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
        const dataTransfer = ev.dataTransfer;
        if (dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    console.log(`file[${i}].name = ${file.name}`);
                    console.log(file);
                    this.imagePreview.src = URL.createObjectURL(file);
                }
            });
        }
        else {
            // Use DataTransfer interface to access the file(s)
            [...dataTransfer.files].forEach((file, i) => {
                console.log(`file[${i}].name = ${file.name}`);
            });
        }
    }
    onDragOver(ev) {
        // Prevent default behavior (Prevent file from being opened).
        ev.preventDefault();
    }
}
