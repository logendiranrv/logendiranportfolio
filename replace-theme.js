const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { from: /#00c853/g, to: '#00f2fe' },
  { from: /#69f0ae/g, to: '#4facfe' },
  { from: /#00e676/g, to: '#00f2fe' },
  { from: /rgba\(0,\s*200,\s*83/g, to: 'rgba(0, 242, 254' },
  { from: /rgba\(0,\s*230,\s*118/g, to: 'rgba(79, 172, 254' },
  { from: /rgba\(105,\s*240,\s*174/g, to: 'rgba(79, 172, 254' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const rule of replacements) {
        if (rule.from.test(content)) {
          content = content.replace(rule.from, rule.to);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated ' + fullPath);
      }
    }
  }
}

processDir(srcDir);
