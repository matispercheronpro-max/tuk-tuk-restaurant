const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'carte-avis.html').replace(/\\/g, '/');
const pdfPath = path.resolve(__dirname, 'carte-avis.pdf');

// A6 portrait : 105mm x 148mm = 4.13in x 5.83in
const fs = require('fs');
const avant = fs.existsSync(pdfPath) ? fs.statSync(pdfPath).mtimeMs : 0;
execSync(`"${chrome}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer --paper-width=4.13 --paper-height=5.83 "file:///${htmlPath}"`);
// Vérifie que le fichier a vraiment été réécrit (échoue si le PDF est ouvert/verrouillé dans un lecteur)
if (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).mtimeMs <= avant) {
  console.error('ERREUR : le PDF n\'a pas été réécrit. Ferme carte-avis.pdf s\'il est ouvert, puis relance.');
  process.exit(1);
}
console.log('carte-avis.pdf OK');
