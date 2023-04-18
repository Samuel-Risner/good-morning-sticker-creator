import { Canvas } from "./canvas.js";
import { BgColor } from "./menus/bg_color.js";
import { ColorPicker } from "./menus/color_picker.js";


const canvas = new Canvas();

const colorPicker = new ColorPicker();
const bgColor = new BgColor(colorPicker, canvas);

window.onresize = () => {
    onWindowResize();
}

onWindowResize();
    
function onWindowResize() {
    canvas.adaptCanvasDisplaySize(window.innerWidth, window.innerHeight);
}
