try {
  require.resolve('puppeteer');
  console.log('puppeteer installed');
} catch (e) {
  console.log('puppeteer not installed');
}
try {
  require.resolve('playwright');
  console.log('playwright installed');
} catch (e) {
  console.log('playwright not installed');
}
