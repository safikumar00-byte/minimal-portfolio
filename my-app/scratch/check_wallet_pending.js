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

const targetHash = hash('public/work/turbopaisa/wallet-pending.jpg');
console.log('wallet-pending.jpg hash:', targetHash);

// search in figma-files
function searchDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchDir(full);
    } else {
      if (hash(full) === targetHash) {
        console.log('Match found in:', full);
      }
    }
  });
}
searchDir('figma-files');
