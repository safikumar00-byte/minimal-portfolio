const fs = require('fs');
const map = JSON.parse(fs.readFileSync('app/figma/rename-map.json', 'utf8'));
const match = map.find(m => m.sourceOriginal === 'My Wallet-tp-3.jpg' || m.canonicalName.includes('wallet'));
console.log('Matches for wallet:');
map.filter(m => m.canonicalName.includes('wallet') || (m.sourceOriginal && m.sourceOriginal.includes('Wallet'))).forEach(m => {
  console.log(m.sourceOriginal, '->', m.canonicalName, 'public:', m.canonicalPublicPath);
});
