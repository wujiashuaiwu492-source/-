// Batch write remaining HTML files
const fs = require('fs');
const path = require('path');
const BASE = 'D:\\Ai\\测试文件\\new-aihub';

// Template engine for feature/case pages
function t(rel) {
  const depth = rel.split('/').length - 1;
  const root = '../'.repeat(depth);
  return {
    head(file,title,desc) {
      return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | NovaMind</title><meta name="description" content="${desc}"><link rel="stylesheet" href="${root}assets/style.css"><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{colors:{'nv-deep':'#0a0f18','nv-dark':'#111827','nv-card':'#1a2332','nv-cyan':'#00d4aa','nv-blue':'#3b82f6','nv-purple':'#8b5cf6','nv-muted':'#64748b'}}}}</script><script src="${root}assets/app.js" defer></script><style>.nv-link{font-size:13px;padding:6px 12px;border-radius:6px;color:#94a3b8;transition:all .3s}.nv-link:hover{color:#fff}.mbl{display:block;padding:10px 12px;font-size:14px;color:#94a3b8;border-radius:6px;transition:all .3s}.mbl:hover{color:#fff;background:rgba(255,255,255,.03)}.btn1{display:inline-flex;align-items:center;gap:8px;background:#00d4aa;color:#0a0f18;font-weight:600;padding:12px 32px;border-radius:8px;font-size:14px;transition:all .3s}.btn1:hover{background:#00e8bc;transform:translateY(-2px)}.btn2{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;font-weight:500;padding:12px 32px;border-radius:8px;font-size:14px;border:1px solid rgba(255,255,255,.1);transition:all .3s}.btn2:hover{border-color:rgba(0,212,170,.4)}.si{width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:12px;color:#64748b;transition:all .3s}.si:hover{background:rgba(0,212,170,.1);border-color:rgba(0,212,170,.3);color:#00d4aa;transform:scale(1.1)}.card{background:#111827;border:1px solid rgba(255,255,255,.04);border-radius:12px;padding:20px 24px;transition:all .3s}.card:hover{border-color:rgba(0,212,170,.3);transform:translateY(-2px)}.ft{font-size:12px;font-weight:600;color:#cbd5e1;text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px}.fc{display:flex;flex-direction:column;gap:10px}.fl{font-size:14px;color:#64748b;transition:all .3s}.fl:hover{color:#00d4aa}.fb{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding-top:24px;border-top:1px solid rgba(255,255,255,.05);font-size:14px;color:#475569}</style></head><body class="bg-nv-deep text-slate-300 font-sans antialiased"><div id="toast" class="toast"></div>\n`;
    },
    nav(active) {
      return `<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 border-b" style="background:rgba(10,15,24,0.88);backdrop-filter:blur(24px);border-color:rgba(255,255,255,0.06)"><div class="max-w-[1340px] mx-auto flex items-center justify-between h-[60px] px-6"><a href="${root}index.html" class="flex items-center gap-2.5"><svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#00d4aa" stroke-width="2"/><path d="M9 21 L16 9 L23 21" stroke="#00d4aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="9" r="2.5" fill="#00d4aa"/></svg><span class="text-[15px] font-bold text-white">NovaMind</span></a><div class="hidden lg:flex items-center gap-0.5"><a href="${root}platform/index.html" class="nv-link">平台</a><a href="${root}solutions/index.html" class="nv-link">解决方案</a><a href="${root}features/index.html" class="nv-link${active==='features'?' text-nv-cyan':''}">产品</a><a href="${root}cases/index.html" class="nv-link${active==='cases'?' text-nv-cyan':''}">案例</a><a href="${root}developers/index.html" class="nv-link">开发者</a><a href="${root}research/index.html" class="nv-link">研究</a><a href="${root}partners/index.html" class="nv-link">合作伙伴</a><a href="${root}company/about.html" class="nv-link">关于</a><a href="${root}company/contact.html" class="ml-2 px-4 py-1.5 text-[13px] font-semibold text-nv-deep bg-nv-cyan hover:bg-[#00e8bc] rounded-md transition-all">联系我们</a></div><button id="hamburger" class="lg:hidden flex flex-col gap-1 p-2 cursor-pointer z-50 bg-transparent border-none"><span class="block w-5 h-0.5 bg-slate-400 rounded"></span><span class="block w-5 h-0.5 bg-slate-400 rounded"></span><span class="block w-5 h-0.5 bg-slate-400 rounded"></span></button></div><div id="mobileMenu" class="lg:hidden overflow-hidden" style="max-height:0;transition:max-height .4s ease;background:rgba(10,15,24,0.96)"><div class="flex flex-col gap-0.5 px-4 pb-4"><a href="${root}platform/index.html" class="mbl">平台</a><a href="${root}solutions/index.html" class="mbl">解决方案</a><a href="${root}features/index.html" class="mbl">产品</a><a href="${root}cases/index.html" class="mbl">案例</a><a href="${root}developers/index.html" class="mbl">开发者</a><a href="${root}research/index.html" class="mbl">研究</a><a href="${root}partners/index.html" class="mbl">合作伙伴</a><a href="${root}company/about.html" class="mbl">关于</a><a href="${root}company/contact.html" class="mt-2 mx-2 px-4 py-2.5 text-sm font-semibold text-nv-deep bg-nv-cyan rounded-md text-center">联系我们</a></div></div></nav>\n`;
    },
    bread(s1,h1,s2,h2) {
      let b = `<div class="max-w-[1340px] mx-auto px-6 pt-24 pb-1 text-xs text-slate-500"><a href="${root}index.html" class="hover:text-nv-cyan transition">首页</a> <span class="text-slate-700">/</span> `;
      if (h1) b += `<a href="${h1}" class="hover:text-nv-cyan transition">${s1}</a> <span class="text-slate-700">/</span> `;
      else b += `<span class="text-nv-cyan">${s1}</span>`;
      if (s2) b += `<span class="text-nv-cyan">${s2}</span>`;
      return b + '</div>\n';
    },
    hero(title,sub) { return `<section class="pt-8 pb-16 text-center"><div class="max-w-[1340px] mx-auto px-6"><h1 class="text-4xl font-bold text-white mb-4">${title}</h1><p class="text-lg text-slate-400">${sub||''}</p></div></section>\n`; },
    cta() { return `<section class="py-20"><div class="max-w-[1340px] mx-auto px-6"><div class="rounded-2xl p-12 sm:p-16 text-center" style="background:linear-gradient(135deg,rgba(0,212,170,0.08),rgba(59,130,246,0.06));border:1px solid rgba(255,255,255,0.05)"><h2 class="text-2xl sm:text-3xl font-semibold text-white mb-3">准备开始了吗？</h2><p class="text-slate-400 mb-8">专家24小时内联系您。</p><div class="flex gap-4 justify-center"><a href="${root}company/booking.html" class="btn1">预约演示 &rarr;</a><a href="${root}company/contact.html" class="btn2">联系我们</a></div></div></div></section>\n`; },
    foot() { return `<footer class="border-t" style="background:#080c14;border-color:rgba(255,255,255,0.05)"><div class="max-w-[1340px] mx-auto px-6 py-16"><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12"><div class="col-span-2"><div class="flex items-center gap-2.5 mb-4"><svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#00d4aa" stroke-width="2"/><path d="M9 21 L16 9 L23 21" stroke="#00d4aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="text-base font-bold text-white">NovaMind</span></div><p class="text-sm text-slate-500 max-w-[260px] leading-relaxed mb-5">企业级人工智能基础设施与解决方案提供商。</p><div class="flex gap-2.5"><a href="mailto:wujiashuaiwu492@gmail.com" class="si">✉</a></div></div><div><h4 class="ft">平台</h4><div class="fc"><a href="${root}platform/inference.html" class="fl">AI推理引擎</a><a href="${root}platform/training.html" class="fl">模型训练平台</a><a href="${root}platform/data.html" class="fl">数据管理</a><a href="${root}platform/ops.html" class="fl">监控运维</a></div></div><div><h4 class="ft">解决方案</h4><div class="fc"><a href="${root}solutions/fintech.html" class="fl">金融</a><a href="${root}solutions/healthcare.html" class="fl">医疗</a><a href="${root}solutions/manufacturing.html" class="fl">制造</a><a href="${root}solutions/retail.html" class="fl">零售</a></div></div><div><h4 class="ft">开发者</h4><div class="fc"><a href="${root}developers/docs.html" class="fl">文档中心</a><a href="${root}developers/api.html" class="fl">API参考</a><a href="${root}developers/sdk.html" class="fl">SDK下载</a><a href="${root}developers/community.html" class="fl">社区</a></div></div><div><h4 class="ft">公司</h4><div class="fc"><a href="${root}company/about.html" class="fl">关于我们</a><a href="${root}research/index.html" class="fl">研究</a><a href="${root}partners/index.html" class="fl">合作伙伴</a><a href="mailto:wujiashuaiwu492@gmail.com" class="text-sm text-nv-cyan hover:underline">联系合作</a></div></div></div><div class="fb"><span>&copy; 2026 NovaMind. All rights reserved.</span><div class="flex items-center gap-4"><a href="mailto:wujiashuaiwu492@gmail.com" class="text-nv-cyan hover:underline text-xs">wujiashuaiwu492@gmail.com</a><span class="text-slate-700">|</span><a href="https://aihub.luxe" class="hover:text-nv-cyan transition text-xs" target="_blank">aihub.luxe</a></div></div></div></footer>\n`; }
  };
}

