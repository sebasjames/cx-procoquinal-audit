const fs = require('fs');
['src/AvalonGallery.tsx', 'src/App.tsx'].forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\\\$\{import/g, '${import');
    fs.writeFileSync(f, c);
    console.log('Fixed ' + f);
  }
});
