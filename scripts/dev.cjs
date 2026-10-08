const { spawn } = require('node:child_process');
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this through npm run dev:all.');
const children = ['backend', 'frontend'].map(workspace => spawn(process.execPath, [npmCli, 'run', 'dev', '--workspace', workspace], { stdio: 'inherit', windowsHide: true }));
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of children) {
    if (child.exitCode !== null) continue;
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
    else child.kill('SIGTERM');
  }
}
for (const child of children) {
  child.on('error', () => stop(1));
  child.on('exit', code => stop(code ?? 1));
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
