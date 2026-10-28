# 全站信源核对记录（2026-10-28，未完成）

/**
 * [INPUT]: 各厂商公开官方页面与 src/data 当前内容
 * [OUTPUT]: 已确认的内容差异及尚待核实的范围，供后续同步使用
 * [POS]: docs 的一次性核对记录，不代表全站数据已更新
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */

本次为部分核对，不应将全站数据更新日期视为本次全面核实。实际价格和购买资格以官方购买页为准。

## 已确认的差异

- **Kimi 国内新会员**：[官方会员说明](https://www.kimi.com/help/membership/membership-overview)列出 Go、Plus、Pro、Max、Ultra，连续包月分别为 ¥49、¥99、¥199、¥699、¥1,399。Go 不含 Kimi Code，Plus 及以上包含。新套餐取消周限额，保留滚动 5 小时频限和月度共享额度；旧套餐按原规则继续。站内仍多处展示旧档位、预约订阅及拆分权益预告，需统一修正。[Kimi Code 会员说明](https://www.kimi.com/help/kimi-code/benefits)同时说明 Pro 起可使用 K3 1M 上下文。
- **OpenCode Go**：[官方文档](https://opencode.ai/v2/docs/console/go/)显示 Go $10/月、Go Plus $40/月，模型清单已变更，且注明会持续调整。需核对中英文详情、首页、比较和榜单；不能继续将旧的 24 款清单当作最新。
- **MiniMax**：[原 Token Plan 入口](https://platform.minimaxi.com/subscribe/token-plan)已跳转 M Plan；浏览器读取国内 M Plan：Go / Explore / Build 连续包月 ¥49 / ¥119 / ¥469，首月五折至 10 月 31 日，年付 ¥490 / ¥1,190 / ¥4,690；国际版分别 $22 / $55 / $132，首月五折至 10 月 31 日（UTC+8），年付 $220 / $550 / $1,320。国内 Build 为 Go 12 倍用量，国际版为 7.5 倍。
- **DeepSeek API**：[官方价格文档](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)列出 DeepSeek-V4.1-Flash-1017 和 DeepSeek-V4-Pro-0813，旧 Flash 模型名路由至新版；Search/Fetch 计划自北京时间 2026-11-01 起收费。须核对模型页与按量计算是否引用旧数据。

## 尚未完成

浏览器已核对智谱个人版及小米个人版；小米 V2.5、V2.5-Pro 于 10 月 21 日下线，现展示 V2.6。火山文档正文仍待核实。阿里云、Claude、ChatGPT 的完整套餐及站内模型、优惠、文章、榜单尚未逐项比对。还需按内容更新 SOP 使用浏览器核实动态页面，并对照第三方参考仓库寻找遗漏线索；官方信息无法验证时保留待核实状态，不推测价格。已同步 Kimi、MiniMax、OpenCode 的主要详情和首页卡片，以及部分小米模型引用、榜单和优惠内容；旧文章、其余交叉引用与其他渠道仍待核对，不能视为全站同步完成。
