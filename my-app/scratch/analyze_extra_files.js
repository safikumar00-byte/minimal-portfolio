const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hash(file) {
  try {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  } catch (e) {
    return null;
  }
}

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else {
      results.push({ path: full, size: stat.size, name: file, rel: path.relative(dir, full).replace(/\\/g, '/') });
    }
  });
  return results;
}

// 1. Inspect public/figma files
const pubFigmaFiles = getFiles('public/figma');
console.log('--- public/figma analysis ---');
let canonicalInPubFigma = 0;
let duplicatesInPubFigma = 0;
let otherInPubFigma = [];

const mfAssets = [];
['credbuddha', 'turbopaisa', 'cvm-hrms'].forEach(p => {
  const mf = JSON.parse(fs.readFileSync(path.join('app/figma', p, 'asset-manifest.json'), 'utf8'));
  mf.assets.forEach(a => mfAssets.push({ project: p, ...a, canonPubRel: a.publicUrl.replace(/^\/figma\//, '') }));
});

const canonPubRels = new Set(mfAssets.map(a => a.canonPubRel));

pubFigmaFiles.forEach(f => {
  if (canonPubRels.has(f.rel)) {
    canonicalInPubFigma++;
  } else {
    duplicatesInPubFigma++;
    otherInPubFigma.push(f);
  }
});

console.log(`public/figma total: ${pubFigmaFiles.length}, canonical: ${canonicalInPubFigma}, extra: ${duplicatesInPubFigma}`);
console.log('Sample extra files in public/figma:');
otherInPubFigma.slice(0, 15).forEach(f => console.log('  ', f.rel, `(${f.size} B)`));

// 2. Inspect public/work files
console.log('\n--- public/work analysis ---');
const pubWorkFiles = getFiles('public/work');
console.log('public/work total files:', pubWorkFiles.length);
pubWorkFiles.slice(0, 15).forEach(f => console.log('  ', f.rel, `(${f.size} B)`));

// 3. Inspect figma-files
console.log('\n--- figma-files analysis ---');
const figmaFiles = getFiles('figma-files');
console.log('figma-files total files:', figmaFiles.length);
const zipFiles = figmaFiles.filter(f => f.name.endsWith('.zip'));
console.log('zip files in figma-files:', zipFiles.map(z => ({ name: z.name, size: z.size })));

