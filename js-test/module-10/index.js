/**
 * getUnique — возвращает массив уникальных элементов
 *
 * @param {Array} arr - исходный массив
 * @returns {Array} массив без дубликатов
 */
function getUnique(arr) {
    return [...new Set(arr)];
}

/**
 * countItems — подсчитывает количество каждого элемента
 *
 * @param {Array} arr - исходный массив
 * @returns {Map} Map, где ключ — элемент, значение — количество
 */
function countItems(arr) {
    const counts = new Map();

  for (const item of arr) {
    const current = counts.get(item) || 0;
    counts.set(item, current + 1);
  }

  return counts;
}

module.exports = { getUnique, countItems };