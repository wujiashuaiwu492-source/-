/*
  NovaMind AI — Enterprise Site Generator for new.aihub.luxe
  Big-company style with enhanced navigation hierarchy
  Usage: node build.js
*/

const fs = require('fs');
const path = require('path');

const BASE = 'D:\\Ai\\测试文件\\new-aihub';
const dirs = ['', 'features', 'solutions', 'cases', 'company', 'platform', 'developers', 'research', 'partners', 'assets'];
dirs.forEach(d => {
  const p = path.join(BASE, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// ── Site Identity ───────────────────────────────────────────────────
const BRAND = 'NovaMind';
const DOMAIN = 'new.aihub.luxe';
const PARENT = 'aihub.luxe';
const EMAIL = 'wujiashuaiwu492@gmail.com';
const YEAR = '2026';

// ── SEO & Meta ──────────────────────────────────────────────────────
const seoMeta = (title, desc, keywords) => `
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="${keywords||'AI,NovaMind,企业人工智能,大模型,智能决策'}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="${BRAND} AI" />
  <meta name="theme-color" content="#0a0f18" />
  <link rel="canonical" href="https://${DOMAIN}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://${DOMAIN}" />
  <meta property="og:locale" content="zh_CN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />`;

// ── Shared DOM Components ───────────────────────────────────────────
const head = (title, desc='', extra='') => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | ${BRAND}</title>
  ${seoMeta(title, desc||title)}
  ${extra}
  <link rel="stylesheet" href="/assets/style.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'nv-deep':  '#0a0f18',
            'nv-dark':  '#111827',
            'nv-card':  '#1a2332',
            'nv-hover': '#1f2d3d',
            'nv-cyan':  '#00d4aa',
            'nv-blue':  '#3b82f6',
            'nv-purple':'#8b5cf6',
            'nv-muted': '#64748b',
          }
        }
      }
    }
  </script>
  <script src="/assets/app.js" defer></script>
</head>
<body class="bg-nv-deep text-slate-300 antialiased font-sans">`;

const toast = '<div id="toast" class="toast"></div>';

const navbar = (active='home') => `
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500"
     style="background:rgba(10,15,24,0.88);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-color:rgba(255,255,255,0.06)">
  <div class="max-w-[1340px] mx-auto flex items-center justify-between h-[60px] px-6">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2.5 shrink-0">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#00d4aa" stroke-width="2"/><path d="M9 21 L16 9 L23 21" stroke="#00d4aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="9" r="2.5" fill="#00d4aa"/></svg>
      <span class="text-[15px] font-bold text-white tracking-tight">${BRAND}</span>
    </a>
    <!-- Desktop Nav -->
    <div class="hidden lg:flex items-center gap-0.5">
      ${[
        {href:'/platform/',label:'平台',active:'platform'},
        {href:'/solutions/',label:'解决方案',active:'solutions'},
        {href:'/features/',label:'产品',active:'features'},
        {href:'/cases/',label:'案例',active:'cases'},
        {href:'/developers/',label:'开发者',active:'developers'},
        {href:'/research/',label:'研究',active:'research'},
        {href:'/partners/',label:'合作伙伴',active:'partners'},
        {href:'/company/about.html',label:'关于',active:'about'}
      ].map(l => `
        <a href="${l.href}" class="px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-300 relative ${active===l.active?'text-nv-cyan':'text-slate-400 hover:text-white'}">
          ${l.label}<span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-nv-cyan transition-transform duration-300 ${active===l.active?'scale-100':'scale-0'}"></span>
        </a>`).join('')}
        <a href="/company/contact.html" class="ml-2 px-4 py-1.5 text-[13px] font-semibold text-nv-deep bg-nv-cyan hover:bg-[#00e8bc] hover:shadow-[0_0_20px_rgba(0,212,170,0.2)] rounded-md transition-all duration-300 hover:-translate-y-0.5">联系我们</a>
    </div>
    <!-- Mobile -->
    <button id="hamburger" class="lg:hidden flex flex-col gap-1 p-2 cursor-pointer z-50 bg-transparent border-none" aria-label="菜单">
      <span class="block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300"></span>
      <span class="block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300"></span>
      <span class="block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300"></span>
    </button>
  </div>
  <div id="mobileMenu" class="lg:hidden overflow-hidden" style="max-height:0;transition:max-height 0.4s ease;background:rgba(10,15,24,0.96)">
    <div class="flex flex-col gap-0.5 px-4 pb-4">
      ${['平台','解决方案','产品','案例','开发者','研究','合作伙伴','关于'].map((l,i) => {
        const hrefs = ['/platform/','/solutions/','/features/','/cases/','/developers/','/research/','/partners/','/company/about.html'];
        return `<a href="${hrefs[i]}" class="px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/[0.03] rounded-md transition-all duration-300">${l}</a>`;
      }).join('')}
      <a href="/company/contact.html" class="mt-2 mx-2 px-4 py-2.5 text-sm font-semibold text-nv-deep bg-nv-cyan hover:bg-[#00e8bc] rounded-md text-center transition-all duration-300">联系我们</a>
    </div>
  </div>
