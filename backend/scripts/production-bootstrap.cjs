const { spawnSync } = require('node:child_process');
const path = require('node:path');

// An explicitly enabled, one-time build step; never an HTTP endpoint.
if (process.env.PRODUCTION_BOOTSTRAP_ENABLED === 'true') {
  if (process.env.VERCEL_ENV !== 'production') {
    throw new Error('Administrator initialization is restricted to production builds.');
  }
  for (const script of ['initializeDatabase', 'createAdmin']) {
    const result = spawnSync(process.execPath, [path.resolve(__dirname, '../dist/scripts/' + script + '.js')], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' },
    });
    if (result.status !== 0) process.exit(1);
  }
}
