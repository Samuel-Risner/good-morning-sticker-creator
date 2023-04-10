/**
 * Returns a new array without the specified element.
 * @param arr The array from which you want to remove the element.
 * @param element The element you want to remove.
 * @returns A new array not including the element.
 */
export function removeElementFromList<T>(arr: Array<T>, element: T): Array<T> {
    const found = arr.indexOf(element);

    if (found < 0) {
        return arr;
    }

    return arr.splice(found, 1);
}

/**
 * Returns the hex string for the rgb index WITHOUT the leading "#".
 * @param r The red value as a string.
 * @param g The green value as a string.
 * @param b The blue value as a string.
 * @returnsThe The hex string WITHOUT the leading "#".
 */
export function rgbToHex(r: string, g: string, b: string) {
    return (1 << 24 | Number(r) << 16 | Number(g) << 8 | Number(b)).toString(16).slice(1);
}

/**
 * Converts the passed color to hex. If the color is already in hex (starts with a "#") the color is returned unchanged. Otherwise the color is considered to be in rgb or rgba format and is converted to hex. If the rgb or rgba color is badly formatted "#000000" is returned.
 * @param color The color to convert.
 * @returns The color as hex.
 */
export function anyColorToHex(color: string) {
    // Color is already in hex format:
    if (color.startsWith("#")) {
        return color;
    }

    // Color is in rgb or rgba format.
    color = color.substring(4, color.length - 1);
    const parts = color.split(",");

    if (parts.length < 3) {
        return "#000000";
    }
    
    // remove spaces and stuff.
    for (let i = 0; i < 3; i++) {
        parts[i] = parts[i].trim();
    }

    return "#" + rgbToHex(parts[0], parts[1], parts[2]);
}