</nav>`;

const footer = () => `
<footer class="border-t" style="background:#080c14;border-color:rgba(255,255,255,0.05)">
  <div class="max-w-[1340px] mx-auto px-6 py-16">
    <!-- Top row -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
      <div class="col-span-2">
        <div class="flex items-center gap-2.5 mb-4">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#00d4aa" stroke-width="2"/><path d="M9 21 L16 9 L23 21" stroke="#00d4aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="text-base font-bold text-white">${BRAND}</span>
        </div>
        <p class="text-sm text-slate-500 max-w-[260px] leading-relaxed mb-5">企业级人工智能基础设施与解决方案提供商。</p>
        <div class="flex gap-2.5">
          ${['✉','in','𝕏','GH'].map(i => `<a href="${i==='✉'?'mailto:'+EMAIL:'#'}" class="w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-xs text-slate-500 transition-all duration-300 hover:bg-nv-cyan/10 hover:border-nv-cyan/30 hover:text-nv-cyan hover:scale-110">${i}</a>`).join('')}
        </div>
      </div>
      ${[
        {col:'平台',links:[{l:'AI推理引擎',h:'/platform/inference.html'},{l:'模型训练平台',h:'/platform/training.html'},{l:'数据管理',h:'/platform/data.html'},{l:'监控运维',h:'/platform/ops.html'}]},
        {col:'解决方案',links:[{l:'金融',h:'/solutions/fintech.html'},{l:'医疗',h:'/solutions/healthcare.html'},{l:'制造',h:'/solutions/manufacturing.html'},{l:'零售',h:'/solutions/retail.html'}]},
        {col:'开发者',links:[{l:'文档中心',h:'/developers/docs.html'},{l:'API 参考',h:'/developers/api.html'},{l:'SDK 下载',h:'/developers/sdk.html'},{l:'社区论坛',h:'/developers/community.html'}]},
        {col:'公司',links:[{l:'关于我们',h:'/company/about.html'},{l:'研究',h:'/research/'},{l:'合作伙伴',h:'/partners/'},{l:'联系合作',h:'mailto:'+EMAIL}]}
      ].map(c => `
      <div>
        <h4 class="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">${c.col}</h4>
        <div class="flex flex-col gap-2.5">
          ${c.links.map(l => `<a href="${l.h}" class="text-sm text-slate-500 transition-all duration-300 hover:text-nv-cyan relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-nv-cyan after:transition-all hover:after:w-full">${l.l}</a>`).join('')}
        </div>
      </div>`).join('')}
    </div>
    <!-- Bottom -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t text-sm text-slate-600" style="border-color:rgba(255,255,255,0.05)">
      <span>&copy; ${YEAR} ${BRAND}. All rights reserved.</span>
      <div class="flex items-center gap-4">
        <a href="mailto:${EMAIL}" class="text-nv-cyan hover:underline text-xs">${EMAIL}</a>
        <span class="text-slate-700">|</span>
        <a href="https://${PARENT}" class="hover:text-nv-cyan transition text-xs" target="_blank">${PARENT}</a>
      </div>
    </div>
  </div>
</footer>`;

const ctaSection = (title='准备开始了吗？', desc='预约产品演示，我们的专家将在24小时内与您联系。') => `
<section class="py-20">
  <div class="max-w-[1340px] mx-auto px-6">
    <div class="rounded-2xl p-12 sm:p-16 text-center relative overflow-hidden" style="background:linear-gradient(135deg,rgba(0,212,170,0.08),rgba(59,130,246,0.06));border:1px solid rgba(255,255,255,0.05)">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(0,212,170,0.04),transparent)"></div>
      <h2 class="text-2xl sm:text-3xl font-semibold text-white mb-3 relative">${title}</h2>
      <p class="text-slate-400 mb-8 max-w-lg mx-auto relative">${desc}</p>
      <div class="flex flex-wrap justify-center gap-4 relative">
        <a href="/company/booking.html" class="inline-flex items-center gap-2 bg-nv-cyan text-nv-deep font-semibold px-8 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.2)] hover:-translate-y-1">预约演示 →</a>
        <a href="/company/contact.html" class="inline-flex items-center gap-2 bg-transparent text-white font-medium px-8 py-3 rounded-lg text-sm border transition-all duration-300 hover:border-nv-cyan/40 hover:bg-white/[0.02]" style="border-color:rgba(255,255,255,0.1)">联系我们</a>
      </div>
    </div>
  </div>
</section>`;

const breadcrumb = (...crumbs) => {
  let html = '<div class="max-w-[1340px] mx-auto px-6 pt-24 pb-1 text-xs text-slate-500">';
  html += '<a href="/" class="hover:text-nv-cyan transition">首页</a>';
  for (let i = 0; i < crumbs.length; i++) {
    html += ' <span class="text-slate-700">/</span> ';
    if (i === crumbs.length - 1) {
      html += `<span class="text-nv-cyan">${crumbs[i]}</span>`;
    } else {
      html += `<a href="${crumbs[i+1]||'#'}" class="hover:text-nv-cyan transition">${crumbs[i]}</a>`;
      i++; // skip href
    }
  }
  html += '</div>';
  return html;
};

const pageHero = (title, subtitle, label='') => `
<section class="pt-28 pb-16 text-center">
  <div class="max-w-[1340px] mx-auto px-6">
    ${label?`<span class="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-nv-cyan mb-3">${label}</span>`:''}
    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">${title}</h1>
    ${subtitle?`<p class="text-base sm:text-lg text-slate-400 max-w-[640px] mx-auto leading-relaxed">${subtitle}</p>`:''}
  </div>
