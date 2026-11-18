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
      results.push({ full: full.replace(/\\/g, '/'), rel: path.relative(dir, full).replace(/\\/g, '/'), size: stat.size, name: file });
    }
  });
  return results;
}

const figmaFiles = getFiles('figma-files');
console.log('Total files in figma-files:', figmaFiles.length);
console.log('Total size:', figmaFiles.reduce((a,b)=>a+b.size,0), 'bytes');

const zips = figmaFiles.filter(f => f.name.endsWith('.zip'));
console.log('ZIP files count:', zips.length, 'size:', zips.reduce((a,b)=>a+b.size,0));

const nonZips = figmaFiles.filter(f => !f.name.endsWith('.zip'));
console.log('Non-ZIP files count:', nonZips.length, 'size:', nonZips.reduce((a,b)=>a+b.size,0));
console.log('Sample non-zip files:');
nonZips.slice(0, 20).forEach(f => console.log(' ', f.rel, `(${f.size} B)`));

