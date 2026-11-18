const fs = require('fs');
const path = require('path');

const projects = ['credbuddha', 'turbopaisa', 'cvm-hrms'];
projects.forEach(p => {
  const mfPath = path.join('app/figma', p, 'asset-manifest.json');
  const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
  console.log(`\n=== Project: ${p} (Assets in manifest: ${mf.assets.length}) ===`);
  mf.assets.forEach(a => {
    console.log(`  id: ${a.id} | publicUrl: ${a.publicUrl} | file: ${a.file}`);
  });
});