function w(relPath, content) {
  const p = path.join(BASE, relPath);
  if (!fs.existsSync(path.dirname(p))) fs.mkdirSync(path.dirname(p), {recursive: true});
  fs.writeFileSync(p, content, 'utf-8');
  console.log('  +', relPath);
}

// ═══════ FEATURE DETAIL PAGES (3 remaining) ═══════
const fRemain = [
  {file:'features/decision-engine.html',tag:'决策智能',title:'智能决策中枢',core:'从洞察到行动——让每一个商业决策都有AI驱动的数据支撑',adv:['因果推断与反事实分析','多目标优化决策引擎','可解释AI决策路径','策略模拟与沙盘推演','实时决策效果归因','决策知识库自动沉淀'],cas:[{m:'信贷审批效率提升6×',d:'某商业银行智能风控决策系统'},{m:'库存成本降低18%',d:'某大型制造企业供应链优化'}]},
  {file:'features/automation.html',tag:'自动化',title:'业务流程自动化',core:'让AI替你跑流程——端到端智能自动化，释放团队创造力',adv:['AI+RPA深度融合','自然语言流程编排','智能异常处理与重试','跨系统无缝集成','流程效能实时看板','低代码流程设计器'],cas:[{m:'人工处理时间减少85%',d:'某上市集团财务共享中心'},{m:'年节约工时12万+小时',d:'某金融机构合规审查部'}]},
  {file:'features/ai-ops.html',tag:'监控',title:'AI运维监控台',core:'AI也需要运维——全链路可观测，让每一次推理都在掌控之中',adv:['模型性能实时监控','数据漂移自动检测','推理质量多维评估','异常告警与自愈机制','全链路调用链追踪','多集群统一管理'],cas:[{m:'故障发现时间＜1分钟',d:'某大型银行AI模型运维平台'},{m:'模型可用性99.99%',d:'某电商平台推荐系统监控'}]}
];

