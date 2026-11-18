const fs = require('fs');
const path = require('path');

const manifests = {
  credbuddha: JSON.parse(fs.readFileSync('app/figma/credbuddha/asset-manifest.json', 'utf8')),
  turbopaisa: JSON.parse(fs.readFileSync('app/figma/turbopaisa/asset-manifest.json', 'utf8')),
  'cvm-hrms': JSON.parse(fs.readFileSync('app/figma/cvm-hrms/asset-manifest.json', 'utf8')),
};

const filenameToPublicUrl = new Map();
Object.values(manifests).forEach(mf => {
  mf.assets.forEach(a => {
    const filename = path.basename(a.publicUrl);
    filenameToPublicUrl.set(filename, a.publicUrl);
  });
});

['components/project-case-study.tsx', 'app/work/game-campaigns/page.tsx'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/\/work\/(credbuddha|turbopaisa|cvm-hrm)\/([^"'\s]+)/g) || [];
  console.log(`${file}: ${matches.length} matches`);
  matches.forEach(m => {
    const fn = path.basename(m);
    console.log(' ', m, '->', filenameToPublicUrl.get(fn));
  });
});
