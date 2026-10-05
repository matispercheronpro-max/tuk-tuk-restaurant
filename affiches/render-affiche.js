const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'affiche-horaires-a4.html').replace(/\\/g, '/');

// A4 portrait : 210mm x 297mm = 8.27in x 11.69in
const pdfPath = path.resolve(__dirname, 'affiche-horaires-tuktuk.pdf');
const avant = fs.existsSync(pdfPath) ? fs.statSync(pdfPath).mtimeMs : 0;
execSync(`"${chrome}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer --paper-width=8.27 --paper-height=11.69 "file:///${htmlPath}"`);
// Verifie que le fichier a vraiment ete reecrit (echoue si le PDF est ouvert dans un lecteur)
if (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).mtimeMs <= avant) {
  console.error("ERREUR : l'affiche n'a pas ete reecrite. Ferme le PDF s'il est ouvert, puis relance.");
  process.exit(1);
}
console.log('affiche-horaires-tuktuk.pdf OK');