fRemain.forEach(f => {
  const T = t(f.file);
  const content = T.head(f.file, f.title, f.core) + T.nav('features') +
    T.bread('产品功能', T.root + 'features/index.html', f.title) +
    T.hero(f.title, f.core).replace(T.root, '') +
    `<section class="py-16" style="background:#0c111a"><div class="max-w-[1340px] mx-auto px-6"><div class="max-w-4xl mx-auto">
<div class="rounded-xl p-6 sm:p-8 mb-8" style="background:linear-gradient(135deg,rgba(0,212,170,0.08),transparent);border:1px solid rgba(255,255,255,0.05)"><span class="text-xs font-semibold tracking-widest uppercase text-nv-cyan">核心价值</span><p class="text-2xl sm:text-3xl font-semibold text-white mt-3 leading-relaxed">${f.core}</p></div>
<h2 class="text-2xl font-bold text-white mb-6">核心技术能力</h2>
<div class="grid sm:grid-cols-2 gap-4 mb-8">
${f.adv.map(a => `<div class="card"><span class="text-nv-cyan text-sm font-bold">✓</span><h3 class="text-sm font-semibold text-white mt-1 mb-1">${a}</h3><p class="text-xs text-slate-500">企业级生产验证</p></div>`).join('')}
</div>
<h2 class="text-2xl font-bold text-white mb-6">落地案例</h2>
<div class="grid sm:grid-cols-2 gap-4 mb-8">${f.cas.map(c => `<div class="card"><div class="text-nv-cyan font-semibold">${c.m}</div><div class="text-xs text-slate-500 mt-1">${c.d}</div></div>`).join('')}</div>
</div></div></section>` + T.cta() + T.foot() + `</body></html>`;
  w(f.file, content);
});

