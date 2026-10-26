/**
 * Модуль 31: React + Fetch
 *
 * Задание: Создайте компоненты, которые работают с API.
 */

import { useState, useEffect } from 'react';

/**
 * PostList — загружает и отображает список постов
 *
 * @param {Object} props
 * @param {string} props.url - базовый URL API
 *
 * Состояния:
 * - Загрузка: <p data-testid="loading">Загрузка...</p>
 * - Ошибка:   <p data-testid="error">Ошибка: {message}</p>
 * - Данные:   <ul data-testid="posts"><li>{title}</li>...</ul>
 */
export function PostList({ url }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${url}/api/posts`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [url]);

  if (loading) {
    return <p data-testid="loading">Загрузка...</p>;
  }

  if (error) {
    return <p data-testid="error">Ошибка: {error}</p>;
  }

  return (
    <ul data-testid="posts">
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}


/**
 * AddPostForm — форма для создания поста
 *
 * @param {Object} props
 * @param {string} props.url - базовый URL API
 * @param {Function} props.onAdd - колбэк после создания поста
 *
 * При сабмите:
 * - POST {url}/api/posts с body { title }
 * - Вызвать onAdd(newPost)
 * - Очистить input
 */
export function AddPostForm({ url, onAdd }) {
  const [title, setTitle] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${url}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    const newPost = await res.json();
    onAdd(newPost);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок поста"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
