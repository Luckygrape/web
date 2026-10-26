/**
 * Модуль 28: Работа с файлами (fs)
 *
 * Задание: Создайте JSON-хранилище данных.
 */

const fs = require('fs');
const path = require('path');

/**
 * createStore — создаёт хранилище с сохранением в JSON-файл
 *
 * @param {string} filepath - путь к JSON-файлу
 * @returns {Object} - объект с методами: getAll, getById, add, update, remove
 */
function createStore(filepath) {
  let data = [];

  function load() {
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf-8');
      data = JSON.parse(raw);
    } else {
      data = [];
    }
  }

  function save() {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  }

  function getNextId() {
    if (data.length === 0) return 1;
    return Math.max(...data.map(item => item.id)) + 1;
  }

  load();

  return {
    getAll() {
      return data;
    },

    getById(id) {
      return data.find(item => item.id === id) || null;
    },

    add(item) {
      const newItem = { id: getNextId(), ...item };
      data.push(newItem);
      save();
      return newItem;
    },

    update(id, changes) {
      const index = data.findIndex(item => item.id === id);
      if (index === -1) return null;
      data[index] = { ...data[index], ...changes };
      save();
      return data[index];
    },

    remove(id) {
      const index = data.findIndex(item => item.id === id);
      if (index === -1) return false;
      data.splice(index, 1);
      save();
      return true;
    }
  };
}

module.exports = { createStore };