// ═══════ CASE PAGES (6 files) ═══════
const cases = [
  {file:'cases/index.html',title:'案例展示',sub:'行业标杆企业的AI转型实践'},
  {file:'cases/case-1.html',org:'兴业金融',title:'智能风控系统',q:'"欺诈损失下降了67%，模型响应从秒级到毫秒级。"',bg:'兴业金融是国内中型商业银行，日均交易量超500万笔。传统规则引擎误报率高，人工审核效率低，风控成本居高不下。',sol:'部署多源数据融合引擎 + 大模型推理平台 + 智能决策中枢，构建实时风控决策体系。实现交易毫秒级风险评估，多维特征实时计算，模型自动迭代优化。',res:[{v:'降低67%',l:'欺诈损失'},{v:'提升6倍',l:'审批效率'},{v:'降低82%',l:'误报率'}],person:'陈明远',role:'风控总监',test:'NovaMind的智能风控系统上线以来，我们的欺诈损失下降了67%，模型响应速度从秒级提升到毫秒级，真正做到了实时拦截。',rel:['case-2.html','case-3.html']},
  {file:'cases/case-2.html',org:'仁和医疗集团',title:'医学影像AI辅助诊断',q:'"阅片效率提升4倍，早期病变检出率提高35%。"',bg:'仁和医疗拥有12家分院，放射科日均阅片量巨大，资深医生紧缺。不同院区诊断水平参差不齐，患者等待时间长。',sol:'部署多模态AI推理 + 知识图谱辅助诊断 + AI运维监控台，实现全院影像智能分析。覆盖CT、MRI、X光多模态，自动生成结构化报告。',res:[{v:'提升4倍',l:'阅片效率'},{v:'98.7%',l:'诊断准确率'},{v:'+45%',l:'医生工作满意度'}],person:'李文静',role:'副院长',test:'医疗影像AI辅助系统帮助我们的放射科医生将阅片效率提升了4倍，早期病变检出率提高了35%。',rel:['case-1.html','case-4.html']},
  {file:'cases/case-3.html',org:'精工智造',title:'工业视觉质检系统',q:'"缺陷漏检率从3.2%降至0.08%，年节约800万元。"',bg:'精工智造是国内精密零部件龙头企业，传统人工目检效率低、一致性差，漏检率高达3.2%，导致客户投诉与退货损失巨大。',sol:'部署边缘端AI视觉系统 + 缺陷检测模型 + 实时质量监控台，实现产线全自动化质检。支持多角度、多光源检测，毫秒级判定。',res:[{v:'<0.08%',l:'漏检率'},{v:'800万+',l:'年节约成本'},{v:'10倍',l:'检测速度'}],person:'王建国',role:'生产总监',test:'工业质检系统上线后，我们的产线缺陷漏检率从3.2%降至0.08%，每年节约质检人力成本超过800万元。',rel:['case-2.html','case-5.html']},
  {file:'cases/case-4.html',org:'悦享零售',title:'智慧供应链优化',q:'"库存周转天数缩短40%，缺货率降低52%。"',bg:'悦享零售拥有2000+门店，大促期间库存管理压力巨大。需求预测不准导致畅销品缺货、滞销品积压，供应链成本居高不下。',sol:'部署需求预测模型 + 智能补货引擎 + 动态定价策略，实现全链路供应链智能化。融合销售、库存、天气等多源数据，精准预测需求。',res:[{v:'缩短40%',l:'库存周转天数'},{v:'降低52%',l:'缺货率'},{v:'+3.2%',l:'毛利率'}],person:'张雅婷',role:'供应链VP',test:'供应链智能系统让我们在大促期间的库存周转天数缩短了40%，缺货率降低了52%。',rel:['case-1.html','case-5.html']},
  {file:'cases/case-5.html',org:'华远集团',title:'企业知识图谱平台',q:'"查询响应从数天缩短到分钟级，效率提升12倍。"',bg:'华远集团是大型多元化控股企业，业务遍布能源、地产、金融等多个领域。内部信息系统孤岛严重，跨部门信息查询耗时数天。',sol:'部署行业知识图谱构建 + 多跳推理问答引擎 + 可视化图谱探索工具，构建企业级知识底座。打通200+系统数据孤岛。',res:[{v:'100万+',l:'知识实体覆盖'},{v:'12倍',l:'查询效率提升'},{v:'85%',l:'员工自助率'}],person:'赵思远',role:'CIO',test:'知识图谱平台将我们内部跨部门的查询响应时间从数天缩短到分钟级。',rel:['case-3.html','case-4.html']}
];

