# 超级护工 SuperCare

**知微万象 · 养老问问应用矩阵 / 轻量照护记录工具**

面向护工、家属的手机优先记录工具：为长者或病患建立档案，记录每天的日常护理情况，用交班日报向接班人或家属传递信息。

> 当前为 **v1.0 单机静态版**：无需登录、不自动上传健康数据、不具备真实多人同步、医疗诊断或 AI 审核功能。

## 立即使用

**本地启动**（Node.js ≥18，无需安装依赖）：

```bash
npm run dev
# 在浏览器打开 http://localhost:5173
```

也可使用 VS Code Live Server、Python HTTP Server 等静态服务器。由于 JavaScript 使用 ESM，**不要直接双击 `index.html` 以 `file://` 模式打开**。

**发布 GitHub Pages**：把整个目录推送到你自己的 GitHub 仓库，分支 `main`。前往仓库 **Settings → Pages → Build and deployment → Source 选 GitHub Actions**。随后推动 `main` 分支触发 `.github/workflows/pages.yml`。成功后 GitHub Pages 网站地址将在 Actions 的 `Deploy to Pages` 步骤显示。该 workflow **只发布 index.html 与 src JS/CSS**，不发布旧版 HTML、源资料、测试或备份。

在已安装 Git 的本地目录运行（自行替换 `<YOUR_GITHUB_USERNAME>`）：

```bash
git init
git add .
git commit -m "feat: SuperCare v1.0 modular care log"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/supercare.git
git push -u origin main
```

首次 `git push` 前需在 GitHub 网站创建 `supercare` 空仓库（不要附加 README），并完成身份认证。**仅将应用代码上传到 GitHub；不要把真实护理数据备份或患者影像加入版本控制。**

## 功能边界与进度

| 模块 | 当前版本 |
|---|---|
| 照护对象 | 创建、编辑、切换、结束/恢复照护 |
| 护理记录 | 12 类记录、快捷标签、体征数值、疼痛评分、伤口及管路记录、照片 |
| 记录管理 | 按日期查看、修改历史、删除 |
| 每日交班 | 从真实记录生成时间线，复制文本、下载 TXT，可决定是否包含身份/病情字段 |
| 记录者身份 | 护工 / 家属手动切换；仅用于标记记录，不是登录授权 |
| 数据 | 浏览器 IndexedDB 持久化、JSON 备份与覆盖恢复、清空 |
| 设计资产 | Design Tokens / 基础组件 / 业务卡片 / Lucide 官方图标资产预览 |
| 实时同步和家属邀请 | **未实现**（未来需账号、权限、后端、审计和安全方案） |
| 语音识别、医疗 OCR、AI 解读 | **未实现**（原单页中的占位逻辑不作为真实功能迁移） |

## 目录

```text
supercare-app/
├── index.html                     # H5 / 桌面应用入口
├── src/
│   ├── app.js                     # 页面装配 + 事件与交班逻辑
│   ├── models.js                  # 12 类照护记录 Schema
│   ├── storage.js                 # IndexedDB 与照片压缩
│   ├── utils.js                   # 导入导出、转义、日期工具
│   ├── icons.js                   # 来源核验的 Lucide 官方 SVG 片段
│   └── styles/
│       ├── tokens.css             # CSS Variables / 设计令牌
│       ├── base.css               # reset / accessibility
│       ├── components.css         # Btn, Card, Badge, Form, Modal, Record
│       └── app.css                # Shell, navigation, page / responsive
├── docs/
│   ├── AGENT_SVG_ICON_GUIDE.md   # 图标强制规范
│   └── LUCIDE_LICENSE.md         # 官方来源、许可信息
├── legacy/                        # 上传的单页旧版（仅供迁移比对，不参与部署）
├── AGENTS.md                      # Agent 开发约束
└── .github/workflows/pages.yml    # 安全静态部署
```

## 产品与隐私原则

1. 只陈述已经观察或记录的事实，不生成医疗诊断、药物调整建议或虚假的“已审核”标签。
2. 分享只生成文本；照片不随 TXT 自动分享。脱敏分享仅默认**不带档案姓名和病情字段**，自由文本可能仍有姓名或其他隐私，必须在发送前人工复核。
3. IndexedDB 数据仅存当前浏览器所用设备；不同设备不能看到相同记录，清理浏览器数据、隐私模式退出、卸载浏览器等操作可导致丢失。建议定期本地备份。
4. JSON 备份包含可能敏感的个人健康信息和压缩图片，下载后用户需自行安全保管。导入备份会覆盖本设备原有档案。
5. 开源仓库里不得放真实患者资料、手机号、照片、文书或备份文件。原单页样例为虚构演示，与真实医嘱无关。
6. 适老化基础规范：显式表单标签、常规按钮 44px 触控目标、结构化图文、尊重系统减少动画设置。后续仍需真实长者/护工可用性测试。

## 更新和测试

```bash
npm run test:syntax
```

浏览器回归重点：创建档案 → 记录分类 → 快捷标记和备注 → 保存/编辑 → 本地刷新后数据存在 → 当日交班 → 默认身份字段不公开 → 切换身份 → JSON 备份恢复。图标不得使用 Emoji 或不受允许的新图标库。

## 法律与许可

本项目代码版权及公开许可需由仓库所有人最终确定；当前 `package.json` 暂设 `UNLICENSED`，并非已授予他人再分发应用的开源许可证。Lucide SVG 继续服从各自官方 ISC / MIT 条款，详见 `docs/LUCIDE_LICENSE.md`。采用公开 GitHub 仓库只意味着代码可见，不等于授予任意复用许可。