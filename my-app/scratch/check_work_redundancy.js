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
      results.push({ full: full.replace(/\\/g, '/'), size: stat.size, name: file });
    }
  });
  return results;
}

const mfAssets = [];
['credbuddha', 'turbopaisa', 'cvm-hrms'].forEach(p => {
  const mf = JSON.parse(fs.readFileSync(path.join('app/figma', p, 'asset-manifest.json'), 'utf8'));
  mf.assets.forEach(a => {
    const pubPath = path.join('public', a.publicUrl.replace(/^\//, '')).replace(/\\/g, '/');
    mfAssets.push({
      project: p,
      publicUrl: a.publicUrl,
      canonicalPubPath: pubPath,
      hash: hash(pubPath)
    });
  });
});

const canonicalHashes = new Map(mfAssets.map(a => [a.hash, a.canonicalPubPath]));

const workFiles = getFiles('public/work');
console.log('Total files in public/work:', workFiles.length);

let hashMatches = 0;
let nonMatches = [];

workFiles.forEach(f => {
  const h = hash(f.full);
  if (canonicalHashes.has(h)) {
    hashMatches++;
  } else {
    nonMatches.push(f);
  }
});

console.log(`In public/work: ${hashMatches} match canonical hashes.`);
console.log(`In public/work: ${nonMatches.length} do NOT match canonical hashes.`);
if (nonMatches.length > 0) {
  console.log('Non-matching files in public/work:');
  nonMatches.forEach(n => console.log(' ', n.full, n.size));
}
