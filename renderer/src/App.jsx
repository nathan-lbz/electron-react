import { useTodos } from './useTodos.js';
import AddForm from './components/AddForm.jsx';
import TodoItem from './components/TodoItem.jsx';

export default function App() {
  const { todos, error, add } = useTodos();

  // TODO 3 : filtre "Toutes / À faire / Terminées" (un useState + des boutons)
  // TODO 4 : compteur "n tâches restantes"

  return (
    <div className="app">
      <header>
        <h1>Todo</h1>
        <span className="badge">{window.api.isMock ? 'mock' : 'electron'}</span>
      </header>

      <AddForm onAdd={add} />
      {error && <p className="error">{error}</p>}

      <ul className="list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {todos.length === 0 && <p className="empty">Aucune tâche</p>}
    </div>
  );
}
