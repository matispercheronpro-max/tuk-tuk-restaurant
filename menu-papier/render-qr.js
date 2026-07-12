const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'carte-qr-a5.html').replace(/\\/g, '/');
const pdfPath = path.resolve(__dirname, 'carte-qr-tuktuk.pdf');

// A5 portrait : 148mm x 210mm = 5.83in x 8.27in
execSync(`"${chrome}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer --print-to-pdf-no-header --paper-width=5.83 --paper-height=8.27 "file:///${htmlPath}"`);
console.log('carte-qr-tuktuk.pdf OK');
