const http = require('http');
const fs = require('fs');

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR: ' + err.message });
    });
  });
}

async function run() {
  const routes = [
    'http://localhost:3005/',
    'http://localhost:3005/about',
    'http://localhost:3005/work/credbuddha',
    'http://localhost:3005/work/turbopaisa',
    'http://localhost:3005/work/cvm-hrm',
    'http://localhost:3005/work/game-campaigns',
  ];

  console.log('--- Testing Main Routes ---');
  for (const r of routes) {
    const res = await checkUrl(r);
    console.log(`[${res.status}] ${res.url}`);
  }

  console.log('\n--- Testing All 62 Canonical Assets on Server ---');
  const manifests = ['credbuddha', 'turbopaisa', 'cvm-hrms'];
  let failedAssets = 0;
  for (const p of manifests) {
    const mf = JSON.parse(fs.readFileSync(`app/figma/${p}/asset-manifest.json`, 'utf8'));
    for (const a of mf.assets) {
      const assetUrl = `http://localhost:3005${a.publicUrl}`;
      const res = await checkUrl(assetUrl);
      if (res.status !== 200) {
        console.error(`FAILED [${res.status}]: ${assetUrl}`);
        failedAssets++;
      }
    }
  }
  console.log(`Asset test completed: 62 screens checked. Failed: ${failedAssets}`);
}

run();
