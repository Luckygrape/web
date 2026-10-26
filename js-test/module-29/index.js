/**
 * Модуль 29: Express — фреймворк для сервера
 *
 * Задание: Перепишите TODO API на Express.
 *
 * Установка: npm install express
 */

const express = require('express');

/**
 * createApp — создаёт Express-приложение с TODO API
 *
 * Middleware:
 * - express.json()
 * - CORS-заголовки
 *
 * Эндпоинты:
 * - GET    /api/todos      — список
 * - GET    /api/todos/:id  — по id
 * - POST   /api/todos      — создать { title } → 201
 * - PATCH  /api/todos/:id  — toggle completed
 * - DELETE /api/todos/:id  — удалить → 204
 *
 * @returns {express.Application}
 */
function createApp() {
  const app = express();
  const todos = [];
  let nextId = 1;

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.get('/api/todos', (req, res) => {
    res.json(todos);
  });

  app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  });

  app.post('/api/todos', (req, res) => {
    const { title } = req.body;

    const newTodo = {
      id: nextId++,
      title,
      completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
  });

  app.patch('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    res.json(todo);
  });

  app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todos.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createApp };