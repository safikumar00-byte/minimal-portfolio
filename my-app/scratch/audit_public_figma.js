const fs = require('fs');
const path = require('path');

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
      results.push({ path: full, size: stat.size, name: file });
    }
  });
  return results;
}

const pubFigma = getFiles('public/figma');
console.log('Sample public/figma paths:');
pubFigma.slice(0, 30).forEach(f => {
  console.log(path.relative('public/figma', f.path).replace(/\\/g, '/'));
});

// Group by subdirectory structure
const tree = {};
pubFigma.forEach(f => {
  const parts = path.relative('public/figma', f.path).replace(/\\/g, '/').split('/');
  const dir = parts.slice(0, -1).join('/');
  tree[dir] = (tree[dir] || 0) + 1;
});
console.log('\nSubdirectory counts in public/figma:');
console.log(tree);

