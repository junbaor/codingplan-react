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