// Case index
const T0 = t('cases/index.html');
w('cases/index.html', T0.head('cases/index.html','案例展示','行业标杆企业的AI转型实践') + T0.nav('cases') + T0.bread('案例展示') +
  T0.hero('行业标杆 · 实效见证','来自各行业领先企业的真实反馈，见证NovaMind AI带来的业务价值跃升。') +
  `<section class="py-16"><div class="max-w-[1340px] mx-auto px-6"><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">` +
  cases.filter(c => c.org).map((c,i) => `<a href="${c.file.split('/').pop()}" class="group rounded-xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5" style="background:#111827;border:1px solid rgba(255,255,255,0.04)"><p class="text-sm text-slate-400 italic flex-1 mb-6">&ldquo;${c.q.slice(1,40)}&hellip;&rdquo;</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-semibold text-sm text-nv-deep shrink-0">${c.person[0]}</div><div><span class="block text-sm font-semibold text-white">${c.person}</span><span class="block text-xs text-slate-500">${c.role} · ${c.org}</span></div></div></a>`).join('') +
  `</div></div></section>` + T0.cta() + T0.foot() + `</body></html>`);

// Individual case pages
cases.filter(c => c.org).forEach(c => {
  const T = t('cases/' + c.file.split('/').pop());
  const fname = c.file.split('/').pop();
  const content = T.head('cases/' + fname, c.org + ' — ' + c.title, c.title) + T.nav('cases') +
    T.bread('案例展示', T.root + 'cases/index.html', c.org).replace(T.root, '') +
    T.hero(c.org, c.q) +
    `<section class="py-16" style="background:#0c111a"><div class="max-w-[1340px] mx-auto px-6"><div class="max-w-4xl mx-auto">
<div class="mb-8"><span class="text-xs font-semibold tracking-widest uppercase text-nv-cyan">项目背景</span><div class="rounded-xl p-6 mt-3" style="background:#111827;border:1px solid rgba(255,255,255,0.04)"><p class="text-slate-300 leading-relaxed">${c.bg}</p></div></div>
<div class="mb-8"><span class="text-xs font-semibold tracking-widest uppercase text-nv-cyan">解决方案</span><div class="rounded-xl p-6 mt-3" style="background:#111827;border:1px solid rgba(255,255,255,0.04)"><p class="text-slate-300 leading-relaxed">${c.sol}</p></div></div>
<div class="mb-8"><span class="text-xs font-semibold tracking-widest uppercase text-nv-cyan">实施效果</span><div class="grid grid-cols-3 gap-4 mt-3">${c.res.map(r => `<div class="card text-center"><div class="text-2xl font-bold text-nv-cyan">${r.v}</div><div class="text-xs text-slate-500 mt-1">${r.l}</div></div>`).join('')}</div></div>
<div class="mb-8"><span class="text-xs font-semibold tracking-widest uppercase text-nv-cyan">客户评价</span><div class="rounded-xl p-6 mt-3" style="background:#111827;border:1px solid rgba(255,255,255,0.04)"><p class="text-slate-300 italic leading-relaxed mb-4">&ldquo;${c.test}&rdquo;</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-semibold text-sm text-nv-deep">${c.person[0]}</div><div><span class="block text-sm font-semibold text-white">${c.person}</span><span class="block text-xs text-slate-500">${c.role} · ${c.org}</span></div></div></div></div>
<div><span class="text-xs font-semibold tracking-widest uppercase text-nv-cyan">相关案例</span><div class="flex gap-3 mt-3">${c.rel.map(r => `<a href="${r}" class="btn2">查看案例 →</a>`).join('')}</div></div>
</div></div></section>` + T.cta() + T.foot() + `</body></html>`;
  w('cases/' + fname, content);
});

