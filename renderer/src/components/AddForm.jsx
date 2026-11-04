import { useState } from 'react';

export default function AddForm({ onAdd }) {
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const added = await onAdd(text);
    if (added) setText(''); // on ne vide le champ que si l'ajout a réussi
  }

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nouvelle tâche…" />
      <button type="submit">Ajouter</button>
    </form>
  );
}
