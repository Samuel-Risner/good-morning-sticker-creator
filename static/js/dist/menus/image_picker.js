export class ImagePicker {
    mainMenu;
    showMenuButton;
    constructor() {
        this.mainMenu = document.getElementById("chooseImageMenu");
        this.showMenuButton = document.getElementById("chooseImage");
        this.showMenuButton.onclick = () => {
            this.show();
            this.getAvailableImages();
        };
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
    }
    hide() {
        this.mainMenu.hidden = true;
    }
}
