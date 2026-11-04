// Processus main : uniquement avec un vrai Electron (pas sur StackBlitz).
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { createTodosService } = require('./todos-service');
const { createHandlers } = require('./handlers');

function createWindow() {
  const win = new BrowserWindow({
    width: 520,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(path.join(__dirname, '..', 'dist-renderer', 'index.html'));
}

app.whenReady().then(() => {
  const todos = createTodosService(app.getPath('userData'));
  for (const [channel, fn] of Object.entries(createHandlers(todos))) {
    ipcMain.handle(channel, (_event, ...args) => fn(...args));
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
