const fs = require('fs');
const map = JSON.parse(fs.readFileSync('app/figma/rename-map.json', 'utf8'));
map.renamedFiles.forEach(m => {
  if (m.originalFile && m.originalFile.includes('Wallet')) {
    console.log(m.originalFile, '->', m.newName, 'module:', m.module);
  }
});
