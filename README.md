# 面试急救包 - 商务英语面试突击训练

基于遗忘曲线的面试英语记忆训练应用。

> "今晚背完，明天面试不翻车"

## 🚀 项目地址

**GitHub**: https://github.com/hehuihuang/openclaw-test

## ✨ 功能特性

- 📚 **3个岗位分类**: 外企通用 / 外贸销售 / 跨境电商
- 🧠 **遗忘曲线记忆训练**: 科学复习时机（20分钟→1小时→9小时→1天...）
- 💳 **解锁系统**: 资料查看 + 训练解锁付费模式
- 📅 **面试提醒**: 设置面试时间，自动提醒复习
- 📊 **学习统计**: 掌握进度追踪

## 🛠️ 技术栈

- Next.js 16 + TypeScript
- Tailwind CSS
- LocalStorage 数据持久化
- 静态导出（无需后端）

## 📦 本地运行

```bash
# 克隆项目
git clone https://github.com/hehuihuang/openclaw-test.git
cd openclaw-test

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

访问 http://localhost:3000

## 🚀 部署到 Vercel

### 方式1: Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式2: GitHub 集成

1. 在 [Vercel](https://vercel.com) 注册账号
2. 导入 GitHub 仓库
3. 自动部署

## 📁 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页 - 岗位选择
│   ├── layout.tsx            # 根布局
│   ├── globals.css           # 全局样式
│   ├── unlock/
│   │   └── page.tsx          # 解锁/支付页面
│   └── jobs/
│       └── [slug]/
│           ├── page.tsx      # 岗位详情 - 题目列表
│           └── training/
│               └── page.tsx  # 记忆训练页面
├── data/
│   └── questions.ts          # 面试题目数据
└── lib/
    └── forgetting-curve.ts   # 遗忘曲线算法
```

## 💰 商业模式

- **资料查看**: 免费预览3题
- **完整资料**: ¥9.9（早鸟价）
- **记忆训练解锁**: ¥9.9
- **解锁码格式**: `IP-2024-XXXX`

## 📝 数据格式

面试题目数据位于 `src/data/questions.ts`：

```typescript
interface Question {
  id: string;
  category: 'self-intro' | 'experience' | 'skills' | 'scenario' | 'vocabulary';
  question: string;      // 英文问题
  questionCn: string;    // 中文翻译
  answer: string;        // 参考答案
  answerCn: string;      // 中文翻译
  keywords: string[];    // 关键词
  difficulty: 1 | 2 | 3; // 难度
}
```

## 🔄 遗忘曲线复习间隔

基于艾宾浩斯遗忘曲线：

```
20分钟 → 1小时 → 9小时 → 1天 → 2天 → 6天 → 31天
```

## 📱 页面截图

（待补充）

## 🎯 后续优化

- [ ] 接入微信支付
- [ ] 添加更多岗位
- [ ] 语音朗读功能
- [ ] AI 模拟面试
- [ ] 学习社区

## 📄 License

MIT License

---

**Created with OpenClaw + gstack methodology**
