# NovaMind 子域名部署指南

## 项目概览

- **主域名**: `aihub.luxe`（你现有的单页 AI 站点）
- **子域名**: `new.aihub.luxe`（全新的多页面企业级 NovaMind AI 官网）
- **技术栈**: HTML5 + Tailwind CSS v3 CDN + 原生 JS + Three.js

## 子域名网站结构

```
new.aihub.luxe/
├── index.html              ← 首页（企业级 Landing Page）
├── platform/               ← AI 平台
│   ├── index.html           ← 平台概览
│   ├── inference.html       ← 推理服务
│   ├── training.html        ← 模型训练
│   ├── data.html            ← 数据管理
│   └── ops.html             ← 监控运维
├── solutions/              ← 行业解决方案
│   ├── index.html           ← 方案列表
│   ├── fintech.html         ← 金融风控
│   ├── healthcare.html      ← 医疗影像
│   ├── manufacturing.html   ← 工业质检
│   └── retail.html          ← 零售供应链
├── features/               ← 产品功能
│   ├── index.html           ← 功能列表
│   ├── data-fusion.html     ← 数据融合
│   ├── model-platform.html  ← 大模型推理
│   ├── knowledge-graph.html ← 知识图谱
│   ├── decision-engine.html ← 决策引擎
│   ├── automation.html      ← 流程自动化
│   └── ai-ops.html          ← AI 运维
├── cases/                  ← 客户案例
│   ├── index.html           ← 案例列表
│   └── case-1~5.html        ← 5个详细案例
├── developers/             ← 开发者中心
│   ├── index.html
│   ├── docs.html
│   ├── api.html
│   ├── sdk.html
│   └── community.html
├── research/               ← AI 研究
│   └── index.html
├── partners/               ← 合作伙伴
│   └── index.html
├── company/                ← 关于我们
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   └── booking.html
└── assets/
    ├── style.css
    └── app.js
```

## 部署步骤

### 步骤一：将项目上传到 Vercel

1. 在 `D:\Ai\测试文件\new-aihub\` 目录初始化 Git：
```bash
cd D:\Ai\测试文件\new-aihub
git init
git add .
git commit -m "Initial commit: NovaMind enterprise site"
```

2. 在 GitHub 创建新仓库（如 `novamind-enterprise`），推送：
```bash
git remote add origin https://github.com/你的用户名/novamind-enterprise.git
git branch -M main
git push -u origin main
```

3. 登录 [Vercel](https://vercel.com)，点击 **Add New → Project**
4. 导入 GitHub 仓库 `novamind-enterprise`
5. 保持默认配置（Framework Preset: Other），点击 **Deploy**
6. 部署完成后会得到一个 Vercel 分配的域名，如 `novamind-enterprise.vercel.app`

### 步骤二：配置 DNS 子域名

在你的域名注册商（管理 `aihub.luxe` 的地方）的 DNS 管理面板中，添加一条 CNAME 记录：

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| **CNAME** | `new` | `cname.vercel-dns.com` |

> 如果域名注册商不支持 CNAME 裸域，也可以用 A 记录指向 Vercel 的 IP。推荐使用 CNAME。

### 步骤三：在 Vercel 绑定自定义域名

1. 在 Vercel 项目面板，点击 **Settings → Domains**
2. 输入 `new.aihub.luxe`，点击 **Add**
3. Vercel 会自动验证 DNS 配置并签发 SSL 证书
4. 等待几分钟让 DNS 生效（最长48小时，通常几分钟到几小时）

### 步骤四：验证

打开浏览器访问：
- `https://new.aihub.luxe` → 子域名 NovaMind 企业官网首页
- `https://aihub.luxe` → 你原有的主域名 AI 站点

两个网站完全独立，互不干扰。

---

## 常见排查

**Q: 添加域名后显示 "Invalid Configuration"？**
A: 检查 DNS CNAME 记录是否正确指向 `cname.vercel-dns.com`，确保主机记录是 `new`（不是 `new.aihub.luxe`）

**Q: 子域名打不开？**
A: DNS 传播需要时间。可以用 `https://novamind-enterprise.vercel.app`（Vercel 默认域名）先测试网站是否正常。

**Q: 主站也想迁移到 Vercel？**
A: 可以把 `D:\Ai\测试文件\index.html` 作为另一个 Vercel 项目部署，绑定 `aihub.luxe` 主域名。
