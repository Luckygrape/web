/**
 * Модуль 5: Функции (declaration, expression, arrow)
 *
 * Задание: Создайте три функции разными способами:
 * - double (Function Declaration) — удваивает число
 * - triple (Function Expression) — утраивает число
 * - square (Arrow Function) — возводит в квадрат
 */

// Function Declaration — double
function double(n) {
     n = n*2
    return n
}

// Function Expression — triple
const triple = function(n) {
    n = n*3
    return n
};

// Arrow Function — square
const square = (n) => {
     n = n*n
    return n
};

module.exports = { double, triple, square };
