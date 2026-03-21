'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { getJobCategory } from '@/data/questions';
import { 
  loadProgress, 
  saveProgress, 
  reviewQuestion, 
  getTodayReviews,
  getStudyStats 
} from '@/lib/forgetting-curve';

export default function TrainingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const category = getJobCategory(slug);
  
  const [progress, setProgress] = useState(loadProgress());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'learn' | 'review'>('learn');

  useEffect(() => {
    if (!category) return;
    
    // 检查是否已解锁
    if (!progress.unlocked || progress.purchasedCategory !== slug) {
      router.push(`/jobs/${slug}`);
      return;
    }
  }, [progress, category, slug, router]);

  if (!category) {
    return <div>岗位未找到</div>;
  }

  const questionIds = category.questions.map(q => q.id);
  const todayReviews = getTodayReviews(progress, questionIds);
  
  // 确定学习模式
  const reviewQuestions = todayReviews.map(id => category.questions.find(q => q.id === id)!).filter(Boolean);
  const newQuestions = category.questions.filter(q => !progress.questionProgress[q.id]);
  
  const questionsToStudy = mode === 'review' && reviewQuestions.length > 0 
    ? reviewQuestions 
    : newQuestions.length > 0 ? newQuestions : category.questions;
  
  const currentQuestion = questionsToStudy[currentIndex];
  const qProgress = currentQuestion ? progress.questionProgress[currentQuestion.id] : null;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">太棒了！</h2>
          <p className="text-gray-600 mb-4">今天没有需要复习的内容了</p>
          <Link 
            href={`/jobs/${slug}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            返回题目列表
          </Link>
        </div>
      </div>
    );
  }

  const handleResult = (result: 'remembered' | 'forgot') => {
    const newProgress = reviewQuestion(progress, currentQuestion.id, result);
    saveProgress(newProgress);
    setProgress(newProgress);
    
    // 下一题
    if (currentIndex < questionsToStudy.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // 完成
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  };

  const stats = getStudyStats(progress);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/jobs/${slug}`} className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-semibold text-gray-800">记忆训练</h1>
                <p className="text-xs text-gray-500">{category.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{currentIndex + 1} / {questionsToStudy.length}</span>
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="mt-3 flex gap-1">
            {questionsToStudy.map((_, i) => (
              <div 
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < currentIndex ? 'bg-green-500' : 
                  i === currentIndex ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 模式切换 */}
      {todayReviews.length > 0 && (
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => { setMode('review'); setCurrentIndex(0); setShowAnswer(false); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                mode === 'review' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'bg-white text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" />
                今日复习 ({todayReviews.length})
              </div>
            </button>
            <button
              onClick={() => { setMode('learn'); setCurrentIndex(0); setShowAnswer(false); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                mode === 'learn' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-600'
              }`}
            >
              学习新题
            </button>
          </div>
        </div>
      )}

      {/* 学习卡片 */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {/* 卡片头部 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-80">{currentQuestion.category}</span>
              {qProgress && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded">
                  第 {qProgress.reviewCount + 1} 次复习
                </span>
              )}
            </div>
          </div>

          {/* 问题部分 */}
          <div className="p-6 min-h-[200px] flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {currentQuestion.question}
            </h2>
            <p className="text-gray-500">{currentQuestion.questionCn}</p>
          </div>

          {/* 答案部分 */}
          {showAnswer && (
            <div className="border-t bg-gray-50 p-6 animate-in slide-in-from-bottom-2">
              <h3 className="font-medium text-gray-800 mb-2">参考答案</h3>
              <p className="text-gray-700 mb-2">{currentQuestion.answer}</p>
              <p className="text-sm text-gray-500 mb-4">{currentQuestion.answerCn}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {currentQuestion.keywords.map((keyword) => (
                  <span key={keyword} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {keyword}
                  </span>
                ))}
              </div>

              {/* 自评按钮 */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleResult('forgot')}
                  className="flex items-center justify-center gap-2 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  <XCircle className="w-5 h-5" />
                  忘记了
                </button>
                <button
                  onClick={() => handleResult('remembered')}
                  className="flex items-center justify-center gap-2 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                >
                  <CheckCircle className="w-5 h-5" />
                  记得
                </button>
              </div>
            </div>
          )}

          {/* 显示答案按钮 */}
          {!showAnswer && (
            <div className="p-4 border-t">
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                显示答案
              </button>
            </div>
          )}
        </div>

        {/* 学习统计 */}
        <div className="mt-6 grid grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.totalQuestions}</div>
            <div className="text-xs text-gray-500">学习中</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.mastered}</div>
            <div className="text-xs text-gray-500">已掌握</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{stats.reviewing}</div>
            <div className="text-xs text-gray-500">复习中</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{todayReviews.length}</div>
            <div className="text-xs text-gray-500">待复习</div>
          </div>
        </div>

        {/* 遗忘曲线提示 */}
        {qProgress && mode === 'review' && (
          <div className="mt-4 bg-blue-50 rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">遗忘曲线复习</p>
              <p className="text-blue-600">
                下次复习: {new Date(qProgress.nextReviewAt).toLocaleString('zh-CN', { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
