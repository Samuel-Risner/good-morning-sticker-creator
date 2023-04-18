import { ImagePicker } from "./../image_picker.js";

export class UploadMenu {
    
    private showMenuButton: HTMLButtonElement;
    private menu: HTMLDivElement;

    private dragElement: HTMLDivElement;
    private imagePreview: HTMLImageElement;

    constructor(
        private imagePicker: ImagePicker
    ) {
        this.showMenuButton = document.getElementById("chooseImageMenuUploadMenuButton") as HTMLButtonElement;
        this.menu = document.getElementById("chooseImageMenuUploadMenu") as HTMLDivElement;

        this.showMenuButton.onclick = () => {
            this.show();
        }

        this.dragElement = document.getElementById("dragBackgroundImageUpload") as HTMLDivElement;

        this.dragElement.ondrop = (ev: DragEvent) => {
            this.onDrop(ev);
        }
        this.dragElement.ondragover = (ev: DragEvent) => {
            this.onDragOver(ev);
        }

        this.imagePreview = document.getElementById("fileUploadImagePreview") as HTMLImageElement;
    }

    hide() {
        this.menu.hidden = true;
    }

    show() {
        this.imagePicker.hideSubMenus();
        this.menu.hidden = false;
    }

    private onDrop(ev: DragEvent) {
        console.log("Files dropped!");

        ev.preventDefault();

        // See: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop

        const dataTransfer = ev.dataTransfer as DataTransfer;

        if (dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...dataTransfer.items].forEach((item, i) => {
              // If dropped items aren't files, reject them
              if (item.kind === "file") {
                const file = item.getAsFile() as File;
                console.log(`file[${i}].name = ${file.name}`);
                console.log(file);
                this.imagePreview.src = URL.createObjectURL(file);
              }
            });
          } else {
            // Use DataTransfer interface to access the file(s)
            [...dataTransfer.files].forEach((file, i) => {
              console.log(`file[${i}].name = ${file.name}`);
            });
          }
    }

    private onDragOver(ev: DragEvent) {
        // Prevent default behavior (Prevent file from being opened).
        ev.preventDefault();
      }
      

}
