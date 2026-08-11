# 用户行为分析后端 API 示例（Node.js）

## 方案一：使用 Vercel Serverless Functions

### api/analytics.js
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // 存储到数据库（示例使用简单的 JSON 文件）
    const fs = require('fs').promises;
    const path = require('path');

    const filePath = path.join(process.cwd(), 'data', 'analytics.json');
    let analytics = [];

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      analytics = JSON.parse(content);
    } catch (e) {
      // 文件不存在，创建新文件
    }

    analytics.push({
      ...data,
      timestamp: new Date().toISOString()
    });

    // 只保留最近 10000 条记录
    if (analytics.length > 10000) {
      analytics = analytics.slice(-10000);
    }

    await fs.writeFile(filePath, JSON.stringify(analytics, null, 2));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## 方案二：使用 Supabase（推荐）

### 1. 创建表结构
```sql
CREATE TABLE user_analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(100),
  event_type VARCHAR(50),
  event_data JSONB,
  url TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_session_id ON user_analytics(session_id);
CREATE INDEX idx_event_type ON user_analytics(event_type);
CREATE INDEX idx_created_at ON user_analytics(created_at);
```

### 2. API 代码
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sessionId, event, url, referrer, userAgent } = req.body;

  const { error } = await supabase
    .from('user_analytics')
    .insert({
      session_id: sessionId,
      event_type: event.type,
      event_data: event,
      url,
      referrer,
      user_agent: userAgent
    });

  if (error) return res.status(500).json({ error });

  res.status(200).json({ success: true });
}
```

## 方案三：使用 Google Cloud Firestore

```javascript
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  await firestore.collection('analytics').add({
    ...data,
    timestamp: Firestore.FieldValue.serverTimestamp()
  });

  res.status(200).json({ success: true });
}
```

## 数据可视化示例

### 创建简单的分析页面

```html
<!DOCTYPE html>
<html>
<head>
  <title>Analytics Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>用户行为分析</h1>

  <div>
    <h2>点击热力图</h2>
    <canvas id="heatmap" width="800" height="600"></canvas>
  </div>

  <div>
    <h2>滚动深度分布</h2>
    <canvas id="scrollChart"></canvas>
  </div>

  <div>
    <h2>最受欢迎的链接</h2>
    <canvas id="linksChart"></canvas>
  </div>

  <script>
    // 从 API 获取数据
    fetch('/api/analytics/data')
      .then(r => r.json())
      .then(data => {
        renderHeatmap(data);
        renderScrollChart(data);
        renderLinksChart(data);
      });

    function renderHeatmap(data) {
      const canvas = document.getElementById('heatmap');
      const ctx = canvas.getContext('2d');

      // 绘制页面截图作为背景
      const img = new Image();
      img.src = '/screenshot.png';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 800, 600);

        // 绘制点击热点
        const clicks = data.filter(d => d.event_type === 'click');
        clicks.forEach(click => {
          const x = (click.event_data.position.x / click.event_data.viewport.w) * 800;
          const y = (click.event_data.position.y / click.event_data.viewport.h) * 600;

          ctx.beginPath();
          ctx.arc(x, y, 20, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
          ctx.fill();
        });
      };
    }

    function renderScrollChart(data) {
      const scrollEvents = data.filter(d => d.event_type === 'scroll');
      const depths = [25, 50, 75, 90, 100].map(d => ({
        depth: d,
        count: scrollEvents.filter(e => e.event_data.depth >= d).length
      }));

      new Chart(document.getElementById('scrollChart'), {
        type: 'bar',
        data: {
          labels: depths.map(d => d.depth + '%'),
          datasets: [{
            label: '用户数',
            data: depths.map(d => d.count),
            backgroundColor: 'rgba(0, 212, 255, 0.5)'
          }]
        }
      });
    }

    function renderLinksChart(data) {
      const clicks = data.filter(d => d.event_type === 'click' && d.event_data.element.href);
      const linkCounts = {};

      clicks.forEach(click => {
        const href = click.event_data.element.href;
        linkCounts[href] = (linkCounts[href] || 0) + 1;
      });

      const sorted = Object.entries(linkCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      new Chart(document.getElementById('linksChart'), {
        type: 'bar',
        data: {
          labels: sorted.map(([href]) => new URL(href).hostname),
          datasets: [{
            label: '点击次数',
            data: sorted.map(([, count]) => count),
            backgroundColor: 'rgba(0, 255, 136, 0.5)'
          }]
        }
      });
    }
  </script>
</body>
</html>
```

## 部署建议

1. **Vercel**：最简单，免费额度足够
2. **Cloudflare Workers**：全球 CDN，性能好
3. **自建服务器**：完全控制，但需要维护

## 隐私合规

记得在网站添加隐私政策说明：
- 收集哪些数据
- 数据如何使用
- 用户如何选择退出

添加退出追踪的代码：
```javascript
// 检查用户是否选择退出
if (navigator.doNotTrack === '1' || localStorage.getItem('doNotTrack')) {
  console.log('User opted out of tracking');
} else {
  // 初始化追踪
  new UserAnalytics();
}
```
