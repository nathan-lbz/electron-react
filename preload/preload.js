// Contrat window.api. renderer/public/mock-api.js doit avoir la même forme.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  isMock: false,
  listTodos: () => ipcRenderer.invoke('todos:list'),
  addTodo: (text) => ipcRenderer.invoke('todos:add', text),
  // TODO : toggleTodo(id), removeTodo(id)
});
