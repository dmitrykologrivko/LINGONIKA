/**
 * This function push new element to the provided array.
 * @param arr original array
 * @param element new element
 * @returns {*[]} original array with pushed element
 */
export function push(arr = [], element) {
  arr.push(element);
  return arr;
}

/**
 * This function updates element in array if element exists with provided id.
 * @param arr original array
 * @param element element to update
 * @returns {*[]} original array with updated element
 */
export function updateById(arr = [], element) {
  if (!element || !element.id) throw new Error('Element for the update should be set and has ID');

  const index = arr.findIndex(arrElement => arrElement.id && arrElement.id === element.id);

  if (index === -1) throw new Error('Element did not found by ID');

  arr[index] = element;

  return arr;
}

/**
 * This is function removes element from array by provided id.
 * @param arr original array
 * @param id element id
 * @returns {*[]} array with removed element
 */
export function removeById(arr = [], id) {
  return arr.filter(arrElement => arrElement.id && arrElement.id !== id);
}
