const fs = require('fs');
const path = require('path');

const manifests = {
  credbuddha: JSON.parse(fs.readFileSync('app/figma/credbuddha/asset-manifest.json', 'utf8')),
  turbopaisa: JSON.parse(fs.readFileSync('app/figma/turbopaisa/asset-manifest.json', 'utf8')),
  'cvm-hrms': JSON.parse(fs.readFileSync('app/figma/cvm-hrms/asset-manifest.json', 'utf8')),
};

Object.entries(manifests).forEach(([proj, mf]) => {
  console.log(`\n=== ${proj} ===`);
  const groups = {};
  mf.assets.forEach(a => {
    if (!groups[a.module]) groups[a.module] = [];
    groups[a.module].push(a);
  });
  Object.entries(groups).forEach(([mod, assets]) => {
    console.log(`  module: ${mod} (${assets.length} screens)`);
    assets.forEach(a => console.log(`     - ${a.screen} [${a.publicUrl}]`));
  });
});
