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
      results.push({ full, size: stat.size, name: file, rel: path.relative(dir, full).replace(/\\/g, '/') });
    }
  });
  return results;
}

const mfAssets = [];
['credbuddha', 'turbopaisa', 'cvm-hrms'].forEach(p => {
  const mf = JSON.parse(fs.readFileSync(path.join('app/figma', p, 'asset-manifest.json'), 'utf8'));
  mf.assets.forEach(a => {
    // a.publicUrl = "/figma/credbuddha/screens/onboarding/credbuddha-onboarding-welcome-default-01.jpg"
    // local path under public:
    const pubPath = path.join('public', a.publicUrl.replace(/^\//, ''));
    mfAssets.push({
      project: p,
      id: a.id,
      publicUrl: a.publicUrl,
      canonicalPubPath: pubPath.replace(/\\/g, '/'),
      filename: path.basename(a.publicUrl),
      hash: hash(pubPath)
    });
  });
});

console.log('Manifest assets count:', mfAssets.length); // should be 62
console.log('Sample canonical paths:');
mfAssets.slice(0, 5).forEach(a => console.log(' ', a.canonicalPubPath, fs.existsSync(a.canonicalPubPath) ? 'EXISTS' : 'NOT FOUND'));

// Now check all files in public/figma
const pubFigmaFiles = getFiles('public/figma');
console.log('\nTotal files in public/figma:', pubFigmaFiles.length);

const canonicalPathsSet = new Set(mfAssets.map(a => a.canonicalPubPath));
const canonicalHashes = new Map(mfAssets.map(a => [a.hash, a.canonicalPubPath]));

let exactlyCanonicalInPubFigma = 0;
let redundantInPubFigma = [];

pubFigmaFiles.forEach(f => {
  const normalizedFull = f.full.replace(/\\/g, '/');
  if (canonicalPathsSet.has(normalizedFull)) {
    exactlyCanonicalInPubFigma++;
  } else {
    // Check if it's a hash duplicate of one of the canonical files
    const h = hash(f.full);
    const matchesCanonical = canonicalHashes.has(h);
    redundantInPubFigma.push({
      path: normalizedFull,
      size: f.size,
      name: f.name,
      isExactDuplicate: matchesCanonical,
      matchingCanonical: matchesCanonical ? canonicalHashes.get(h) : null
    });
  }
});

console.log(`In public/figma: ${exactlyCanonicalInPubFigma} are canonical screens.`);
console.log(`In public/figma: ${redundantInPubFigma.length} are extra/redundant.`);
const hashDuplicatesCount = redundantInPubFigma.filter(r => r.isExactDuplicate).length;
console.log(`Of the redundant files, ${hashDuplicatesCount} are exact hash duplicates of canonical files.`);
const nonHashDuplicates = redundantInPubFigma.filter(r => !r.isExactDuplicate);
console.log(`Non-hash-duplicates in public/figma: ${nonHashDuplicates.length}`);
if (nonHashDuplicates.length > 0) {
  console.log('Sample non-hash-duplicates:');
  nonHashDuplicates.slice(0, 10).forEach(n => console.log(' ', n.path, n.size));
}

