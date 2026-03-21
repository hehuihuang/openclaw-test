// 遗忘曲线算法 - 基于艾宾浩斯遗忘曲线

// 复习间隔（分钟）
export const FORGETTING_CURVE_INTERVALS = [
  20,      // 20分钟后
  60,      // 1小时后
  540,     // 9小时后
  1440,    // 1天后
  2880,    // 2天后
  8640,    // 6天后
  44640,   // 31天后
];

// 用户学习记录
export interface UserProgress {
  unlocked: boolean;
  unlockedAt?: number;
  purchasedCategory?: string;
  interviewDate?: number;
  hasInterviewReminder: boolean;
  questionProgress: {
    [questionId: string]: QuestionProgress;
  };
  totalStudyTime: number;
  masteredCount: number;
  currentStreak: number;
  lastStudyDate?: string;
}

export interface QuestionProgress {
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  learnedAt: number;
  reviewCount: number;
  nextReviewAt: number;
  lastReviewedAt?: number;
  correctStreak: number;
}

// 初始化用户进度
export function initUserProgress(): UserProgress {
  return {
    unlocked: false,
    hasInterviewReminder: false,
    questionProgress: {},
    totalStudyTime: 0,
    masteredCount: 0,
    currentStreak: 0,
  };
}

// 从 localStorage 加载进度
export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return initUserProgress();
  
  const stored = localStorage.getItem('interview-prep-progress');
  if (stored) {
    return JSON.parse(stored);
  }
  return initUserProgress();
}

// 保存进度到 localStorage
export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('interview-prep-progress', JSON.stringify(progress));
}

// 解锁训练
export function unlockTraining(progress: UserProgress, categoryId: string): UserProgress {
  return {
    ...progress,
    unlocked: true,
    unlockedAt: Date.now(),
    purchasedCategory: categoryId,
  };
}

// 设置面试时间
export function setInterviewDate(progress: UserProgress, date: Date): UserProgress {
  return {
    ...progress,
    interviewDate: date.getTime(),
    hasInterviewReminder: true,
  };
}

// 开始学习一个新问题
export function startLearning(progress: UserProgress, questionId: string): UserProgress {
  const now = Date.now();
  const existing = progress.questionProgress[questionId];
  
  if (existing) return progress;
  
  return {
    ...progress,
    questionProgress: {
      ...progress.questionProgress,
      [questionId]: {
        status: 'learning',
        learnedAt: now,
        reviewCount: 0,
        nextReviewAt: now + FORGETTING_CURVE_INTERVALS[0] * 60 * 1000, // 20分钟后
        correctStreak: 0,
      },
    },
  };
}

// 复习一个问题
export function reviewQuestion(
  progress: UserProgress,
  questionId: string,
  result: 'remembered' | 'forgot'
): UserProgress {
  const now = Date.now();
  const existing = progress.questionProgress[questionId];
  
  if (!existing) return progress;
  
  let correctStreak = result === 'remembered' ? existing.correctStreak + 1 : 0;
  let reviewCount = existing.reviewCount + 1;
  let status: QuestionProgress['status'] = existing.status;
  
  // 连续答对3次，标记为已掌握
  if (correctStreak >= 3) {
    status = 'mastered';
  } else if (reviewCount >= 1) {
    status = 'reviewing';
  }
  
  // 计算下次复习时间
  let nextReviewAt: number;
  
  if (result === 'forgot') {
    // 忘记了，从头开始
    nextReviewAt = now + FORGETTING_CURVE_INTERVALS[0] * 60 * 1000;
    reviewCount = 0;
  } else {
    // 记得，进入下一个间隔
    const intervalIndex = Math.min(reviewCount, FORGETTING_CURVE_INTERVALS.length - 1);
    const intervalMinutes = FORGETTING_CURVE_INTERVALS[intervalIndex];
    nextReviewAt = now + intervalMinutes * 60 * 1000;
  }
  
  const updatedProgress: QuestionProgress = {
    ...existing,
    status,
    reviewCount,
    nextReviewAt,
    lastReviewedAt: now,
    correctStreak,
  };
  
  return {
    ...progress,
    questionProgress: {
      ...progress.questionProgress,
      [questionId]: updatedProgress,
    },
    masteredCount: calculateMasteredCount({
      ...progress.questionProgress,
      [questionId]: updatedProgress,
    }),
  };
}

// 计算已掌握的题目数
function calculateMasteredCount(questionProgress: { [key: string]: QuestionProgress }): number {
  return Object.values(questionProgress).filter(q => q.status === 'mastered').length;
}

// 获取今日待复习的题目
export function getTodayReviews(
  progress: UserProgress,
  questionIds: string[]
): string[] {
  const now = Date.now();
  
  return questionIds.filter(id => {
    const q = progress.questionProgress[id];
    if (!q) return false;
    if (q.status === 'mastered') return false;
    return q.nextReviewAt <= now;
  });
}

// 获取学习统计
export function getStudyStats(progress: UserProgress) {
  const questions = Object.values(progress.questionProgress);
  
  return {
    totalQuestions: questions.length,
    mastered: questions.filter(q => q.status === 'mastered').length,
    learning: questions.filter(q => q.status === 'learning').length,
    reviewing: questions.filter(q => q.status === 'reviewing').length,
    new: questions.filter(q => q.status === 'new').length,
  };
}

// 遗忘曲线数据（用于图表展示）
export const forgettingCurveData = [
  { time: '刚刚', retention: 100 },
  { time: '20分钟', retention: 58 },
  { time: '1小时', retention: 44 },
  { time: '9小时', retention: 36 },
  { time: '1天', retention: 26 },
  { time: '2天', retention: 22 },
  { time: '6天', retention: 23 },
  { time: '31天', retention: 21 },
];

// 解锁码验证（简化版）
export function verifyUnlockCode(code: string): boolean {
  // 简化验证：以 IP-2024- 开头且长度为12位
  return /^IP-2024-[A-Z0-9]{4}$/.test(code);
}

// 生成解锁码（用于手动发放）
export function generateUnlockCode(): string {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `IP-2024-${random}`;
}
