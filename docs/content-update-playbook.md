# Coding Plan 内容更新手册（SOP）

/**
 * [INPUT]: 无代码依赖；信源为各平台官方页面与 github.com/wmpeng/codingplan（浅 clone 到临时目录）
 * [OUTPUT]: 对外提供套餐/模型/价格内容的更新流程指引：官方信源清单、参考仓库拉取与清理、落地文件清单与校验步骤
 * [POS]: docs 的内容运维 SOP，供 AI Agent 与人工在「更新某平台套餐/价格/模型」类需求时照此执行
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */

> 适用场景：某平台调价、上新模型、套餐上下线、限时活动等，需要把 codingplan.org 的数据同步到最新。
> 总原则：**官方源是唯一权威，参考仓库只做线索与交叉验证；价格与额度必须能在官方页面找到原文才可落库。**

---

## 1. 双信源策略

| 信源 | 性质 | 用途 | 信任级 |
|---|---|---|---|
| 各平台官方页面/文档 | 一手权威 | 价格、档位、模型清单、活动时间，直接落库 | P0（唯一落库依据） |
| github.com/wmpeng/codingplan | 第三方聚合（codingplan.fyi） | 变更线索、实测 token 估算、行业动态、新平台发现 | P1（线索与旁证，不直接抄文案） |

冲突时：**官方 > 参考仓库 > 自己推断**。参考仓库的"实测 Token""评分"属于对方的估算口径，只可引用为"第三方实测参考"，不得写成官方承诺。

---

## 2. 信源 A：各平台官方页面

### 2.1 官方 URL 清单

抓取时用下面的"干净 URL"（不带推广参数）。推广参数只保留在代码 `purchaseUrl` / `cta.href` 中，不要污染抓取入口。

| 平台 | 官方入口 | 备注 |
|---|---|---|
| 智谱 GLM | https://www.bigmodel.cn/glm-coding | 每周 Credits 制，注意连续包月/包季/包年三档价 |
| Kimi | https://www.kimi.com/code | 5 档套餐；K3 仅 Moderato 起 |
| MiniMax | https://platform.minimaxi.com/subscribe/token-plan | 月度 token 制；关注模型列表更新 |
| 火山引擎方舟 | https://www.volcengine.com/product/ark 与计费文档 https://www.volcengine.com/docs/82379/2366394 | 限时活动多（如 2.5 折、9.5 折叠加），务必记录活动起止日期 |
| 阿里云百炼 | https://www.aliyun.com/benefit/scene/codingplan | 有停售/限量补货状态 |
| 小米 MiMo | https://platform.xiaomimimo.com/token-plan | Credits 年总量口径 |
| OpenCode Go | https://opencode.ai/go 与 https://opencode.ai/docs/go/ | 美元 Credits（5h $12 / 周 $30 / 月 $60） |
| Claude | https://www.anthropic.com/pricing 与 https://claude.ai/pricing | 境外源，可能需重试 |
| ChatGPT | https://openai.com/chatgpt/pricing/ | Go/Plus/Pro 档位与主推模型 |
| DeepSeek（按量参考） | https://api-docs.deepseek.com/zh-cn/quick_start/pricing | 用于"虚拟套餐"性价比换算 |

### 2.2 抓取方式（按顺序尝试）

1. **webfetch 工具**：静态页优先，直接取 markdown。
2. **浏览器自动化（chrome-devtools / agent-browser）**：JS 渲染的 SPA（如部分云厂商控制台落地页）、webfetch 拿到空壳时使用。
3. **`curl -sL <url> | head -200`**：仅当上面两者都不可用时做粗验证。

### 2.3 常见坑

- 登录墙/地区限制：Claude、ChatGPT 定价页偶发 403，换个入口（anthropic.com / openai.com）或参考官方博客公告。
- 限时活动没有写截止日期：在数据里标注"限时"，并记入 changelog，方便后续复核。
- 价格单位：OpenCode 是美元 Credits，小米是"亿 Credits/年"，智谱是"每周 Credits"，Kimi 是"5h 配额 + 7 天刷新"，不要互相换算混淆。

---

## 3. 信源 B：参考仓库 wmpeng/codingplan

用途：变更线索（他更新得勤）、全行业平台清单（31 家，可用于发现新平台）、第三方实测口径。**允许浅 clone 到本地临时目录当参考信源，用完必须删除。**

