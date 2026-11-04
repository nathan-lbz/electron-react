// Logique métier : Node pur, testable avec `npm run test:main`.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

function createTodosService(dataDir) {
  const file = path.join(dataDir, 'todos.json');

  async function readAll() {
    try {
      return JSON.parse(await fs.readFile(file, 'utf8'));
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  async function writeAll(todos) {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(file, JSON.stringify(todos, null, 2));
  }

  return {
    // Les plus récentes en premier
    async list() {
      const todos = await readAll();
      return todos.sort((a, b) => b.createdAt - a.createdAt);
    },

    async add(text) {
      if (typeof text !== 'string' || !text.trim()) throw new Error('Le texte est obligatoire');
      const todos = await readAll();
      const todo = { id: crypto.randomUUID(), text: text.trim(), done: false, createdAt: Date.now() };
      todos.push(todo);
      await writeAll(todos);
      return todo;
    },

    // TODO 1 : toggle(id) -> inverse `done`, renvoie la tâche, erreur si introuvable
    // TODO 2 : remove(id) -> supprime la tâche, renvoie true si elle existait
    // TODO 5 (bonus) : clearDone() -> supprime toutes les tâches terminées, renvoie le nombre supprimé
  };
}

module.exports = { createTodosService };
