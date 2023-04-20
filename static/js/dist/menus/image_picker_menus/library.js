export class LibraryMenu {
    imagePicker;
    showMenuButton;
    menu;
    imageContainer;
    selectedImage;
    selectedContainer;
    uploadedImage;
    uploadedImageContainer;
    constructor(imagePicker) {
        this.imagePicker = imagePicker;
        this.showMenuButton = document.getElementById("chooseImageMenuLibraryMenuButton");
        this.menu = document.getElementById("chooseImageMenuLibrary");
        this.imageContainer = document.getElementById("chooseImageMenuLibraryImageOverview");
        this.selectedImage = null;
        this.selectedContainer = null;
        this.showMenuButton.onclick = () => {
            this.show();
        };
        this._initUploadedIMage();
        this._fill();
    }
    _initUploadedIMage() {
        this.uploadedImage = document.createElement("img");
        this.uploadedImageContainer = document.createElement("div");
        this.uploadedImageContainer.className = "p-2 rounded-md h-fit w-fit";
        this.uploadedImageContainer.onclick = () => {
            if (this.uploadedImageContainer !== null) {
                this.selectImage(this.uploadedImage, this.uploadedImageContainer);
            }
        };
        this.uploadedImageContainer.appendChild(this.uploadedImage);
        this.imageContainer.appendChild(this.uploadedImageContainer);
    }
    _fill() {
        fetch("/data/img_data.json").then(async (res) => {
            await res.json().then((_res) => {
                const imgPaths = _res;
                for (let i = 0; i < imgPaths.length; i++) {
                    const container = document.createElement("div");
                    const img = document.createElement("img");
                    container.appendChild(img);
                    container.className = "p-2 rounded-md h-fit w-fit";
                    img.src = `/images/${imgPaths[i]}`;
                    container.onclick = () => {
                        this.selectImage(img, container);
                    };
                    this.imageContainer.appendChild(container);
                }
            }).catch((_err) => {
                console.log(_err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    selectImage(img, container) {
        this.selectedImage = img;
        if (this.selectedContainer !== null) {
            this.selectedContainer.className = "p-2 rounded-md h-fit w-fit";
        }
        this.selectedContainer = container;
        if (container !== null) {
            container.className = "p-2 rounded-md h-fit w-fit bg-red-500";
        }
    }
    hide() {
        this.menu.hidden = true;
    }
    show() {
        this.imagePicker.hideSubMenus();
        this.menu.hidden = false;
    }
    addUploadedImage(url) {
        this.uploadedImage.src = url;
    }
}