</section>`;

const write = (relPath, content) => {
  const p = path.join(BASE, relPath);
  fs.writeFileSync(p, content, 'utf-8');
  console.log('  ✓', relPath);
};

// ═══════════════════════════════════════════════════════════════════════
//  1. HOME PAGE — Enterprise-scale landing
// ═══════════════════════════════════════════════════════════════════════

write('index.html', head(`${BRAND} — 企业级AI基础设施平台`, 'NovaMind 为企业提供从模型训练到推理部署、从数据管理到智能决策的全栈AI平台。') + navbar('home') + toast + `

<!-- HERO -->
<section class="relative min-h-screen flex items-center overflow-hidden" style="background:#0a0f18;padding-top:60px">
  <canvas id="heroCanvas"></canvas>
  <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 50% 50% at 30% 50%,rgba(0,212,170,0.07),transparent 60%),radial-gradient(ellipse 30% 40% at 70% 30%,rgba(59,130,246,0.05),transparent 60%),radial-gradient(ellipse 40% 50% at 50% 80%,rgba(139,92,246,0.03),transparent 60%)"></div>
  <div class="relative z-10 max-w-[1340px] mx-auto px-6 w-full py-16 lg:py-0">
    <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-nv-cyan mb-8 border" style="background:rgba(0,212,170,0.06);border-color:rgba(0,212,170,0.15)">
          <span class="w-1.5 h-1.5 rounded-full bg-nv-cyan animate-pulse"></span>新一代企业AI平台
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5">
          构建企业级<br/>
          <span class="bg-gradient-to-r from-nv-cyan via-nv-blue to-nv-purple bg-clip-text text-transparent" id="heroTypewriter">AI 基础设施</span>
          <span id="heroCursor" class="inline-block w-0.5 h-[0.8em] bg-nv-cyan ml-0.5 align-middle animate-pulse"></span>
        </h1>
        <p class="text-base sm:text-lg text-slate-400 max-w-[520px] mb-8 leading-relaxed">${BRAND} 为企业提供从模型训练、推理部署到数据管理、智能决策的全栈 AI 平台。已服务全球 500+ 企业客户，日均处理超百亿级推理请求。</p>
        <div class="flex flex-wrap gap-3">
          <a href="/company/booking.html" class="inline-flex items-center gap-2 bg-nv-cyan text-nv-deep font-semibold px-7 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.2)] hover:-translate-y-1">免费试用 →</a>
          <a href="/platform/" class="inline-flex items-center gap-2 bg-transparent text-white font-medium px-7 py-3 rounded-lg text-sm border transition-all duration-300 hover:border-nv-cyan/40 hover:bg-white/[0.02]" style="border-color:rgba(255,255,255,0.12)">探索平台</a>
          <a href="/developers/docs.html" class="inline-flex items-center gap-2 bg-transparent text-slate-400 font-medium px-7 py-3 rounded-lg text-sm border transition-all duration-300 hover:border-white/20 hover:text-white" style="border-color:rgba(255,255,255,0.08)">开发者文档</a>
        </div>
        <!-- Stats Row -->
        <div class="grid grid-cols-4 gap-6 mt-14 pt-10 border-t" style="border-color:rgba(255,255,255,0.05)">
          ${[{v:'500+',l:'企业客户'},{v:'99.99%',l:'平台可用性'},{v:'<30ms',l:'推理延迟'},{v:'全球部署',l:'3大区域'}].map(s => `
          <div class="stat-item text-center">
            <span class="block text-xl sm:text-2xl font-bold text-white stat-num stat-simple">${s.v}</span>
            <span class="block text-[11px] text-slate-500 mt-1">${s.l}</span>
          </div>`).join('')}
        </div>
      </div>
      <!-- Hero Visual -->
      <div class="hidden lg:flex items-center justify-center">
        <div class="relative w-full max-w-[440px] aspect-square">
          <div class="absolute inset-0 rounded-full border opacity-[0.04]" style="border-color:rgba(0,212,170,0.5)"></div>
          <div class="absolute inset-[15%] rounded-full border opacity-[0.06]" style="border-color:rgba(59,130,246,0.5)"></div>
          <div class="absolute inset-[30%] rounded-full border opacity-[0.08]" style="border-color:rgba(139,92,246,0.5)"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm" style="background:radial-gradient(circle at 30% 30%,rgba(0,212,170,0.2),rgba(0,212,170,0.03));border:1px solid rgba(0,212,170,0.15)">✦</div>
          </div>
          <!-- Floating dots -->
          <div class="absolute top-[5%] left-[50%] w-2 h-2 rounded-full bg-nv-cyan shadow-[0_0_12px_rgba(0,212,170,0.4)] animate-pulse"></div>
          <div class="absolute top-[30%] right-[8%] w-2 h-2 rounded-full bg-nv-blue shadow-[0_0_12px_rgba(59,130,246,0.4)] animate-pulse" style="animation-delay:0.5s"></div>
          <div class="absolute bottom-[20%] left-[12%] w-2 h-2 rounded-full bg-nv-purple shadow-[0_0_12px_rgba(139,92,246,0.4)] animate-pulse" style="animation-delay:1s"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PLATFORM OVERVIEW -->
