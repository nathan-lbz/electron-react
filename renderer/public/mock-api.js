// Sur StackBlitz : remplace le preload, passe par HTTP (serveur Vite) au lieu de l'IPC.
(function () {
  if (window.api) return;

  async function invoke(channel, ...args) {
    const res = await fetch(`/__ipc/${channel}`, { method: 'POST', body: JSON.stringify(args) });
    if (!res.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Route /__ipc absente : redémarre Vite (npm run dev:web)');
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.result;
  }

  window.api = {
    isMock: true,
    listTodos: () => invoke('todos:list'),
    addTodo: (text) => invoke('todos:add', text),
    // TODO : toggleTodo(id), removeTodo(id)
  };
})();
