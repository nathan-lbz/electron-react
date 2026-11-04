// Seul fichier qui parle à window.api.
import { useCallback, useEffect, useState } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setTodos(await window.api.listTodos());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function run(call) {
    setError('');
    try {
      const result = await call();
      await refresh();
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  return {
    todos,
    error,
    add: (text) => run(() => window.api.addTodo(text)),
    // TODO : toggle(id), remove(id)
  };
}
