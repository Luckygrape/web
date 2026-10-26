/**
 * Модуль 27: TODO-приложение — Backend
 *
 * Задание: Создайте сервер с TODO API.
 */

const http = require('http');

/**
 * getBody — читает JSON из запроса
 */
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * createServer — создаёт HTTP-сервер с TODO API
 *
 * Эндпоинты:
 * - GET    /api/todos     — список задач
 * - POST   /api/todos     — создать { title } → 201
 * - PATCH  /api/todos/:id — переключить completed → 200
 * - DELETE /api/todos/:id — удалить → 204
 * - OPTIONS *             — preflight → 204
 * - Остальное             → 404
 *
 * Все ответы с CORS-заголовками.
 *
 * @returns {http.Server}
 */
function createServer() {
  const todos = [];
  let nextId = 1;

  return http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, 'http://localhost');
    const pathname = url.pathname;

    if (req.method === 'GET' && pathname === '/api/todos') {
      res.end(JSON.stringify(todos));
      return;
    }

    if (req.method === 'POST' && pathname === '/api/todos') {
      const body = await getBody(req);

      if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Title is required and cannot be empty' }));
        return;
      }

      const newTodo = {
        id: nextId++,
        title: body.title.trim(),
        completed: false
      };

      todos.push(newTodo);
      res.statusCode = 201;
      res.end(JSON.stringify(newTodo));
      return;
    }

    if (req.method === 'PATCH' && pathname.startsWith('/api/todos/')) {
      const id = parseInt(pathname.split('/').pop(), 10);

      if (isNaN(id)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid todo ID' }));
        return;
      }

      const todo = todos.find(t => t.id === id);

      if (!todo) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Todo not found' }));
        return;
      }

      todo.completed = !todo.completed;
      res.end(JSON.stringify(todo));
      return;
    }

    if (req.method === 'DELETE' && pathname.startsWith('/api/todos/')) {
      const id = parseInt(pathname.split('/').pop(), 10);

      if (isNaN(id)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid todo ID' }));
        return;
      }

      const index = todos.findIndex(t => t.id === id);

      if (index === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Todo not found' }));
        return;
      }

      todos.splice(index, 1);
      res.statusCode = 204;
      res.end();
      return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  });
}

module.exports = { createServer, getBody };
