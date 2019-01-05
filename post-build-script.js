const fs = require('fs');
const path = require('path');

const INDEX_HTML_PATH = path.join(__dirname, 'build/index.html');
const ENC = 'UTF-8';

const inputHTML = fs.readFileSync(INDEX_HTML_PATH, ENC);
const outputHTML = inputHTML.replace(/="\//g, '="./');

fs.writeFileSync(INDEX_HTML_PATH, outputHTML, ENC);
console.log(`Updated ${INDEX_HTML_PATH} to work locally`);