// ═══════ COMPANY PAGES (3 remaining) ═══════
const Tca = t('company/about.html');
w('company/about.html', Tca.head('company/about.html','关于我们','技术驱动，智赋未来') + Tca.nav('') + Tca.bread('关于我们') + Tca.hero('技术驱动 · 智赋未来','成立于2018年，总部位于上海张江人工智能岛，团队200+AI研究员与工程师，服务500+企业客户。') +
  `<section class="py-16" style="background:#0c111a"><div class="max-w-[1340px] mx-auto px-6"><div class="max-w-4xl mx-auto">
<p class="text-slate-300 text-lg leading-relaxed mb-12">NovaMind AI 是一家专注于企业级人工智能解决方案的科技公司。我们致力于将前沿AI技术与行业know-how深度融合，帮助企业在复杂商业环境中做出更智能的决策。</p>
<h2 class="text-2xl font-bold text-white mb-6">核心团队</h2>
<div class="grid sm:grid-cols-2 gap-4 mb-12">
<div class="card text-center"><div class="w-14 h-14 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-bold text-lg text-nv-deep mx-auto mb-3">张</div><h3 class="text-white font-semibold">张正宇</h3><p class="text-nv-cyan text-sm">创始人 & CEO</p><p class="text-xs text-slate-500 mt-1">前阿里巴巴AI Lab首席科学家，斯坦福大学计算机博士</p></div>
<div class="card text-center"><div class="w-14 h-14 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-bold text-lg text-nv-deep mx-auto mb-3">林</div><h3 class="text-white font-semibold">林思涵</h3><p class="text-nv-cyan text-sm">CTO</p><p class="text-xs text-slate-500 mt-1">前Google Brain研究员，深度学习与强化学习专家</p></div>
<div class="card text-center"><div class="w-14 h-14 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-bold text-lg text-nv-deep mx-auto mb-3">王</div><h3 class="text-white font-semibold">王明哲</h3><p class="text-nv-cyan text-sm">CPO</p><p class="text-xs text-slate-500 mt-1">前华为云AI产品负责人，15年企业级产品经验</p></div>
<div class="card text-center"><div class="w-14 h-14 rounded-full bg-gradient-to-br from-nv-cyan to-nv-blue flex items-center justify-center font-bold text-lg text-nv-deep mx-auto mb-3">陈</div><h3 class="text-white font-semibold">陈雪莹</h3><p class="text-nv-cyan text-sm">COO</p><p class="text-xs text-slate-500 mt-1">前麦肯锡数字转型合伙人，MIT MBA</p></div>
</div></div></div></section>` + Tca.cta() + Tca.foot() + `</body></html>`);

