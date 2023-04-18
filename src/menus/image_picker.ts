export class ImagePicker {

    private mainMenu:HTMLDivElement;
    private showMenuButton: HTMLButtonElement;

    constructor() {
        this.mainMenu = document.getElementById("chooseImageMenu") as HTMLDivElement;
        this.showMenuButton = document.getElementById("chooseImage") as HTMLButtonElement;

        this.showMenuButton.onclick = () => {
            this.show();
            this.getAvailableImages();
        }
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
    }

    hide() {
        this.mainMenu.hidden = true;
    }
}
