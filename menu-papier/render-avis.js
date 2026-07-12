const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'carte-avis.html').replace(/\\/g, '/');
const pdfPath = path.resolve(__dirname, 'carte-avis.pdf');

// A6 portrait : 105mm x 148mm = 4.13in x 5.83in
execSync(`"${chrome}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer --paper-width=4.13 --paper-height=5.83 "file:///${htmlPath}"`);
console.log('carte-avis.pdf OK');
