import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(import.meta.dirname, '..', 'out');
const enDir = path.join(outDir, 'en');

console.log('📦 Post-build: Moving English content to root...');

// Function to recursively copy directory
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory ${src} does not exist`);
    return;
  }

  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy all files from /en to root
if (fs.existsSync(enDir)) {
  const entries = fs.readdirSync(enDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(enDir, entry.name);
    const destPath = path.join(outDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // Remove the redirect page.html from root (replaced by en/index.html)
  const rootPageHtml = path.join(outDir, 'page.html');
  if (fs.existsSync(rootPageHtml)) {
    fs.unlinkSync(rootPageHtml);
    console.log('✅ Removed redirect page');
  }

  console.log('✅ English content moved to root');
  console.log('✅ German content remains at /de');
  console.log('');
  console.log('Static export structure:');
  console.log('  / → English site');
  console.log('  /de → German site');
} else {
  console.error('❌ /en directory not found in out folder');
  process.exit(1);
}
