// Canal IPC -> fonction du service. Utilisé par main.js (Electron) ET vite.config.mjs (StackBlitz).
function createHandlers(todos) {
  return {
    'todos:list': () => todos.list(),
    'todos:add': (text) => todos.add(text),
    // TODO : 'todos:toggle', 'todos:remove'
  };
}

module.exports = { createHandlers };
