/**
 * Returns a new array without the specified element.
 * @param arr The array from which you want to remove the element.
 * @param element The element which you want to remove.
 * @returns A new array not including the element.
 */
export function removeElementFromList(arr, element) {
    const found = arr.indexOf(element);
    if (found < 0) {
        return arr;
    }
    return arr.splice(found, 1);
}
/**
 * Returns the hex string ("#xxxxxx") for the rgb input.
 * @param r The red value as a string or number.
 * @param g The green value as a string or number.
 * @param b The blue value as a string or number.
 * @returnsThe The hex string.
 */
export function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | Number(r) << 16 | Number(g) << 8 | Number(b)).toString(16).slice(1);
}
/**
 * Converts the passed color to hex. If the color is already in hex (starts with a "#") the color is returned unchanged. Otherwise the color is considered to be in rgb or rgba format if it starts with "rgb(" or "rgba(" and is converted to hex. If the rgb or rgba color is badly formatted or the passed color does not match any of the mentioned conditions "#000000" is returned.
 * @param color The color to convert.
 * @returns The color as hex or "#000000" if an error occurred or the same color if the passed color was already in hex.
 */
export function anyColorToHex(color) {
    // Color is already in hex format:
    if (color.startsWith("#")) {
        return color;
    }
    // Color is in rgb format:
    if (color.startsWith("rgb(")) {
        color = color.substring(4, color.length - 1); // Remove the starting and ending "()".
        // Color is in rgba format:
    }
    else if (color.startsWith("rgba(")) {
        color = color.substring(5, color.length - 1); // Remove the starting and ending "()".
        // Color is badly formatted:
    }
    else {
        return "#000000";
    }
    // Color is in rgb or rgba format.
    const parts = color.split(",");
    if (parts.length < 3) {
        return "#000000";
    }
    // Remove spaces and stuff:
    for (let i = 0; i < 3; i++) {
        parts[i] = parts[i].trim();
    }
    return rgbToHex(parts[0], parts[1], parts[2]);
}
export function flash(msg, category) {
    const container = document.getElementById("flashedMessages");
    const div = document.createElement("div");
    if (category === "error") {
        div.className = "flex flex-row bg-red-500 rounded-xl px-2 w-fit m-1 ml-auto";
    }
    else if (category === "success") {
        div.className = "flex flex-row bg-green-500 rounded-xl px-2 w-fit m-1 ml-auto";
    }
    else {
        div.className = "flex flex-row bg-blue-500 rounded-xl px-2 w-fit m-1 ml-auto";
    }
    const button = document.createElement("button");
    button.textContent = "X";
    button.onclick = () => {
        div.remove();
    };
    button.className = "text-white pr-2";
    const textDiv = document.createElement("div");
    textDiv.textContent = msg;
    div.appendChild(button);
    div.appendChild(textDiv);
    container.appendChild(div);
}
