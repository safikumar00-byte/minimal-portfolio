const fs = require('fs');
const path = require('path');

['credbuddha', 'turbopaisa', 'cvm-hrms'].forEach(p => {
  const mfPath = path.join('app/figma', p, 'asset-manifest.json');
  const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
  mf.canonicalLocation = `public/figma/${p}/screens/`;
  mf.assets.forEach(a => {
    delete a.workUrl;
  });
  fs.writeFileSync(mfPath, JSON.stringify(mf, null, 2) + '\n', 'utf8');
});
console.log('Updated asset manifests cleanly.');
