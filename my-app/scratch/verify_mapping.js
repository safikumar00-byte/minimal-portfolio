const fs = require('fs');
const path = require('path');

const manifests = {
  credbuddha: JSON.parse(fs.readFileSync('app/figma/credbuddha/asset-manifest.json', 'utf8')),
  turbopaisa: JSON.parse(fs.readFileSync('app/figma/turbopaisa/asset-manifest.json', 'utf8')),
  'cvm-hrms': JSON.parse(fs.readFileSync('app/figma/cvm-hrms/asset-manifest.json', 'utf8')),
};

// Map from filename -> publicUrl
const filenameToPublicUrl = new Map();
Object.values(manifests).forEach(mf => {
  mf.assets.forEach(a => {
    const filename = path.basename(a.publicUrl);
    filenameToPublicUrl.set(filename, a.publicUrl);
  });
});

console.log('Total mapped canonical filenames:', filenameToPublicUrl.size);

// Read lib/phone-projects.ts
const content = fs.readFileSync('lib/phone-projects.ts', 'utf8');
const workMatches = content.match(/\/work\/(credbuddha|turbopaisa|cvm-hrm)\/([^"'\s]+)/g) || [];
console.log('Matches in phone-projects.ts:', workMatches.length);

let missing = 0;
workMatches.forEach(w => {
  const filename = path.basename(w);
  if (!filenameToPublicUrl.has(filename)) {
    console.log('NOT FOUND in manifest:', w, 'filename:', filename);
    missing++;
  }
});
console.log('Missing in manifests:', missing);
