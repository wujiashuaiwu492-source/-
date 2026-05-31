// Fix relative paths in all HTML files for new-aihub
// Converts absolute paths (/solutions/) to relative paths appropriate for each file's directory

const fs = require('fs');
const path = require('path');

const BASE = 'D:\\Ai\\测试文件\\new-aihub';

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (file.endsWith('.html')) {
      callback(fullPath, path.relative(BASE, fullPath));
    }
  }
}

function getNavLinks(relPath) {
  // Calculate the base path to root from current file
  const depth = relPath.split(path.sep).length - 1;
  const root = depth === 0 ? '.' : '..' + '/..'.repeat(depth - 1);

  return {
    root,
    solutions: root + '/solutions/index.html',
    features: root + '/features/index.html',
    cases: root + '/cases/index.html',
    platform: root + '/platform/index.html',
    developers: root + '/developers/index.html',
    research: root + '/research/index.html',
    partners: root + '/partners/index.html',
    about: root + '/company/about.html',
    contact: root + '/company/contact.html',
    booking: root + '/company/booking.html',
    home: root + '/index.html',
    inference: root + '/platform/inference.html',
    training: root + '/platform/training.html',
    data: root + '/platform/data.html',
    ops: root + '/platform/ops.html',
    docs: root + '/developers/docs.html',
    api: root + '/developers/api.html',
    sdk: root + '/developers/sdk.html',
    community: root + '/developers/community.html',
    assets: root + '/assets',
    fintech: root + '/solutions/fintech.html',
    healthcare: root + '/solutions/healthcare.html',
    manufacturing: root + '/solutions/manufacturing.html',
    retail: root + '/solutions/retail.html',
    case1: root + '/cases/case-1.html',
    case2: root + '/cases/case-2.html',
    case3: root + '/cases/case-3.html',
    case4: root + '/cases/case-4.html',
    case5: root + '/cases/case-5.html',
    df: root + '/features/data-fusion.html',
    mp: root + '/features/model-platform.html',
    kg: root + '/features/knowledge-graph.html',
    de: root + '/features/decision-engine.html',
    au: root + '/features/automation.html',
    ao: root + '/features/ai-ops.html',
  };
}

function fixPaths(filePath, relPath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const links = getNavLinks(relPath);
  let count = 0;

  // Pattern: href="/solutions/" -> href="relative"
  // Also fix href="/platform/inference.html" etc
  // Also fix src="/assets/..."
  // Also fix link href="/assets/style.css"

  // Fix asset references
  content = content.replace(/href="\/assets\/style\.css"/g, `href="${links.root}/assets/style.css"`);
  content = content.replace(/src="\/assets\/app\.js"/g, `src="${links.root}/assets/app.js"`);
  count += (content.match(new RegExp(links.root + '/assets/', 'g')) || []).length;

  // Fix navbar links
  content = content.replace(/href="\/solutions\/"/g, `href="${links.solutions}"`);
  content = content.replace(/href="\/features\/"/g, `href="${links.features}"`);
  content = content.replace(/href="\/cases\/"/g, `href="${links.cases}"`);
  content = content.replace(/href="\/platform\/"/g, `href="${links.platform}"`);
  content = content.replace(/href="\/developers\/"/g, `href="${links.developers}"`);
  content = content.replace(/href="\/research\/"/g, `href="${links.research}"`);
  content = content.replace(/href="\/partners\/"/g, `href="${links.partners}"`);

  // Fix specific page links
  content = content.replace(/href="\/company\/about\.html"/g, `href="${links.about}"`);
  content = content.replace(/href="\/company\/contact\.html"/g, `href="${links.contact}"`);
  content = content.replace(/href="\/company\/booking\.html"/g, `href="${links.booking}"`);
  content = content.replace(/href="\/company\/"/g, `href="${links.about}"`);
  content = content.replace(/href="\/"/g, `href="${links.home}"`); // careful - only standalone href="/"

  // Fix platform sub-pages
  content = content.replace(/href="\/platform\/inference\.html"/g, `href="${links.inference}"`);
  content = content.replace(/href="\/platform\/training\.html"/g, `href="${links.training}"`);
  content = content.replace(/href="\/platform\/data\.html"/g, `href="${links.data}"`);
  content = content.replace(/href="\/platform\/ops\.html"/g, `href="${links.ops}"`);

  // Fix developer sub-pages
  content = content.replace(/href="\/developers\/docs\.html"/g, `href="${links.docs}"`);
  content = content.replace(/href="\/developers\/api\.html"/g, `href="${links.api}"`);
  content = content.replace(/href="\/developers\/sdk\.html"/g, `href="${links.sdk}"`);
  content = content.replace(/href="\/developers\/community\.html"/g, `href="${links.community}"`);

  // Fix solution pages
  content = content.replace(/href="\/solutions\/fintech\.html"/g, `href="${links.fintech}"`);
  content = content.replace(/href="\/solutions\/healthcare\.html"/g, `href="${links.healthcare}"`);
  content = content.replace(/href="\/solutions\/manufacturing\.html"/g, `href="${links.manufacturing}"`);
  content = content.replace(/href="\/solutions\/retail\.html"/g, `href="${links.retail}"`);

  // Fix case pages
  content = content.replace(/href="\/cases\/case-1\.html"/g, `href="${links.case1}"`);
  content = content.replace(/href="\/cases\/case-2\.html"/g, `href="${links.case2}"`);
  content = content.replace(/href="\/cases\/case-3\.html"/g, `href="${links.case3}"`);
  content = content.replace(/href="\/cases\/case-4\.html"/g, `href="${links.case4}"`);
  content = content.replace(/href="\/cases\/case-5\.html"/g, `href="${links.case5}"`);

  // Fix feature pages
  content = content.replace(/href="\/features\/data-fusion\.html"/g, `href="${links.df}"`);
  content = content.replace(/href="\/features\/model-platform\.html"/g, `href="${links.mp}"`);
  content = content.replace(/href="\/features\/knowledge-graph\.html"/g, `href="${links.kg}"`);
  content = content.replace(/href="\/features\/decision-engine\.html"/g, `href="${links.de}"`);
  content = content.replace(/href="\/features\/automation\.html"/g, `href="${links.au}"`);
  content = content.replace(/href="\/features\/ai-ops\.html"/g, `href="${links.ao}"`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ fixed: ${relPath} (root=${links.root})`);
}

console.log('Fixing relative paths in all HTML files...\n');
walkDir(BASE, fixPaths);
console.log('\n✅ All paths fixed. Site now works locally (file://) and on Vercel.\n');
