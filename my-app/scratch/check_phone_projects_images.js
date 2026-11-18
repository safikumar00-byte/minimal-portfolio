const fs = require('fs');
const content = fs.readFileSync('lib/phone-projects.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('.jpg') || l.includes('.png')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
