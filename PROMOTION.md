# 推广计划

## IndexNow 接入

搜索引擎索引提交：Bing / Yandex / DuckDuckGo / Seznam 等通过 IndexNow 协议可在内容更新后几小时内到索引。

### 一次性接入

1. 确认 `.indexnow-key` 中存在一个有 32 位 hex 的 key（已提交：`49aeaaa776e14b748b6a1839c66a452d`）
2. 验证文件已部署到 `public/<key>.txt`，Next.js 部署后可通过 `https://codingplan.org/<key>.txt` 访问，内容为纯 key
3. 提交探测 URL 验证 key 验证通过：

   ```bash
   npm run indexnow -- https://codingplan.org
   ```

   期望返回 HTTP 200/202。

### 日常提交

内容更新后批量提交当前线上 sitemap 全部 URL：

```bash
npm run indexnow              # 真实提交
npm run indexnow:dry          # 仅打印 payload 不发送
```

提交脚本 `scripts/indexnow-submit.ts` 会从 `https://codingplan.org/sitemap.xml` 自动解析 URL，单次最多 10000 条（IndexNow 上限）。脚本支持以下子命令：

```text
node scripts/indexnow-submit.ts                    # 提交 sitemap 全量 URL
node scripts/indexnow-submit.ts <url> [<url>...]   # 提交指定 URL
node scripts/indexnow-submit.ts --init             # 重新生成 key + 验证文件
node scripts/indexnow-submit.ts --key              # 仅打印当前 key
node scripts/indexnow-submit.ts --dry-run          # 构造请求但不发送
```

### 故障排查

- HTTP 403 → 验证文件 `https://codingplan.org/<key>.txt` 不可访问或内容不一致
- HTTP 422 → URL host 与 key host 不匹配
- HTTP 429 → 提交过于频繁，冷却后重试

### 替换 key

如需更换 key（如怀疑泄露）：

```bash
npm run indexnow -- --init
# 部署新验证文件后
npm run indexnow
```

旧 key 在删除前可继续提交，但请尽快替换。

## 高权重外链（1-3 天见效）

### 技术社区（高优先级）
- [ ] **V2EX**: https://v2ex.com/new/share - "分享创造" 节点
  标题：「CodingPlan.org - 国内 AI 编程套餐价格对比」
- [ ] **GitHub**: 创建 GitHub Topic `#coding-plan` `#ai-coding`，README 添加网站徽章，提交到 awesome-list
- [ ] **掘金**: https://juejin.cn/editor/drafts/new
  标题：「2026 年国内 AI 编程套餐全面对比」
- [ ] **SegmentFault**: https://segmentfault.com/write

### 社交媒体
- [ ] **Twitter/X**: 带 hashtag #AI #Coding #开发工具
- [ ] **小红书**: 发布测评笔记（带链接）
- [ ] **知乎**: 回答相关问题并附带链接（"有哪些好用的 AI 编程工具？"、"Claude Code 怎么在国内用？"）

### 外国社区（英文版）
- [ ] **Hacker News**: https://news.ycombinator.com/submit
- [ ] **Reddit**: r/coding, r/programming
- [ ] **Product Hunt**: 产品发布

## 被动索引优化

- [ ] 每周更新一次价格/套餐信息，添加"最后更新时间"显示
- [ ] 定期发布新闻/公告
- [ ] 各平台卡片内部互链（首页锚点 + 详情页 Footer 导航）

## 监控与分析

- [x] Google Analytics（已安装）
- [x] Microsoft Clarity（已安装）
- [ ] Bing Webmaster Tools
- [ ] 百度统计

监控索引状态：`site:codingplan.org`
检查关键词排名："coding plan 对比"、"AI 编程套餐"、"Claude Code 国内"

## 时间线参考

| 方法 | 预计索引时间 | 难度 | 效果 |
|-----|------------|------|------|
| IndexNow | 几小时 | 低 | ⭐⭐⭐ |
| Search Console 主动提交 | 1-3天 | 低 | ⭐⭐⭐⭐ |
| V2EX/掘金发帖 | 1-7天 | 低 | ⭐⭐⭐⭐⭐ |
| 社交媒体分享 | 3-7天 | 低 | ⭐⭐⭐ |
| 高权重外链 | 1-2周 | 中 | ⭐⭐⭐⭐⭐ |

## 快速行动清单

1. ✅ sitemap.xml + robots.txt（Next.js 自动生成）
2. [ ] 注册 Google Search Console 并提交
3. [ ] 注册 Bing Webmaster Tools
4. [ ] 运行 `npm run indexnow` 提交当前全部 URL
5. [ ] V2EX 发帖分享
6. [ ] 小红书发笔记
7. [ ] 掘金发文章
