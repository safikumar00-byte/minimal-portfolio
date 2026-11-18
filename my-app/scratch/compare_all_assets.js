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

const projects = ['credbuddha', 'turbopaisa', 'cvm-hrms'];
const canonicalFiles = new Map(); // relative canonical path -> hash

let missingInPublicScreens = 0;
let missingInAppScreens = 0;
let hashMismatches = 0;

projects.forEach(p => {
  const mf = JSON.parse(fs.readFileSync(path.join('app/figma', p, 'asset-manifest.json'), 'utf8'));
  mf.assets.forEach(a => {
    // Canonical path relative to public/
    // publicUrl is e.g. /figma/credbuddha/screens/onboarding/credbuddha-onboarding-welcome-default-01.jpg
    const pubRel = a.publicUrl.replace(/^\//, ''); // figma/credbuddha/screens/...
    const pubFull = path.join('public', pubRel);
    const appFull = path.join('app/figma', p, a.file);

    const pubExists = fs.existsSync(pubFull);
    const appExists = fs.existsSync(appFull);

    if (!pubExists) {
      console.log('MISSING in public:', pubFull);
      missingInPublicScreens++;
    }
    if (!appExists) {
      console.log('MISSING in app:', appFull);
      missingInAppScreens++;
    }
    if (pubExists && appExists) {
      const hPub = hash(pubFull);
      const hApp = hash(appFull);
      if (hPub !== hApp) {
        console.log('HASH MISMATCH:', pubFull, 'vs', appFull);
        hashMismatches++;
      } else {
        canonicalFiles.set(pubRel, hPub);
      }
    } else if (pubExists) {
      canonicalFiles.set(pubRel, hash(pubFull));
    }
  });
});

console.log(`Canonical summary: total=${canonicalFiles.size}, missingInPublic=${missingInPublicScreens}, missingInApp=${missingInAppScreens}, hashMismatches=${hashMismatches}`);
