const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'carte-qr-a5.html').replace(/\\/g, '/');
const pdfPath = path.resolve(__dirname, 'carte-qr-tuktuk.pdf');

// A5 portrait : 148mm x 210mm = 5.83in x 8.27in
const fs = require('fs');
const avant = fs.existsSync(pdfPath) ? fs.statSync(pdfPath).mtimeMs : 0;
execSync(`"${chrome}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer --print-to-pdf-no-header --paper-width=5.83 --paper-height=8.27 "file:///${htmlPath}"`);
// Vérifie que le fichier a vraiment été réécrit (échoue si le PDF est ouvert/verrouillé dans un lecteur)
if (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).mtimeMs <= avant) {
  console.error('ERREUR : le PDF n\'a pas été réécrit. Ferme carte-qr-tuktuk.pdf s\'il est ouvert, puis relance.');
  process.exit(1);
}
console.log('carte-qr-tuktuk.pdf OK');
