/**
 * executeInOrder — выполняет три функции последовательно с задержками
 *
 * @param {Function} first - выполняется через 0 мс
 * @param {Function} second - выполняется через 100 мс
 * @param {Function} third - выполняется через 200 мс
 * @returns {Object} объект с методом cancel() для отмены таймеров
 */
function executeInOrder(first, second, third) {
  const timers = [];

  timers.push(setTimeout(first, 0));
  timers.push(setTimeout(second, 100));
  timers.push(setTimeout(third, 200));

  return {
    cancel() {
      timers.forEach(id => clearTimeout(id));
    }
  };
}

module.exports = { executeInOrder };
