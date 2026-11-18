const fs = require('fs');
const crypto = require('crypto');
function hash(file) {
  try {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  } catch (e) {
    return null;
  }
}

const h1 = hash('public/work/turbopaisa/wallet-pending.jpg');
const h2 = hash('public/figma/turbopaisa/screens/withdrawals/turbopaisa-wallet-withdrawal-processing-pending-02.jpg');
console.log('wallet-pending hash:                         ', h1);
console.log('turbopaisa-wallet-withdrawal-processing hash:', h2);
console.log('Match?', h1 === h2);