<section class="py-20" style="background:#0c111a">
  <div class="max-w-[1340px] mx-auto px-6">
    <div class="text-center mb-14">
      <span class="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-nv-cyan mb-3">平台概览</span>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">一体化 AI 平台</h2>
      <p class="text-slate-400 max-w-[560px] mx-auto text-sm">覆盖从数据处理到模型部署的完整 AI 生命周期</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      ${[
        {icon:'◈',t:'模型训练',d:'分布式训练集群，支持千亿参数模型',h:'/platform/training.html'},
        {icon:'◇',t:'推理服务',d:'毫秒级实时推理，弹性自动伸缩',h:'/platform/inference.html'},
        {icon:'○',t:'数据引擎',d:'多源数据融合，自动化特征工程',h:'/features/data-fusion.html'},
        {icon:'△',t:'监控运维',d:'全链路可观测，智能告警自愈',h:'/platform/ops.html'}
      ].map((p,i) => `
      <a href="${p.h}" class="group relative rounded-xl p-6 sm:p-8 transition-all duration-400 overflow-hidden cursor-pointer hover:-translate-y-1.5" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
        <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-nv-cyan to-nv-blue opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 transition-all duration-400 group-hover:scale-110" style="background:rgba(0,212,170,0.08);color:#00d4aa">${p.icon}</div>
        <h3 class="text-sm font-semibold text-white mb-1.5 transition-all duration-400 group-hover:text-nv-cyan">${p.t}</h3>
        <p class="text-xs text-slate-500 leading-relaxed transition-all duration-400 group-hover:text-slate-400">${p.d}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- SOLUTIONS SNAPSHOT -->
<section class="py-20" style="background:#0a0f18">
  <div class="max-w-[1340px] mx-auto px-6">
    <div class="text-center mb-14">
      <span class="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-nv-cyan mb-3">行业方案</span>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">深耕四大行业</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${[{icon:'₿',t:'金融',d:'智能风控与合规',h:'/solutions/fintech.html'},{icon:'⚕',t:'医疗',d:'影像AI辅助诊断',h:'/solutions/healthcare.html'},{icon:'⚙',t:'制造',d:'工业视觉质检',h:'/solutions/manufacturing.html'},{icon:'🛒',t:'零售',d:'智慧供应链优化',h:'/solutions/retail.html'}].map((s,i) => `
      <a href="${s.h}" class="group rounded-xl p-6 text-center transition-all duration-400 cursor-pointer hover:-translate-y-1.5" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl transition-all duration-400 group-hover:scale-110" style="background:rgba(0,212,170,0.06)">${s.icon}</div>
        <h3 class="text-sm font-semibold text-white mb-1 transition-all duration-400 group-hover:text-nv-cyan">${s.t}</h3>
        <p class="text-xs text-slate-500">${s.d}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- CASE STUDIES -->
<section class="py-20" style="background:#0c111a">
  <div class="max-w-[1340px] mx-auto px-6">
    <div class="text-center mb-14">
      <span class="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-nv-cyan mb-3">客户案例</span>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">行业标杆，实效见证</h2>
    </div>
    <div class="relative overflow-hidden -mx-2" id="casesCarousel">
      <div id="casesTrack" style="display:flex;transition:transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);gap:1rem">
        ${[
          {q:'NovaMind智能风控系统让欺诈损失下降了67%，响应从秒级到毫秒级。',n:'陈明远',r:'风控总监 · 兴业金融',i:'陈',res:'欺诈损失 ↓67%',h:'/cases/case-1.html'},
          {q:'医疗影像AI将阅片效率提升4倍，早期病变检出率提高35%。',n:'李文静',r:'副院长 · 仁和医疗集团',i:'李',res:'阅片效率 ↑4×',h:'/cases/case-2.html'},
          {q:'工业质检漏检率从3.2%降至0.08%，年节约800万元。',n:'王建国',r:'生产总监 · 精工智造',i:'王',res:'漏检率 ↓97%',h:'/cases/case-3.html'},
          {q:'供应链AI让库存周转缩短40%，缺货率降低52%。',n:'张雅婷',r:'供应链VP · 悦享零售',i:'张',res:'周转率 ↑40%',h:'/cases/case-4.html'},
          {q:'知识图谱将跨部门查询从数天缩短到分钟级。',n:'赵思远',r:'CIO · 华远集团',i:'赵',res:'效率 ↑12×',h:'/cases/case-5.html'}
        ].map(c => `
        <a href="${c.h}" class="min-w-[calc(33.333%-0.67rem)] lg:min-w-[calc(25%-0.75rem)] flex-shrink-0 rounded-xl p-6 sm:p-8 flex flex-col transition-all duration-400 group hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
          <p class="text-sm text-slate-400 leading-relaxed flex-1 mb-6 italic"><span class="block text-2xl text-nv-cyan font-bold not-italic mb-1 group-hover:scale-110 transition-transform">"</span>${c.q}</p>
          <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-semibold text-xs text-nv-deep shrink-0">${c.i}</div><div><span class="block text-sm font-semibold text-white">${c.n}</span><span class="block text-[11px] text-slate-500">${c.r}</span></div></div>
          <div class="mt-4 text-xs font-semibold text-nv-cyan group-hover:text-[#00e8bc] transition-colors">${c.res}</div>
        </a>`).join('')}
      </div>
    </div>
    <div class="flex justify-center items-center gap-3 mt-8">
      <button id="casePrev" class="w-9 h-9 rounded-full border flex items-center justify-center text-slate-500 transition-all duration-300 hover:border-nv-cyan hover:text-nv-cyan cursor-pointer" style="border-color:rgba(255,255,255,0.08);background:#111827">‹</button>
      <div class="flex items-center gap-1.5" id="caseDots"></div>
      <button id="caseNext" class="w-9 h-9 rounded-full border flex items-center justify-center text-slate-500 transition-all duration-300 hover:border-nv-cyan hover:text-nv-cyan cursor-pointer" style="border-color:rgba(255,255,255,0.08);background:#111827">›</button>
    </div>
  </div>
</section>

<!-- TECH NUMBERS -->
<section class="py-20" style="background:#0a0f18">
  <div class="max-w-[1340px] mx-auto px-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${[{v:'99.99%',l:'平台可用性',d:'多活架构，金融级 SLA 保障'},{v:'<30ms',l:'推理延迟',d:'端到端实时响应'},{v:'100B+',l:'日处理 Token',d:'支撑海量业务并发'},{v:'SOC2',l:'安全合规',d:'国际权威安全审计认证'}].map(t => `
      <div class="rounded-xl p-6 sm:p-8 text-center group transition-all duration-400 hover:-translate-y-1" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
        <div class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-nv-cyan to-nv-blue bg-clip-text text-transparent mb-2">${t.v}</div>
        <div class="text-sm font-semibold text-white mb-1">${t.l}</div>
        <div class="text-xs text-slate-500">${t.d}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

${ctaSection()}

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function(){
  const canvas=document.getElementById('heroCanvas');if(!canvas)return;
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(60,canvas.clientWidth/canvas.clientHeight,0.1,1000);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setSize(canvas.clientWidth,canvas.clientHeight);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  const nodes=[];const N=150;
  for(let i=0;i<N;i++){const r=5+Math.random()*12,theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);nodes.push({x:r*Math.sin(phi)*Math.cos(theta),y:r*Math.sin(phi)*Math.sin(theta),z:r*Math.cos(phi),vx:(Math.random()-0.5)*0.003,vy:(Math.random()-0.5)*0.003,vz:(Math.random()-0.5)*0.003})}
  const pos=new Float32Array(N*3);const nodeGeo=new THREE.BufferGeometry();nodeGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const nodeMat=new THREE.PointsMaterial({size:0.1,color:0x00d4aa,transparent:true,opacity:0.7,blending:THREE.AdditiveBlending,sizeAttenuation:true});
  const nodeMesh=new THREE.Points(nodeGeo,nodeMat);scene.add(nodeMesh);
  const edgeMat=new THREE.LineBasicMaterial({color:0x00d4aa,transparent:true,opacity:0.06,blending:THREE.AdditiveBlending});
  let edgeMesh=new THREE.LineSegments(new THREE.BufferGeometry(),edgeMat);scene.add(edgeMesh);
  function ue(){const pairs=[];for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,dz=nodes[i].z-nodes[j].z;if(Math.sqrt(dx*dx+dy*dy+dz*dz)<3.5)pairs.push([i,j])}const v=[];for(const[i,j]of pairs){v.push(nodes[i].x,nodes[i].y,nodes[i].z,nodes[j].x,nodes[j].y,nodes[j].z)}if(!v.length){edgeMesh.visible=false;return}edgeMesh.visible=true;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));edgeMesh.geometry.dispose();edgeMesh.geometry=g}
  ue();camera.position.set(0,1,18);camera.lookAt(0,0,0);
  let mx=0,my=0,t=0;document.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-0.5)*2;my=(e.clientY/window.innerHeight-0.5)*2});
  function an(){requestAnimationFrame(an);t+=0.003;for(const n of nodes){n.x+=n.vx;n.y+=n.vy;n.z+=n.vz;const r=Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z);if(r>14||r<3){n.vx*=-1;n.vy*=-1;n.vz*=-1}}const p=nodeMesh.geometry.attributes.position.array;for(let i=0;i<N;i++){p[i*3]=nodes[i].x;p[i*3+1]=nodes[i].y;p[i*3+2]=nodes[i].z}nodeMesh.geometry.attributes.position.needsUpdate=true;ue();nodeMesh.rotation.y+=0.0005;nodeMesh.rotation.x=Math.sin(t*0.2)*0.04+my*0.025;nodeMesh.rotation.z=Math.cos(t*0.15)*0.03+mx*0.02;renderer.render(scene,camera)}an();
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()},200)});
})();
// Typewriter
(function(){const t=document.getElementById('heroTypewriter'),c=document.getElementById('heroCursor');if(!t)return;const txt=t.textContent;t.textContent='';let i=0;const ti=setInterval(()=>{t.textContent+=txt[i];i++;if(i>=txt.length){clearInterval(ti);c.style.display='none'}},100)})();
// Case carousel
(function(){const tr=document.getElementById('casesTrack'),d=document.getElementById('caseDots'),p=document.getElementById('casePrev'),n=document.getElementById('caseNext');if(!tr)return;const cards=tr.children;let idx=0,auto;function gv(){return window.innerWidth<768?1:window.innerWidth<1024?2:3}function tot(){return Math.max(0,cards.length-gv())}function rn(){const m=tot();if(idx>m)idx=m;tr.style.transform='translateX('+(-idx*(100/gv()))+'%)';d.innerHTML='';for(let i=0;i<=m;i++){const s=document.createElement('span');s.className='w-2 h-2 rounded-full cursor-pointer transition-all duration-300 '+(i===idx?'bg-nv-cyan w-6 !rounded':'bg-slate-700');s.addEventListener('click',()=>{idx=i;rn()});d.appendChild(s)}}p.addEventListener('click',()=>{idx=Math.max(0,idx-1);rn()});n.addEventListener('click',()=>{idx=Math.min(tot(),idx+1);rn()});function sa(){auto=setInterval(()=>{idx=(idx>=tot()?0:idx+1);rn()},5000)}sa();document.getElementById('casesCarousel').addEventListener('mouseenter',()=>clearInterval(auto));document.getElementById('casesCarousel').addEventListener('mouseleave',sa);window.addEventListener('resize',rn);rn()})();
</script>
` + footer());

// ═══════════════════════════════════════════════════════════════════════
//  2-5. PLATFORM PAGES
// ═══════════════════════════════════════════════════════════════════════

const platformPages = [
  {file:'platform/index.html',title:'AI 平台',sub:'企业级人工智能基础设施 — 从训练到推理的全栈解决方案',desc:'一站式 AI 平台，覆盖模型训练、推理服务、数据管理与监控运维全生命周期。'},
  {file:'platform/inference.html',title:'推理服务',sub:'企业级模型推理引擎 — 毫秒级延迟，弹性自动伸缩',desc:'高性能模型推理服务，支持主流模型格式，提供实时与批量推理能力。日均处理100亿+ Token，端到端延迟低于30ms。'},
  {file:'platform/training.html',title:'模型训练',sub:'分布式训练平台 — 支持千亿参数模型高效训练',desc:'基于自研分布式训练框架，支持数据并行、模型并行与流水线并行。兼容 PyTorch、TensorFlow 等主流框架。'},
  {file:'platform/data.html',title:'数据管理',sub:'多源异构数据融合引擎 — 让数据即刻为AI所用',desc:'支持500+数据源连接器，自动化数据清洗与特征工程。流批一体架构，实时数据秒级入湖。'},
  {file:'platform/ops.html',title:'监控运维',sub:'全链路AI可观测平台 — 智能告警与自动自愈',desc:'模型性能实时监控、数据漂移自动检测、推理质量评估。多集群统一管理，故障发现时间小于1分钟。'}
];

platformPages.forEach(pp => {
  const isIndex = pp.file === 'platform/index.html';
  write(pp.file, head(pp.title, pp.sub) + navbar('platform') + toast +
    (isIndex ? '' : breadcrumb('平台', '/platform/', pp.title)) +
    pageHero(pp.title, pp.sub, isIndex ? '平台' : '') +
    (isIndex ? `
    <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-4">
        ${[{t:'推理服务',d:'毫秒级实时推理，弹性伸缩，支持主流模型格式',h:'/platform/inference.html'},{t:'模型训练',d:'分布式训练集群，千亿参数模型高效训练',h:'/platform/training.html'},{t:'数据管理',d:'500+数据源连接，自动化特征工程',h:'/platform/data.html'},{t:'监控运维',d:'全链路可观测，智能告警自愈',h:'/platform/ops.html'}].map((m,i) => `
        <a href="${m.h}" class="group rounded-xl p-8 transition-all duration-400 hover:-translate-y-1" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
          <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-nv-cyan transition-colors">${m.t}</h3>
          <p class="text-sm text-slate-500 mb-4">${m.d}</p>
          <span class="text-nv-cyan text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">了解详情 →</span>
        </a>`).join('')}
      </div>
    </div></section>` : `
    <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
      <div class="max-w-[800px] mx-auto">
        <p class="text-slate-300 text-lg leading-relaxed mb-10">${pp.desc}</p>
        <div class="grid sm:grid-cols-2 gap-4 mb-10">
          ${['高可用架构','弹性伸缩','安全合规','性能优化'].map(f => `
          <div class="rounded-xl p-5" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
            <div class="flex items-center gap-2 mb-1"><span class="text-nv-cyan text-sm">✓</span><span class="text-sm font-medium text-white">${f}</span></div>
            <p class="text-xs text-slate-500">企业级生产验证，${f==='高可用架构'?'99.99% SLA':f==='弹性伸缩'?'自动扩缩容':f==='安全合规'?'SOC2认证':'极致性能优化'}</p>
          </div>`).join('')}
        </div>
      </div>
    </div></section>`) +
    ctaSection() + footer());
});

// ═══════════════════════════════════════════════════════════════════════
//  6-8. DEVELOPER PAGES
// ═══════════════════════════════════════════════════════════════════════

const devPages = [
  {file:'developers/index.html',title:'开发者中心',sub:'构建下一代 AI 应用 — 全面的开发工具与资源'},
  {file:'developers/docs.html',title:'文档中心',sub:'完整的 API 参考、SDK 指南与最佳实践'},
  {file:'developers/api.html',title:'API 参考',sub:'RESTful API 与 gRPC 接口 — 完整的接口文档与示例'},
  {file:'developers/sdk.html',title:'SDK 下载',sub:'Python · JavaScript · Java · Go — 多语言 SDK'},
  {file:'developers/community.html',title:'开发者社区',sub:'加入全球开发者社区 — 分享经验，解决问题'}
];

devPages.forEach(dp => {
  const isIndex = dp.file === 'developers/index.html';
  write(dp.file, head(dp.title, dp.sub) + navbar('developers') + toast +
    (isIndex ? '' : breadcrumb('开发者', '/developers/', dp.title)) +
    pageHero(dp.title, dp.sub) +
    (isIndex ? `
    <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${[{t:'文档中心',d:'快速入门、API 参考、最佳实践',h:'/developers/docs.html'},{t:'API 参考',d:'RESTful 与 gRPC 接口文档',h:'/developers/api.html'},{t:'SDK 下载',d:'Python/JS/Java/Go SDK',h:'/developers/sdk.html'},{t:'社区论坛',d:'交流分享、问题解答',h:'/developers/community.html'}].map(m => `
        <a href="${m.h}" class="rounded-xl p-6 text-center transition-all duration-400 hover:-translate-y-1" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
          <h3 class="text-white font-semibold mb-1">${m.t}</h3>
          <p class="text-xs text-slate-500">${m.d}</p>
        </a>`).join('')}
      </div>
    </div></section>` : `
    <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
      <div class="max-w-[800px] mx-auto">
        <p class="text-slate-300 text-lg leading-relaxed">${dp.sub}</p>
        <div class="mt-10 p-8 rounded-xl" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
          <pre class="text-sm text-slate-400 font-mono overflow-x-auto"><code># 安装 NovaMind SDK
