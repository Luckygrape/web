/**
 * fetchSequential — последовательно выполняет массив async-функций
 *
 * @param {Function[]} tasks - массив функций, возвращающих Promise
 * @returns {Promise<Array>} Promise с массивом результатов
 */
async function fetchSequential(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

module.exports = { fetchSequential };