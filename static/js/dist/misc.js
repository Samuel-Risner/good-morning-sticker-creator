/**
 * Returns a new array without the specified element.
 * @param arr The array from which you want to remove the element.
 * @param element The element you want to remove.
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
 * @param r The red value as a string.
 * @param g The green value as a string.
 * @param b The blue value as a string.
 * @returnsThe The hex string.
 */
export function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | Number(r) << 16 | Number(g) << 8 | Number(b)).toString(16).slice(1);
}
/**
 * Converts the passed color to hex. If the color is already in hex (starts with a "#") the color is returned unchanged. Otherwise the color is considered to be in rgb or rgba format if it starts with "rgb(" or "rgba(" and is converted to hex. If the rgb or rgba color is badly formatted or the passed color does not match any of the mentioned conditions "#000000" is returned.
 * @param color The color to convert.
 * @returns The color as hex or "#000000" if an error occurred.
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
    // remove spaces and stuff.
    for (let i = 0; i < 3; i++) {
        parts[i] = parts[i].trim();
    }
    return rgbToHex(parts[0], parts[1], parts[2]);
}
