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

const workDirs = fs.readdirSync('public/work');
console.log('Subdirectories in public/work:', workDirs);
workDirs.forEach(d => {
  const files = getFiles(path.join('public/work', d));
  console.log(` public/work/${d}: ${files.length} files`);
});
