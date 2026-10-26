> v1.1 采用原版紫色渐变 #667eea → #764ba2，H5 为主要设计规范。

# SuperCare Design System 1.0

## 视觉语言

- 品牌气质：可靠、柔和、轻量、减少医疗机构后台般的复杂感。
- 主色 `--c-brand`：`#667eea`；品牌浅色 `--c-brand-soft`：`#eeeaff`；关怀浅绿 `--c-lime`：`#ece8ff`。
- 文字层级：`--c-ink` → `--c-body` → `--c-muted`，注意避免用低对比颜色表达关键信息。
- 常用圆角：10 / 16 / 24 / 30 px。最常用容器为 24px。
- 最小交互尺寸 44 × 44 px；记录分类点击卡最小高度约 103 px。

## CSS 组件层级

| 层级 | 所在文件 | 内容 |
|---|---|---|
| Design Tokens | `src/styles/tokens.css` | 色彩、间距、字体、圆角、阴影、布局变量 |
| 基础设施 | `base.css` | Reset、字体、焦点、无障碍、减少动画 |
| 设计组件 | `components.css` | `.btn`/变体、`.card`、`.badge`、`.field`、`.tag`、`.modal-panel`、`.record-card` |
| 产品组件 | `app.css` | `.sidebar`、`.topbar`、`.patient-hero`、`.type-card`、`.metric`、`.paper-report` |
| 图标组件 | `src/icons.js` | `icon(name,size)`，官方 Lucide SVG，不使用 Emoji |

## 业务组件

- `PatientHero`：当前照护对象摘要、过敏提示、照护状态与编辑入口。
- `PatientTile`：多档案选择，按患者 ID 隔离记录。
- `QuickCategoryGrid`：12 个护理记录 Schema 的快捷入口。
- `RecordCard`：类型、时间、内容、结构化字段、照片、编辑、历史、删除。
- `RecordForm`：统一时间、标签、备注、照片；针对生命体征、疼痛、管路、伤口扩展字段。
- `ShiftReport`：从当前筛选日期下的既有记录构造时间线，手动选择分享范围。
- `PrivacySettings`：IndexedDB、本地备份、数据恢复及删除。
- `AssetGallery`：可视化显示 tokens、基础组件样本、图标清单；作为未来设计审查页。

> 当前是轻量静态项目，组件复用采用 JS 渲染函数 + BEM 式 CSS 类名，不额外引入 React/Vue/CSS-in-JS 或 npm 运行依赖。后续可将上述组件迁移为 Web Components 或其他框架而不重定义 tokens 和业务 schema。

## 图标资产与治理

图标统一由 `src/icons.js` 输出；SVG path 经过 Lucide 官方源码核对，无网络 CDN，页面可在已加载的情况下离线渲染图标。遵循 `AGENT_SVG_ICON_GUIDE.md` 优先级 Lucide → Tabler → Phosphor；当前仅需要 Lucide。不为 UI 自画路径。图标带文字时 `aria-hidden=true`；仅图标按钮使用 `aria-label`。

## 可维护性标准

1. 不把业务字段写死在组件的 SVG 或 CSS 内；新增记录类型应先更新 `models.js`，再确定专用输入和交班字段。
2. 所有输入内容在插入 `innerHTML` 前通过 `esc()` 转义；照片由受控文件输入压缩为 JPEG。
3. 长者、家属资料不写入代码仓库；Demo 数据必须虚构且明确标记。
4. 主要日常照护内容应由实际填写的数据生成，不能硬编码日报“正常”“无异常”“已审核”等医疗结论。
5. 分享默认不携带档案身份字段，但用户填写的自由文本需要人工检查是否包含敏感信息。