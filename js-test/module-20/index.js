/**
 * Модуль 20: Формы и валидация
 *
 * Задание: Напишите функции для сбора и валидации данных формы.
 */

/**
 * getFormData — собирает данные из формы в объект
 *
 * @param {string} selector - CSS-селектор формы
 * @returns {Object|null} - объект с данными или null если форма не найдена
 */
function getFormData(selector) {
  const form = document.querySelector(selector);
  if (!form) {
    return null;
  }
  return Object.fromEntries(new FormData(form));
}

/**
 * validateForm — валидирует данные формы
 *
 * @param {Object} data - объект с полями username, email, password
 * @returns {Object} - { isValid: boolean, errors: object }
 */
function validateForm(data) {
  const errors = {};
  if (data.username.length < 3) {
    errors.username = 'Минимум 3 символа';
  }
  if (!data.email.includes('@') || !data.email.includes('.')) {
    errors.email = 'Некорректный email';
  }
  if (data.password.length < 8) {
    errors.password = 'Минимум 8 символов';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Экспорт для Node.js (тесты) и браузера
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getFormData, validateForm };
}
if (typeof window !== 'undefined') {
  window.getFormData = getFormData;
  window.validateForm = validateForm;
}