const Tcc = t('company/contact.html');
w('company/contact.html', Tcc.head('company/contact.html','联系我们','业务合作与咨询') + Tcc.nav('') + Tcc.bread('联系我们') + Tcc.hero('开启企业智能升级之旅','我们的解决方案专家将在24小时内与您联系') +
  `<section class="py-16" style="background:#0c111a"><div class="max-w-[1340px] mx-auto px-6"><div class="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
<div><div class="rounded-xl p-6 mb-6" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
<h3 class="text-sm font-semibold text-white mb-4">联系方式</h3>
<div class="flex flex-col gap-4">
<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-md bg-nv-cyan/10 flex items-center justify-center text-nv-cyan shrink-0">@</div><div><span class="text-xs text-slate-500">业务合作邮箱</span><div class="flex items-center gap-2"><a href="mailto:wujiashuaiwu492@gmail.com" class="text-nv-cyan text-sm">wujiashuaiwu492@gmail.com</a></div></div></div>
<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-md bg-nv-cyan/10 flex items-center justify-center text-nv-cyan shrink-0">◉</div><div><span class="text-xs text-slate-500">咨询热线</span><p class="text-sm text-white">400-8820-NOVA</p></div></div>
<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-md bg-nv-cyan/10 flex items-center justify-center text-nv-cyan shrink-0">⌂</div><div><span class="text-xs text-slate-500">公司地址</span><p class="text-sm text-white">上海市浦东新区张江人工智能岛</p></div></div>
</div></div></div>
<div><form class="rounded-xl p-6" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
<div class="grid grid-cols-2 gap-4 mb-4"><div><label class="text-xs text-slate-500 mb-1 block">姓名 *</label><input type="text" required class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div><div><label class="text-xs text-slate-500 mb-1 block">邮箱 *</label><input type="email" required class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div></div>
<div class="grid grid-cols-2 gap-4 mb-4"><div><label class="text-xs text-slate-500 mb-1 block">公司名称</label><input type="text" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div><div><label class="text-xs text-slate-500 mb-1 block">电话</label><input type="tel" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div></div>
<div class="mb-4"><label class="text-xs text-slate-500 mb-1 block">需求描述</label><textarea rows="3" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)" placeholder="请简要描述您的业务需求..."></textarea></div>
<button type="submit" class="btn1 w-full justify-center">提交咨询</button>
</form></div>
</div></div></section>` + Tcc.ft() + `</body></html>`);

const Tcb = t('company/booking.html');
w('company/booking.html', Tcb.head('company/booking.html','预约演示','安排专属产品演示') + Tcb.nav('') + Tcb.bread('预约演示') + Tcb.hero('预约产品演示','我们的解决方案专家将在24小时内与您联系') +
  `<section class="py-16" style="background:#0c111a"><div class="max-w-[1340px] mx-auto px-6"><div class="max-w-[680px] mx-auto">
<form class="rounded-xl p-6 sm:p-8" style="background:#111827;border:1px solid rgba(255,255,255,0.04)">
<div class="grid sm:grid-cols-2 gap-4 mb-4"><div><label class="text-xs text-slate-500 mb-1 block">姓名 *</label><input type="text" required class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div><div><label class="text-xs text-slate-500 mb-1 block">邮箱 *</label><input type="email" required class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div></div>
<div class="grid sm:grid-cols-2 gap-4 mb-4"><div><label class="text-xs text-slate-500 mb-1 block">公司名称 *</label><input type="text" required class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div><div><label class="text-xs text-slate-500 mb-1 block">电话</label><input type="tel" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div></div>
<div class="grid sm:grid-cols-3 gap-4 mb-4"><div><label class="text-xs text-slate-500 mb-1 block">期望日期</label><input type="date" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div><div><label class="text-xs text-slate-500 mb-1 block">期望时间</label><input type="time" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"></div><div><label class="text-xs text-slate-500 mb-1 block">所属行业</label><select class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-slate-400" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><option>请选择</option><option>金融</option><option>医疗</option><option>制造</option><option>零售</option><option>其他</option></select></div></div>
<div class="mb-5"><label class="text-xs text-slate-500 mb-1 block">需求描述</label><textarea rows="3" class="w-full bg-transparent border rounded-lg px-4 py-2.5 text-sm text-white" style="border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)" placeholder="简要描述您的业务需求..."></textarea></div>
<button type="submit" class="btn1 w-full justify-center">提交预约</button>
</form></div></div></section>` + Tcb.foot() + `</body></html>`);

console.log('\n✅ All remaining pages written!\n');
