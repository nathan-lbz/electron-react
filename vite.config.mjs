// En dev web, Vite joue le rôle du main : /__ipc/<canal> appelle les vrais handlers.
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { createTodosService } = require('./main/todos-service.js');
const { createHandlers } = require('./main/handlers.js');

export default {
  root: 'renderer',
  base: './', // chemins relatifs : nécessaire pour loadFile() en file://
  build: { outDir: '../dist-renderer', emptyOutDir: true },
  plugins: [react(), {
    name: 'fake-ipc',
    configureServer(server) {
      const handlers = createHandlers(createTodosService(path.resolve('data')));

      server.middlewares.use('/__ipc', async (req, res) => {
        const handler = handlers[decodeURIComponent(req.url.slice(1))];
        let body = '';
        for await (const chunk of req) body += chunk;
        res.setHeader('Content-Type', 'application/json');
        try {
          if (!handler) throw new Error(`Canal inconnu : ${req.url.slice(1)}`);
          const result = await handler(...(body ? JSON.parse(body) : []));
          res.end(JSON.stringify({ result }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  }],
};
