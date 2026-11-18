const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const candidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];
const browserPath = candidates.find(c => fs.existsSync(c));
const outDir = path.resolve('public', 'screenshots');

const pages = [
  { url: 'http://localhost:3005/work/turbopaisa#screens', out: path.join(outDir, 'turbopaisa-screens-gallery.png') },
  { url: 'http://localhost:3005/work/credbuddha#screens', out: path.join(outDir, 'credbuddha-screens-gallery.png') },
  { url: 'http://localhost:3005/work/cvm-hrm#screens', out: path.join(outDir, 'cvm-hrms-screens-gallery.png') },
];

pages.forEach(p => {
  console.log(`Capturing gallery screenshot for ${p.url} -> ${p.out}...`);
  try {
    const cmd = `"${browserPath}" --headless --disable-gpu --window-size=1440,1200 --virtual-time-budget=6000 --screenshot="${p.out}" "${p.url}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Success! Saved ${p.out} (${fs.statSync(p.out).size} bytes)`);
  } catch (err) {
    console.error(`Failed to capture ${p.url}:`, err.message);
  }
});
