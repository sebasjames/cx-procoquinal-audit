const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = 'C:\\Users\\sebas\\Desktop\\AvalonProyecto\\AvalonProyecto';

async function processDirectory(directory) {
  const dirPath = path.join(targetDir, directory);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, file.replace('.png', '.webp'));
      console.log(`Converting ${inputPath} to webp...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      // Delete old png
      fs.unlinkSync(inputPath);
    }
  }
}

async function run() {
  await processDirectory('public/screenshots');
  await processDirectory('public/logos');
  
  // Replace in files
  const srcDir = path.join(targetDir, 'src');
  function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        replaceInDir(fullPath);
      } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        let content = fs.readFileSync(fullPath, 'utf-8');
        let modified = false;
        
        // Match image: '/screenshots/...' -> image: `${import.meta.env.BASE_URL}screenshots/...`
        if (content.includes("'/screenshots/")) {
           content = content.replace(/'\/screenshots\/([^']+)\.png'/g, "`\\${import.meta.env.BASE_URL}screenshots/$1.webp`");
           modified = true;
        }
        if (content.includes('"/logos/')) {
           content = content.replace(/"\/logos\/([^"]+)\.png"/g, "{`${import.meta.env.BASE_URL}logos/$1.webp`}");
           modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
  
  replaceInDir(srcDir);
  console.log("Done");
}

run().catch(console.error);
