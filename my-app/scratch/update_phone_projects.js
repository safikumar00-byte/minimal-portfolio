const fs = require('fs');
const path = require('path');

const manifests = {
  credbuddha: JSON.parse(fs.readFileSync('app/figma/credbuddha/asset-manifest.json', 'utf8')),
  turbopaisa: JSON.parse(fs.readFileSync('app/figma/turbopaisa/asset-manifest.json', 'utf8')),
  'cvm-hrms': JSON.parse(fs.readFileSync('app/figma/cvm-hrms/asset-manifest.json', 'utf8')),
};

const filenameToPublicUrl = new Map();
Object.values(manifests).forEach(mf => {
  mf.assets.forEach(a => {
    const filename = path.basename(a.publicUrl);
    filenameToPublicUrl.set(filename, a.publicUrl);
  });
});

let code = fs.readFileSync('lib/phone-projects.ts', 'utf8');

// Replace /work/(credbuddha|turbopaisa|cvm-hrm)/<filename> with canonical publicUrl
code = code.replace(/\/work\/(credbuddha|turbopaisa|cvm-hrm)\/([^"'\s]+)/g, (match, proj, fn) => {
  if (filenameToPublicUrl.has(fn)) {
    return filenameToPublicUrl.get(fn);
  }
  console.warn('Unknown file in replacement:', match);
  return match;
});

// Update PhoneProject interface to include figmaEmbedUrl & figmaSourceUrl
if (!code.includes('figmaEmbedUrl?: string;')) {
  code = code.replace(
    'figmaUrl?: string;\n  overview: string;',
    'figmaUrl?: string;\n  figmaEmbedUrl?: string;\n  figmaSourceUrl?: string;\n  overview: string;'
  );
}

// Ensure CaseStudyOverview also has figmaEmbedUrl & figmaSourceUrl
if (!code.includes('figmaEmbedUrl?: string;\n};')) {
  code = code.replace(
    'figmaUrl?: string;\n};',
    'figmaUrl?: string;\n  figmaEmbedUrl?: string;\n  figmaSourceUrl?: string;\n};'
  );
}

// Add figmaEmbedUrl and figmaSourceUrl to credBuddhaProject
if (!code.includes('figmaEmbedUrl: "https://embed.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&embed-host=share"')) {
  code = code.replace(
    'figmaUrl: "https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f",',
    `figmaUrl: "https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f",
  figmaSourceUrl: "https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f",
  figmaEmbedUrl: "https://embed.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&embed-host=share",`
  );
}

// Add figmaEmbedUrl and figmaSourceUrl to turboPaisaProject
if (!code.includes('figmaEmbedUrl: "https://embed.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&embed-host=share"')) {
  code = code.replace(
    'figmaUrl: "https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f",',
    `figmaUrl: "https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f",
  figmaSourceUrl: "https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f",
  figmaEmbedUrl: "https://embed.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&embed-host=share",`
  );
}

// Add figmaEmbedUrl and figmaSourceUrl to cvmHrmProject
if (!code.includes('figmaEmbedUrl: "https://embed.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&embed-host=share"')) {
  code = code.replace(
    'figmaUrl: "https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&p=f",',
    `figmaUrl: "https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318",
  figmaSourceUrl: "https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318",
  figmaEmbedUrl: "https://embed.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&embed-host=share",`
  );
}

fs.writeFileSync('lib/phone-projects.ts', code, 'utf8');
console.log('Successfully updated lib/phone-projects.ts!');
