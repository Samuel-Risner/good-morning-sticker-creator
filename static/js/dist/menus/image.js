export class Image {
    mainMenu;
    showMenuButton;
    constructor() {
        this.mainMenu = document.getElementById("chooseImageMenu");
        this.showMenuButton = document.getElementById("chooseImage");
        this.showMenuButton.onclick = () => {
            console.log("foo");
            this.show();
        };
    }
    show() {
        this.mainMenu.hidden = false;
    }
    hide() {
        this.mainMenu.hidden = true;
    }
}
