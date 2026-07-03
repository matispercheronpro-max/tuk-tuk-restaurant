const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'carte-a5.html').replace(/\\/g, '/');
const pdfPath = path.resolve(__dirname, 'carte-tuktuk.pdf');

execSync(`"${chrome}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file:///${htmlPath}"`);
console.log('carte-tuktuk.pdf OK');
