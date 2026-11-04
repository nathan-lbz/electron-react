// TODO 1 : une case à cocher qui appelle onToggle
// TODO 2 : un bouton "×" qui appelle onRemove
// Le texte d'une tâche terminée est barré (classe "done", déjà dans le CSS)
export default function TodoItem({ todo }) {
  return (
    <li>
      <span className={todo.done ? 'done' : ''}>{todo.text}</span>
    </li>
  );
}
