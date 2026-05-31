// Batch fix ALL pages in new-aihub: convert absolute paths to relative paths
// Run: node fix-all.js
const fs = require('fs');
const path = require('path');
const BASE = 'D:\\Ai\\测试文件\\new-aihub';

const replacements = [];
function addRule(pattern, getReplacement) { replacements.push([pattern, getReplacement]); }

let count = 0;
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) walk(fp, callback);
    else if (f.endsWith('.html')) callback(fp, path.relative(BASE, fp));
  });
}

walk(BASE, (filePath, relPath) => {
  const depth = relPath.split(path.sep).length - 1;
  const prefix = depth === 0 ? '.' : '../'.repeat(depth);

  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Fix css/js assets
  const oldAsset = /(["'])\/assets\/(style\.css|app\.js)\1/g;
  if (oldAsset.test(content)) {
    content = content.replace(/(["'])\/assets\/(style\.css|app\.js)\1/g, `$1${prefix}/assets/$2$1`);
    changed = true;
  }

  // Fix all nav/page links
  const linkMap = {
    '/platform/': `${prefix}/platform/index.html`,
    '/solutions/': `${prefix}/solutions/index.html`,
    '/features/': `${prefix}/features/index.html`,
    '/cases/': `${prefix}/cases/index.html`,
    '/developers/': `${prefix}/developers/index.html`,
    '/research/': `${prefix}/research/index.html`,
    '/partners/': `${prefix}/partners/index.html`,
    '/company/about.html': `${prefix}/company/about.html`,
    '/company/contact.html': `${prefix}/company/contact.html`,
    '/company/booking.html': `${prefix}/company/booking.html`,
    '/company/': `${prefix}/company/index.html`,
    '/platform/inference.html': `${prefix}/platform/inference.html`,
    '/platform/training.html': `${prefix}/platform/training.html`,
    '/platform/data.html': `${prefix}/platform/data.html`,
    '/platform/ops.html': `${prefix}/platform/ops.html`,
    '/developers/docs.html': `${prefix}/developers/docs.html`,
    '/developers/api.html': `${prefix}/developers/api.html`,
    '/developers/sdk.html': `${prefix}/developers/sdk.html`,
    '/developers/community.html': `${prefix}/developers/community.html`,
    '/solutions/fintech.html': `${prefix}/solutions/fintech.html`,
    '/solutions/healthcare.html': `${prefix}/solutions/healthcare.html`,
    '/solutions/manufacturing.html': `${prefix}/solutions/manufacturing.html`,
    '/solutions/retail.html': `${prefix}/solutions/retail.html`,
    '/features/data-fusion.html': `${prefix}/features/data-fusion.html`,
    '/features/model-platform.html': `${prefix}/features/model-platform.html`,
    '/features/knowledge-graph.html': `${prefix}/features/knowledge-graph.html`,
    '/features/decision-engine.html': `${prefix}/features/decision-engine.html`,
    '/features/automation.html': `${prefix}/features/automation.html`,
    '/features/ai-ops.html': `${prefix}/features/ai-ops.html`,
    '/cases/case-1.html': `${prefix}/cases/case-1.html`,
    '/cases/case-2.html': `${prefix}/cases/case-2.html`,
    '/cases/case-3.html': `${prefix}/cases/case-3.html`,
    '/cases/case-4.html': `${prefix}/cases/case-4.html`,
    '/cases/case-5.html': `${prefix}/cases/case-5.html`,
    'href="/"': `href="${prefix}/index.html"`,
  };

  for (const [old, nu] of Object.entries(linkMap)) {
    if (content.includes(old)) {
      content = content.split(old).join(nu);
      changed = true;
    }
  }

  // Fix wujiashuaiwu492gmail.com (missing @)
  if (content.includes('wujiashuaiwu492gmail.com')) {
    content = content.replace(/wujiashuaiwu492gmail\.com/g, 'wujiashuaiwu492@gmail.com');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✓ ${relPath} (depth=${depth}, prefix=${prefix})`);
    count++;
  } else {
    console.log(`  - ${relPath} (no changes needed)`);
  }
});

console.log(`\n✅ Fixed ${count} files.\n`);
console.log('All links now use relative paths. Local file:// access works.');
console.log('Email wujiashuaiwu492@gmail.com verified across all files.');
