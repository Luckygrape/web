/**
 * Модуль 30: Введение в React
 *
 * Задание: Создайте три компонента: Greeting, Counter, TodoList.
 */

import { useState } from 'react';

/**
 * Greeting — компонент приветствия
 *
 * @param {Object} props
 * @param {string} props.name - имя (если пустое — "мир")
 * @returns {JSX.Element} - <h1>Привет, {name}!</h1>
 */
export function Greeting({ name }) {
  return <h1>Привет, {name || 'мир'}!</h1>;
}

/**
 * Counter — компонент счётчика
 *
 * @param {Object} props
 * @param {number} props.initial - начальное значение (по умолчанию 0)
 * @returns {JSX.Element}
 *
 * Элементы:
 * - <span data-testid="count"> — текущее значение
 * - <button data-testid="increment"> — +1
 * - <button data-testid="decrement"> — -1
 * - <button data-testid="reset"> — сброс к initial
 */
export function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button data-testid="increment" onClick={() => setCount(count + 1)}>+</button>
      <button data-testid="decrement" onClick={() => setCount(count - 1)}>-</button>
      <button data-testid="reset" onClick={() => setCount(initial)}>Reset</button>
    </div>
  );
}

/**
 * TodoList — компонент списка задач
 *
 * @param {Object} props
 * @param {string[]} props.items - массив строк-задач
 * @returns {JSX.Element}
 *
 * Если items пустой → <p>Нет задач</p>
 * Иначе → <ul> с <li> для каждого элемента
 */
export function TodoList({ items }) {
  if (!items || items.length === 0) {
    return <p>Нет задач</p>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
