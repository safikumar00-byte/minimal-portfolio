const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(data).digest('hex');
  } catch (e) {
    return null;
  }
}

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
const appFigma = getFiles('app/figma');
const pubWork = getFiles('public/work');
const figmaFiles = getFiles('figma-files');

console.log('public/figma files:', pubFigma.length, 'total bytes:', pubFigma.reduce((a,b)=>a+b.size,0));
console.log('app/figma files:', appFigma.length, 'total bytes:', appFigma.reduce((a,b)=>a+b.size,0));
console.log('public/work files:', pubWork.length, 'total bytes:', pubWork.reduce((a,b)=>a+b.size,0));
console.log('figma-files files:', figmaFiles.length, 'total bytes:', figmaFiles.reduce((a,b)=>a+b.size,0));

// Check images in app/figma vs public/figma
const appFigmaImages = appFigma.filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f.name));
console.log('app/figma image count:', appFigmaImages.length);

const pubFigmaImages = pubFigma.filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f.name));
console.log('public/figma image count:', pubFigmaImages.length);

// Check public/figma structure
const pubProjects = {};
pubFigmaImages.forEach(f => {
  const rel = path.relative('public/figma', f.path).replace(/\\/g, '/');
  const proj = rel.split('/')[0];
  pubProjects[proj] = (pubProjects[proj] || 0) + 1;
});
console.log('public/figma images by top folder:', pubProjects);

// Check app/figma images
const appProjects = {};
appFigmaImages.forEach(f => {
  const rel = path.relative('app/figma', f.path).replace(/\\/g, '/');
  const proj = rel.split('/')[0];
  appProjects[proj] = (appProjects[proj] || 0) + 1;
});
console.log('app/figma images by top folder:', appProjects);

// Check public/work structure
const workProjects = {};
pubWork.forEach(f => {
  const rel = path.relative('public/work', f.path).replace(/\\/g, '/');
  const proj = rel.split('/')[0];
  workProjects[proj] = (workProjects[proj] || 0) + 1;
});
console.log('public/work files by top folder:', workProjects);

