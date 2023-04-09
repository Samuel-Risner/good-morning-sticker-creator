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
