/**
 * asyncOperation — симулирует асинхронную операцию с error-first callback
 *
 * @param {boolean} shouldSucceed - true для успеха, false для ошибки
 * @param {Function} callback - функция callback(error, result)
 */
function asyncOperation(shouldSucceed, callback) {
   setTimeout(() => {
    if (shouldSucceed) {
      callback(null, 'Операция успешна');
    } else {
      callback(new Error('Операция не удалась'), null);
    }
  }, 100);
}

module.exports = { asyncOperation };