### 3.1 浅 clone（固定流程）

```bash
# 临时目录：优先用环境预批准的 /var/folders/.../T/opencode，或 mktemp -d
REF_DIR="${TMPDIR}/opencode/ref-codingplan"

# 已存在则先清掉，保证每次都是全新状态
rm -rf "$REF_DIR"
git clone --depth 1 https://github.com/wmpeng/codingplan "$REF_DIR"
```

### 3.2 重点阅读的文件

| 文件 | 内容 | 怎么用 |
|---|---|---|
| `README.md` | 平台推荐、平台对比表（评分/购买状态/星级） | 发现"某平台涨价/停售/解除限购"线索 → 去官方页核实 |
| `plans.json` | 结构化套餐数据（价格、请求数、实测 Token、支持模型） | 与官方页逐字段比对，取交集；"实测 Token"仅作参考值 |
| `platforms.json` | 平台元数据（购买状态、标签） | 同步"开放购买/暂停销售/定时放量"状态，仍需官方核实 |
| `payg-pricing.json` | 按量计费价格 | DeepSeek 等按量通道的旁证 |
| `articles/` | 月度平台对比、模型横评长文 | 模型能力/发布日期等背景信息线索 |

快速定位示例：

```bash
# 查某平台在各文件中的数据
rg -n "GLM-5.2|zhipu|智谱" "$REF_DIR/plans.json" | head -40
# 看 README 更新日期与最新事件
rg -n "更新日期" "$REF_DIR/README.md"
```

### 3.3 用完删除（强制）

```bash
rm -rf "$REF_DIR"
```

- 该仓库只作离线参考，**禁止**把它的文案、评分、推广链接（`api.dreamfree.space/c/s/*` 是对方的返利链）复制进本站代码。
- 不 commit、不留在磁盘过夜、不放进本项目目录。

---

## 4. 更新落地：代码相要改哪些文件

数据全部集中在 `src/data/`，按影响范围从大到小：

1. `src/data/plans.ts` — 中文详情页（9 平台）：价格、档位、features、FAQ、comparison 表。
2. `src/data/plans-en.ts` — 英文详情页，涉及已收录平台时同步改。
3. `src/data/home.ts` — 中英文首页平台卡片（heading/subtitle/plans 快照）与快速对比表。
4. `src/data/deals.ts` — 首购/邀请/年付优惠发生变化时更新。
5. `src/data/models.ts` / `leaderboard.ts` — 新模型上下架、性价比榜单变动时更新。
6. `src/data/changelog.ts` — **每次内容更新必须加一行**（月份 section 倒序，格式 `['MM-DD', '平台', '事件']`）。
7. `src/data/site-version.ts` — `DATA_UPDATED_AT` 改为当天日期（贯通 JSON-LD dateModified / sitemap lastmod / 页脚）。
8. 若新增/下线整个平台：还需改 `app/` 路由、`plan-alternates.ts`、`content-links.ts`，并按 GEB 协议回环 L2/L1 文档。

## 5. 文档相回环（GEB，强制）

代码改完后按三层检查：

- **L3**：被改 ts 文件的头部注释（INPUT/OUTPUT/POS）是否仍准确；
- **L2**：`src/data/AGENTS.md` 成员职责描述是否需要更新；
- **L1**：根 `AGENTS.md` 的"当前数据要点"追加一条本次更新摘要（带日期），必要时更新平台数量统计。

## 6. 校验与发布

```bash
npm run typecheck   # 必须零错误
npm run build       # 静态构建 + 反抄袭注入，必须成功
# 部署上线后（Vercel 自动），提交索引：
npm run indexnow
```

## 7. 完整操作序列（速查）

```
1. 明确目标平台与变更主题（调价/上新/上下线）
2. webfetch 官方页 -> 记录官方原文数字
3. 浅 clone 参考仓库 -> rg 查该平台 -> 交叉比对 -> rm -rf
4. 改 src/data/*.ts（plans/home/deals/models/leaderboard 按需 + changelog + site-version 必改）
5. GEB 回环：L3 头部 -> L2 -> L1 AGENTS.md 数据要点
6. npm run typecheck && npm run build
7. 部署后 npm run indexnow
```
