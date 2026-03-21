// 面试问答数据 - 基于 Derek Callan 商务英语资料整理

export interface Question {
  id: string;
  category: 'self-intro' | 'experience' | 'skills' | 'scenario' | 'closing' | 'vocabulary';
  question: string;
  questionCn: string;
  answer: string;
  answerCn: string;
  keywords: string[];
  difficulty: 1 | 2 | 3;
}

export interface JobCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  questionCount: number;
  questions: Question[];
}

// 通用外企面试 - 基于 Derek Callan 资料
export const generalQuestions: Question[] = [
  // 自我介绍类
  {
    id: "gen-001",
    category: "self-intro",
    question: "Tell me about yourself.",
    questionCn: "请介绍一下你自己。",
    answer: "I'm [Name], a [position] with [X years] of experience in [field]. I specialize in [key skill 1] and [key skill 2]. In my current role at [Company], I [major achievement with numbers].",
    answerCn: "我是[姓名]，一名在[领域]有[X年]经验的[职位]。我专注于[核心技能1]和[核心技能2]。在[公司]的现任职位上，我[具体成就，带数据]。",
    keywords: ["experience", "specialize", "achievement"],
    difficulty: 1
  },
  {
    id: "gen-002",
    category: "self-intro",
    question: "Why do you want to work for our company?",
    questionCn: "你为什么想为我们公司工作？",
    answer: "I've been following your company's growth in [industry/field] and I'm particularly impressed by [specific achievement or value]. I believe my skills in [skill 1] and [skill 2] would contribute to your team's success, especially in [specific area].",
    answerCn: "我一直在关注贵公司在[行业/领域]的发展，对[具体成就或价值观]印象深刻。我相信我的[技能1]和[技能2]能够为团队的成功做出贡献，特别是在[具体领域]。",
    keywords: ["following", "impressed", "contribute"],
    difficulty: 2
  },
  // 工作经验类
  {
    id: "gen-003",
    category: "experience",
    question: "Describe your experience in [field/industry].",
    questionCn: "描述你在[领域/行业]的经验。",
    answer: "I have [X years] of experience in [field], primarily focusing on [main responsibility]. In my current role, I [key responsibility and result]. Previously at [Company], I successfully [achievement with metrics].",
    answerCn: "我在[领域]有[X年]经验，主要负责[主要职责]。在目前的工作中，我[关键职责和成果]。之前在[公司]，我成功[带数据指标的成果]。",
    keywords: ["experience", "focusing", "successfully"],
    difficulty: 2
  },
  {
    id: "gen-004",
    category: "experience",
    question: "Tell me about a time you dealt with a difficult situation at work.",
    questionCn: "告诉我一次你在工作中处理困难情况的经历。",
    answer: "In my previous role, [describe situation]. I had to deal with [challenge] by [action taken]. As a result, [positive outcome with numbers if possible]. I learned that [key takeaway].",
    answerCn: "在之前的工作中，[描述情况]。我通过[采取的行动]处理了[挑战]。结果是[尽可能带数字的积极成果]。我学到的是[关键收获]。",
    keywords: ["dealt with", "situation", "result"],
    difficulty: 2
  },
  // Derek Callan 商务词汇 - 会议动词
  {
    id: "gen-voc-001",
    category: "vocabulary",
    question: "How do you brainstorm solutions in your team?",
    questionCn: "你和团队如何头脑风暴解决方案？",
    answer: "When we need to brainstorm ideas, I like to go round the table and get everyone's input first. Then we review all suggestions and identify the most promising ones to implement.",
    answerCn: "当我们需要头脑风暴时，我喜欢先让大家轮流发言收集意见。然后我们会审查所有建议，找出最有希望的来实施。",
    keywords: ["brainstorm", "go round", "review", "identify", "implement"],
    difficulty: 2
  },
  {
    id: "gen-voc-002",
    category: "vocabulary",
    question: "How do you analyse problems in your work?",
    questionCn: "你在工作中如何分析问题？",
    answer: "I analyse problems by first identifying the root cause. Then I look into possible solutions and approach them systematically. If I can't figure it out immediately, I'll get back to my manager with my findings.",
    answerCn: "我通过首先识别根本原因来分析问题。然后我会调查可能的解决方案，系统地处理。如果我不能立即弄清楚，我会带着发现回复我的经理。",
    keywords: ["analyse", "identify", "look into", "approach", "figure out", "get back to"],
    difficulty: 2
  },
  {
    id: "gen-voc-003",
    category: "vocabulary",
    question: "Tell me about a time you had to deal with a customer complaint.",
    questionCn: "告诉我一次你不得不处理客户投诉的经历。",
    answer: "When a customer complaint came up, I dealt with it immediately. I looked into the issue, figured out what went wrong, and got back to the customer with a solution within 24 hours.",
    answerCn: "当客户投诉出现时，我立即处理了。我调查了问题，弄清楚出了什么错，并在24小时内给客户回复了解决方案。",
    keywords: ["came up", "dealt with", "looked into", "figured out", "got back to"],
    difficulty: 2
  },
  // 技能类
  {
    id: "gen-005",
    category: "skills",
    question: "What are your strengths?",
    questionCn: "你的优势是什么？",
    answer: "My key strengths are [strength 1] and [strength 2]. For example, I [specific example demonstrating strength 1 with result]. This has helped me [benefit to employer].",
    answerCn: "我的核心优势是[优势1]和[优势2]。例如，我[展示优势1的具体例子和结果]。这帮助了我[对雇主的好处]。",
    keywords: ["strengths", "example", "helped"],
    difficulty: 1
  },
  {
    id: "gen-006",
    category: "skills",
    question: "How do you handle pressure or stressful situations?",
    questionCn: "你如何处理压力或紧张的情况？",
    answer: "I handle pressure by [strategy 1] and [strategy 2]. When something urgent comes up, I prioritise tasks and deal with the most critical issues first. I also make sure to set up regular check-ins to avoid last-minute stress.",
    answerCn: "我通过[策略1]和[策略2]来处理压力。当有紧急情况出现时，我会优先处理任务，先处理最关键的问题。我也会确保安排定期检查以避免最后一刻的压力。",
    keywords: ["handle pressure", "comes up", "deal with", "set up"],
    difficulty: 2
  },
  // 情景类
  {
    id: "gen-007",
    category: "scenario",
    question: "What would you do if you disagreed with your manager's decision?",
    questionCn: "如果你不同意经理的决定，你会怎么做？",
    answer: "I would first try to understand their perspective by asking questions. Then I would approach the situation professionally, presenting my concerns with data or examples. If we still disagree, I would finalise my understanding of their decision and support the team's direction.",
    answerCn: "我会首先通过提问来理解他们的观点。然后我会专业地处理这种情况，用数据或例子提出我的顾虑。如果我们仍然不同意，我会敲定对他们决定的理解并支持团队的方向。",
    keywords: ["understand", "approach", "finalise"],
    difficulty: 3
  },
  {
    id: "gen-008",
    category: "scenario",
    question: "How do you prioritize your work when you have multiple deadlines?",
    questionCn: "当你有多个截止日期时，你如何优先处理工作？",
    answer: "I analyse the urgency and importance of each task. I identify which deadlines are fixed and which have flexibility. Then I set up a schedule and if I'm running out of time, I'll ask colleagues to fill in for me on lower-priority tasks.",
    answerCn: "我分析每个任务的紧急性和重要性。我识别哪些截止日期是固定的，哪些有灵活性。然后我安排一个时间表，如果时间快不够了，我会请同事帮我处理低优先级的任务。",
    keywords: ["analyse", "identify", "set up", "running out of", "fill in for"],
    difficulty: 2
  },
  // 结束语类
  {
    id: "gen-009",
    category: "closing",
    question: "Do you have any questions for us?",
    questionCn: "你有什么问题要问我们吗？",
    answer: "Yes, I'd like to know more about [specific aspect: team structure/next steps/company goals]. Also, could you tell me what the typical career progression looks like for this role?",
    answerCn: "是的，我想了解更多关于[具体方面：团队结构/下一步/公司目标]。另外，您能告诉我这个职位典型的职业发展路径是什么样的吗？",
    keywords: ["know more", "career progression"],
    difficulty: 1
  },
  {
    id: "gen-010",
    category: "closing",
    question: "Why should we hire you?",
    questionCn: "我们为什么要雇用你？",
    answer: "You should hire me because I bring [unique skill/experience] that directly addresses [company need]. My track record in [relevant achievement] shows I can deliver results. I'm also excited to implement new ideas and contribute to your team's success.",
    answerCn: "您应该雇用我，因为我带来了直接解决[公司需求]的[独特技能/经验]。我在[相关成就]方面的往绩表明我能交付结果。我也很高兴能够实施新想法并为团队的成功做出贡献。",
    keywords: ["bring", "implement", "contribute"],
    difficulty: 2
  }
];

