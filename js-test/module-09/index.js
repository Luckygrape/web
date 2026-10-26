/**
 * createMultiplier — создаёт функцию-множитель (замыкание)
 *
 * @param {number} factor - на что умножать
 * @returns {Function} функция, которая принимает число и умножает его на factor
 *
 * Примеры:
 * const double = createMultiplier(2);
 * double(5) → 10
 * const triple = createMultiplier(3);
 * triple(4) → 12
 */
function createMultiplier(factor) {
     return function(num) {
    return num * factor;
  };
}

/**
 * mergeObjects — объединяет два объекта с помощью spread оператора
 *
 * 
 * @param {Object} obj1 - первый объект
 * @param {Object} obj2 - второй объект (его свойства приоритетнее)
 * @returns {Object} новый объект с объединёнными свойствами
 */

function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}


function createCounter(initial = 0) {
    const start = initial;

  return {
    value: initial,

    increment() {
      this.value += 1;
      return this.value;
    },

    decrement() {
      this.value -= 1;
      return this.value;
    },

    reset() {
      this.value = start;
      return this.value;
    }
  };
}

module.exports = { createMultiplier, mergeObjects, createCounter };
