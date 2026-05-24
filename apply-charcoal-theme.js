const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'App.css');
const componentsCssPath = path.join(__dirname, 'src', 'components', 'components.css');
const bgPath = path.join(__dirname, 'src', 'components', 'Background3D.js');

// 1. Update App.css variables and button text colors
let appCss = fs.readFileSync(cssPath, 'utf8');

// Replace CSS variables block
const newRoot = `:root {
  --primary-color: #ffffff;
  --secondary-color: #a3a3a3;
  --dark-color: #111111;
  --light-color: rgba(30, 30, 30, 0.7);
  --text-color: #ffffff;
  --text-muted: #a3a3a3;
  --glass-bg: rgba(17, 17, 17, 0.8);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6);
  --accent-gradient: linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%);
}`;

appCss = appCss.replace(/:root\s*\{[\s\S]*?\}/, newRoot);

// Fix button text color for white backgrounds
appCss = appCss.replace(/\.btn-primary\s*\{[^}]*\}/g, (match) => {
  return match.replace(/color:\s*white;/g, 'color: #111111; font-weight: 700;');
});

appCss = appCss.replace(/\.scroll-btn\s*\{[^}]*\}/g, (match) => {
  return match.replace(/color:\s*white;/g, 'color: #111111;');
});

// Replace radial gradients in App.css body
appCss = appCss.replace(/rgba\(59, 130, 246/g, 'rgba(255, 255, 255');
appCss = appCss.replace(/rgba\(96, 165, 250/g, 'rgba(200, 200, 200');

fs.writeFileSync(cssPath, appCss, 'utf8');


// 2. Update components.css
let compCss = fs.readFileSync(componentsCssPath, 'utf8');
compCss = compCss.replace(/rgba\(59, 130, 246/g, 'rgba(255, 255, 255');
compCss = compCss.replace(/rgba\(96, 165, 250/g, 'rgba(200, 200, 200');
// Replace exact hex colors that might be hardcoded
compCss = compCss.replace(/#3b82f6/g, '#ffffff');
compCss = compCss.replace(/#60a5fa/g, '#a3a3a3');
fs.writeFileSync(componentsCssPath, compCss, 'utf8');


// 3. Update Background3D.js
let bgJs = fs.readFileSync(bgPath, 'utf8');
bgJs = bgJs.replace(/rgba\(0, 200, 83/g, 'rgba(255, 255, 255');
bgJs = bgJs.replace(/rgba\(105, 240, 174/g, 'rgba(200, 200, 200');
fs.writeFileSync(bgPath, bgJs, 'utf8');

console.log('Premium Charcoal & White theme applied successfully!');