// 外贸销售岗位
export const foreignTradeQuestions: Question[] = [
  {
    id: "ft-001",
    category: "self-intro",
    question: "Tell me about your experience in international trade.",
    questionCn: "告诉我你在国际贸易方面的经验。",
    answer: "I have [X years] of experience in international trade, specializing in [product category/market]. I've successfully finalised deals with clients from [regions], and I'm familiar with export procedures, customs documentation, and international payment terms like L/C and T/T.",
    answerCn: "我有[X年]的国际贸易经验，专注于[产品类别/市场]。我成功与来自[地区]的客户敲定了交易，熟悉出口程序、海关文件以及信用证和电汇等国际付款方式。",
    keywords: ["international trade", "finalised deals", "export procedures"],
    difficulty: 2
  },
  {
    id: "ft-002",
    category: "experience",
    question: "How do you develop new clients in foreign markets?",
    questionCn: "你如何开发国外市场的新客户？",
    answer: "I identify potential clients through [channels: trade shows/online platforms/referrals]. Then I approach them with tailored proposals, highlighting how our products meet their specific needs. I always get back to prospects within 24 hours to maintain engagement.",
    answerCn: "我通过[渠道：展会/在线平台/推荐]识别潜在客户。然后我用定制的方案接触他们，强调我们的产品如何满足他们的特定需求。我总是会在24小时内回复潜在客户以保持互动。",
    keywords: ["identify", "approach", "get back to"],
    difficulty: 2
  },
  {
    id: "ft-003",
    category: "skills",
    question: "How do you negotiate prices with international clients?",
    questionCn: "你如何与国际客户谈判价格？",
    answer: "I analyse the client's budget and requirements first. Then I set up a negotiation strategy that shows our value proposition. If issues come up, I look into alternative solutions like adjusting payment terms or adding value-added services instead of just cutting prices.",
    answerCn: "我首先分析客户的预算和需求。然后我制定一个展示我们价值主张的谈判策略。如果出现问题，我会调查替代解决方案，比如调整付款条件或增加增值服务，而不是仅仅降价。",
    keywords: ["analyse", "set up", "come up", "look into"],
    difficulty: 3
  },
  {
    id: "ft-004",
    category: "scenario",
    question: "What do you do when a shipment is delayed and the client is angry?",
    questionCn: "当货物延迟且客户生气时，你会怎么做？",
    answer: "I deal with the situation immediately. First, I look into the cause of the delay. Then I get back to the client honestly, explaining the situation and providing a realistic new timeline. I also figure out compensation or discounts to maintain the relationship.",
    answerCn: "我立即处理这种情况。首先，我调查延迟的原因。然后我诚实地回复客户，解释情况并提供现实的新时间表。我也会想出补偿或折扣来维持关系。",
    keywords: ["deal with", "look into", "get back to", "figure out"],
    difficulty: 3
  }
];

