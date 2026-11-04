# Todo — Electron + React

Petit projet d'entraînement. L'affichage et l'ajout fonctionnent : à toi de faire le reste.

## Lancer (StackBlitz)

```bash
npm install
npm run dev:web     # l'app, tâches enregistrées dans data/todos.json
npm run test:main   # tests du service
```

Après une modification dans `main/`, redémarre Vite (Ctrl+C, puis `npm run dev:web`).

## Exercices (les `TODO` dans le code)

1. **Cocher une tâche** : `toggle(id)` dans le service + test, puis les 4 lignes du circuit
   (handlers, preload, mock, hook), puis la case à cocher dans `TodoItem`.
2. **Supprimer une tâche** : même circuit, bouton « × ».
3. **Filtrer** : Toutes / À faire / Terminées. Uniquement dans `App`, aucun appel au main.
4. **Compteur** : « 3 tâches restantes », calculé à partir de la liste, sans nouvel état.
5. **Bonus** : « Effacer les terminées » (`clearDone`, circuit complet).

## Le circuit pour une nouvelle fonction

`todos-service.js` (logique + test) → `handlers.js` → `preload.js` → `mock-api.js` → `useTodos.js` → composant
