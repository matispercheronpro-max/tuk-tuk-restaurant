const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 3.13 });
  const filePath = 'file:///' + path.resolve(__dirname, 'carte-a5.html').replace(/\\/g, '/');
  await page.goto(filePath);
  await page.waitForTimeout(500);

  for (const id of ['p1', 'p2', 'p3', 'p4']) {
    const el = await page.$('#' + id);
    await el.screenshot({ path: path.resolve(__dirname, id + '.png') });
    console.log(id + '.png OK');
  }

  await browser.close();
})();