// 跨境电商运营岗位
export const ecommerceQuestions: Question[] = [
  {
    id: "ec-001",
    category: "self-intro",
    question: "Tell me about your experience with cross-border e-commerce platforms.",
    questionCn: "告诉我你在跨境电商平台方面的经验。",
    answer: "I've managed stores on [Amazon/AliExpress/eBay] for [X years]. I'm experienced in product listing optimisation, PPC advertising, and inventory management. In my last role, I increased sales by [X]% through data-driven strategies.",
    answerCn: "我在[亚马逊/速卖通/eBay]管理店铺[X年]。我在产品列表优化、PPC广告和库存管理方面有经验。在上一个职位中，我通过数据驱动的策略将销售额提高了[X]%。",
    keywords: ["managed", "optimisation", "increased"],
    difficulty: 2
  },
  {
    id: "ec-002",
    category: "experience",
    question: "How do you analyse product performance and make decisions?",
    questionCn: "你如何分析产品表现并做出决策？",
    answer: "I analyse key metrics like conversion rate, click-through rate, and ROI. I identify top-performing products and figure out why they succeed. For underperforming items, I look into reasons like pricing or reviews, then implement changes to improve.",
    answerCn: "我分析关键指标如转化率、点击率和投资回报率。我识别表现最好的产品并弄清楚它们成功的原因。对于表现不佳的商品，我会调查价格或评论等原因，然后实施改进措施。",
    keywords: ["analyse", "identify", "figure out", "look into", "implement"],
    difficulty: 2
  },
  {
    id: "ec-003",
    category: "scenario",
    question: "What do you do when a product is running out of stock during peak season?",
    questionCn: "当产品在旺季快断货时，你会怎么做？",
    answer: "When we're running out of stock, I immediately contact suppliers to expedite delivery. I also adjust the listing to slow down sales temporarily, like slightly increasing price or showing longer shipping time. I deal with customer service to handle any complaints.",
    answerCn: "当我们快断货时，我立即联系供应商加快交货。我也会调整列表暂时减缓销售，比如稍微提高价格或显示更长的运输时间。我处理客户服务以应对任何投诉。",
    keywords: ["running out of", "deal with"],
    difficulty: 2
  }
];

// 所有岗位数据
export const jobCategories: JobCategory[] = [
  {
    id: "general",
    name: "外企通用",
    nameEn: "General Foreign Enterprise",
    icon: "Building2",
    description: "适用于各类外企面试，包含最常见的英语面试问题和商务词汇",
    questionCount: generalQuestions.length,
    questions: generalQuestions
  },
  {
    id: "foreign-trade",
    name: "外贸销售",
    nameEn: "Foreign Trade Sales",
    icon: "Globe",
    description: "针对外贸业务员、国际销售岗位的面试准备",
    questionCount: foreignTradeQuestions.length,
    questions: foreignTradeQuestions
  },
  {
    id: "ecommerce",
    name: "跨境电商",
    nameEn: "Cross-border E-commerce",
    icon: "ShoppingCart",
    description: "针对亚马逊、速卖通等电商平台运营的面试准备",
    questionCount: ecommerceQuestions.length,
    questions: ecommerceQuestions
  }
];

// 根据ID获取岗位
export function getJobCategory(id: string): JobCategory | undefined {
  return jobCategories.find(cat => cat.id === id);
}

// 根据ID获取问题
export function getQuestion(categoryId: string, questionId: string): Question | undefined {
  const category = getJobCategory(categoryId);
  return category?.questions.find(q => q.id === questionId);
}
