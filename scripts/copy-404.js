const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '..', 'public', '404.html');
const targetFile = path.join(__dirname, '..', 'dist', 'tick-talk', 'browser', '404.html');

// Ensure target directory exists
const targetDir = path.dirname(targetFile);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy 404.html to dist folder
fs.copyFileSync(sourceFile, targetFile);
console.log('✓ 404.html copied to dist/tick-talk/browser/');
