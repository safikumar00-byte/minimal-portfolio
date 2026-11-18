const fs = require('fs');
const path = require('path');

function getSourceFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.next' || file === 'scratch' || file === '.git') return;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getSourceFiles(full));
    } else if (/\.(tsx?|jsx?|json|md)$/i.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const files = getSourceFiles('.');
console.log('Total source files scanned:', files.length);

const workRefs = new Map();
const figmaRefs = new Map();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/');
  
  // check for /work/ references that look like image paths
  const matchesWork = content.match(/\/work\/[a-zA-Z0-9_\-\.\/]+\.(jpg|jpeg|png|webp|svg)/g);
  if (matchesWork) {
    workRefs.set(rel, matchesWork);
  }

  // check for /figma/ references
  const matchesFigma = content.match(/\/figma\/[a-zA-Z0-9_\-\.\/]+\.(jpg|jpeg|png|webp|svg)/g);
  if (matchesFigma) {
    figmaRefs.set(rel, matchesFigma);
  }

  if (content.includes('wallet-pending.jpg')) {
    console.log('Found reference to wallet-pending.jpg in:', rel);
  }
});

console.log('\nFiles referencing /work/*.jpg/png:');
workRefs.forEach((refs, file) => {
  console.log(`  ${file} (${refs.length} refs):`);
  refs.slice(0, 3).forEach(r => console.log(`     ${r}`));
});

console.log('\nFiles referencing /figma/*.jpg/png:');
figmaRefs.forEach((refs, file) => {
  console.log(`  ${file} (${refs.length} refs):`);
  refs.slice(0, 3).forEach(r => console.log(`     ${r}`));
});
