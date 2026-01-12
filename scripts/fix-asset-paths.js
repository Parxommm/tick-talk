const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist', 'tick-talk', 'browser');
const baseHref = '/tick-talk/';

// Function to fix asset paths in content
function fixAssetPaths(content) {
  // Replace absolute paths in @font-face and url() with baseHref-prefixed paths
  // Match: url(/assets/...) -> url(/tick-talk/assets/...)
  // But only if it's not already prefixed
  return content.replace(
    /url\((\/assets\/[^)]+)\)/g,
    (match, assetPath) => {
      // Don't add baseHref if it's already there
      if (assetPath.startsWith(baseHref)) {
        return match;
      }
      return `url(${baseHref}${assetPath.slice(1)})`;
    }
  );
}

// Fix CSS files
const cssFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.css'));

cssFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = fixAssetPaths(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Fixed asset paths in ${file}`);
});

// Fix HTML files (for inline styles)
const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = fixAssetPaths(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Fixed asset paths in ${file}`);
});