pip install novamind-sdk

# 快速开始
from novamind import Client
client = Client(api_key="your_api_key")
response = client.inference.create(
    model="novamind-pro",
    messages=[{"role": "user", "content": "你好"}]
)
print(response.content)</code></pre>
        </div>
      </div>
    </div></section>`) +
    ctaSection() + footer());
});

// ═══════════════════════════════════════════════════════════════════════
//  7-8. RESEARCH & PARTNERS
// ═══════════════════════════════════════════════════════════════════════

write('research/index.html', head('研究', 'AI 前沿研究与技术创新') + navbar('research') + toast +
  pageHero('AI 研究', '推动人工智能技术的前沿探索', '研究') + `
  <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
    <div class="grid md:grid-cols-3 gap-4">
      ${[{t:'大语言模型',d:'探索下一代 LLM 架构与训练方法'},{t:'多模态学习',d:'视觉、语言、语音的深度融合'},{t:'强化学习',d:'基于反馈的智能决策优化'}].map(r => `
      <div class="rounded-xl p-6 transition-all duration-400 hover:-translate-y-1" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
        <h3 class="text-white font-semibold mb-2">${r.t}</h3>
        <p class="text-sm text-slate-500 mb-4">${r.d}</p>
        <a href="/research/" class="text-nv-cyan text-sm font-medium hover:underline">阅读论文 →</a>
      </div>`).join('')}
    </div>
  </div></section>
  ${ctaSection()} ${footer()}`);

write('partners/index.html', head('合作伙伴', '携手行业领导者，共建AI生态') + navbar('partners') + toast +
  pageHero('合作伙伴生态', '与全球领先企业携手，共建 AI 基础设施', '合作伙伴') + `
  <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      ${['🏦 中国银行','🏥 仁和医疗','⚙ 精工智造','🛒 悦享零售','🏗 华远集团','📡 中国电信','💻 华为云','☁️ 阿里云','🔷 腾讯云','🔶 AWS','🏢 招商银行','🏭 比亚迪'].map(p => `
      <div class="rounded-xl p-4 text-center text-sm text-slate-500 transition-all duration-400 hover:text-nv-cyan hover:-translate-y-1" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">${p}</div>`).join('')}
    </div>
  </div></section>
  ${ctaSection()} ${footer()}`);

// ═══════════════════════════════════════════════════════════════════════
//  9. QUICK SUB-PAGES (solutions, features, cases, company mirror)
// ═══════════════════════════════════════════════════════════════════════

// Copy & adapt from novamind project — create index pages
const sectionIndexes = [
  {dir:'solutions',title:'行业解决方案',sub:'深耕四大行业，定制化 AI 落地',cards:[{t:'金融风控智能体',d:'实时反欺诈、信用评估、合规审查',h:'/solutions/fintech.html'},{t:'医疗影像辅助诊断',d:'多模态影像分析，准确率98.7%',h:'/solutions/healthcare.html'},{t:'工业质检视觉系统',d:'毫秒级缺陷检测，边缘端部署',h:'/solutions/manufacturing.html'},{t:'零售智慧供应链',d:'需求预测+智能补货+动态定价',h:'/solutions/retail.html'}]},
  {dir:'features',title:'产品功能',sub:'全栈 AI 能力模块',cards:[{t:'多源数据融合引擎',d:'500+连接器，实时数据接入',h:'/features/data-fusion.html'},{t:'大模型推理平台',d:'私有化部署，安全合规',h:'/features/model-platform.html'},{t:'行业知识图谱',d:'千万级实体关系推理',h:'/features/knowledge-graph.html'},{t:'智能决策中枢',d:'因果推断，可解释AI',h:'/features/decision-engine.html'},{t:'业务流程自动化',d:'AI+RPA深度融合',h:'/features/automation.html'},{t:'AI运维监控台',d:'全链路可观测',h:'/features/ai-ops.html'}]},
  {dir:'cases',title:'客户案例',sub:'行业标杆企业的AI转型实践',cards:[{t:'兴业金融',d:'智能风控系统',h:'/cases/case-1.html'},{t:'仁和医疗',d:'影像AI辅助诊断',h:'/cases/case-2.html'},{t:'精工智造',d:'工业视觉质检',h:'/cases/case-3.html'},{t:'悦享零售',d:'智慧供应链',h:'/cases/case-4.html'},{t:'华远集团',d:'知识图谱平台',h:'/cases/case-5.html'}]},
  {dir:'company',title:'关于 NovaMind',sub:'技术驱动，智赋未来',cards:[{t:'关于我们',d:'团队、使命、愿景',h:'/company/about.html'},{t:'联系我们',d:'业务合作与咨询',h:'/company/contact.html'},{t:'预约演示',d:'安排专属产品演示',h:'/company/booking.html'}]}
];

sectionIndexes.forEach(s => {
  write(s.dir+'/index.html', head(s.title, s.sub) + navbar(s.dir) + toast +
    breadcrumb(s.title) + pageHero(s.title, s.sub) + `
    <section class="py-16"><div class="max-w-[1340px] mx-auto px-6">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${s.cards.map(c => `
        <a href="${c.h}" class="rounded-xl p-6 transition-all duration-400 hover:-translate-y-1.5 group" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
          <h3 class="text-base font-semibold text-white mb-1.5 group-hover:text-nv-cyan transition-colors">${c.t}</h3>
          <p class="text-sm text-slate-500 mb-3">${c.d}</p>
          <span class="text-nv-cyan text-xs font-medium group-hover:translate-x-1 transition-transform inline-block">了解详情 →</span>
        </a>`).join('')}
      </div>
    </div></section>
    ${ctaSection()} ${footer()}`);
});

// Copy the detailed content pages from novamind project
const srcDir = 'D:\\Ai\\测试文件\\novamind';
const pagesToCopy = [
  'features/data-fusion.html','features/model-platform.html','features/knowledge-graph.html',
  'features/decision-engine.html','features/automation.html','features/ai-ops.html',
  'solutions/fintech.html','solutions/healthcare.html','solutions/manufacturing.html','solutions/retail.html',
  'cases/case-1.html','cases/case-2.html','cases/case-3.html','cases/case-4.html','cases/case-5.html',
  'company/about.html','company/contact.html','company/booking.html'
];

pagesToCopy.forEach(p => {
  const src = path.join(srcDir, p);
  if (fs.existsSync(src)) {
    let content = fs.readFileSync(src, 'utf-8');
    // Replace old domain/brand references
    content = content.replace(/@\{\{DOMAIN\}\}/g, DOMAIN);
    content = content.replace(/@\{\{EMAIL\}\}/g, EMAIL);
    write(p, content);
  } else {
    console.log('  ⚠ missing source:', p);
  }
});

// Copy shared assets
['assets/style.css','assets/app.js'].forEach(a => {
  const src = path.join(srcDir, a);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(BASE, a));
    console.log('  ✓', a, '(copied)');
  }
});
console.log(`\n✅  new.aihub.luxe 项目已生成到 ${BASE}\n  文件总数:`, fs.readdirSync(BASE, {recursive:true}).filter(f=>f.endsWith('.html')).length, '个 HTML 页面\n');
