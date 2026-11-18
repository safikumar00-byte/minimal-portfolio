const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const candidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const browserPath = candidates.find(c => fs.existsSync(c));
const outDir = path.resolve('public', 'screenshots');

const pages = [
  { url: 'http://localhost:3005/work/turbopaisa', out: path.join(outDir, 'turbopaisa-full.png') },
  { url: 'http://localhost:3005/work/credbuddha', out: path.join(outDir, 'credbuddha-full.png') },
  { url: 'http://localhost:3005/work/cvm-hrm', out: path.join(outDir, 'cvm-hrms-full.png') },
];

pages.forEach(p => {
  console.log(`Capturing tall screenshot for ${p.url}...`);
  try {
    const cmd = `"${browserPath}" --headless --disable-gpu --window-size=1440,3000 --virtual-time-budget=8000 --screenshot="${p.out}" "${p.url}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Success! Saved ${p.out} (${fs.statSync(p.out).size} bytes)`);
  } catch (err) {
    console.error(`Failed ${p.url}:`, err.message);
  }
});
