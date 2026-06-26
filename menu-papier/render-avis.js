const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 3.13 });
  const filePath = 'file:///' + path.resolve(__dirname, 'carte-avis.html').replace(/\\/g, '/');
  await page.goto(filePath);
  await page.waitForTimeout(400);
  const el = await page.$('#avis');
  await el.screenshot({ path: path.resolve(__dirname, 'carte-avis.png') });
  console.log('carte-avis.png OK');
  await browser.close();
})();
