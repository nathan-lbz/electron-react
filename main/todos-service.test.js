const assert = require('node:assert/strict');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs/promises');
const { createTodosService } = require('./todos-service');

(async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'todos-'));
  const service = createTodosService(dir);

  assert.deepEqual(await service.list(), []);

  const t = await service.add('  Apprendre React  ');
  assert.equal(t.text, 'Apprendre React');
  assert.equal(t.done, false);
  assert.equal((await service.list()).length, 1);

  await assert.rejects(service.add('   '), /obligatoire/);

  // TODO : tests de toggle, remove (et clearDone)

  await fs.rm(dir, { recursive: true });
  console.log('✔ Tous les tests passent');
})().catch((err) => {
  console.error('✘', err.message);
  process.exit(1);
});
