const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { from: /#00f2fe/g, to: '#3b82f6' },
  { from: /#4facfe/g, to: '#60a5fa' },
  { from: /#0a0a0a/g, to: '#0f172a' },
  { from: /rgba\(10,\s*20,\s*10,\s*0.7\)/g, to: 'rgba(30, 41, 59, 0.7)' },
  { from: /#e8f5e9/g, to: '#f8fafc' },
  { from: /#81c784/g, to: '#94a3b8' },
  { from: /rgba\(0,\s*10,\s*0,\s*0.75\)/g, to: 'rgba(15, 23, 42, 0.75)' },
  { from: /rgba\(0,\s*242,\s*254/g, to: 'rgba(59, 130, 246' },
  { from: /rgba\(79,\s*172,\s*254/g, to: 'rgba(96, 165, 250' }
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
