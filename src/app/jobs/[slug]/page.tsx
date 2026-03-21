'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Lock, BookOpen, Clock, CheckCircle, Play, ChevronRight } from 'lucide-react';
import { getJobCategory, Question } from '@/data/questions';
import { loadProgress, saveProgress, startLearning, UserProgress } from '@/lib/forgetting-curve';

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getJobCategory(slug);
  
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">岗位未找到</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const isUnlocked = progress?.unlocked && progress?.purchasedCategory === slug;
  const previewCount = 3; // 免费预览题目数

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
              <p className="text-sm text-gray-500">{category.nameEn}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 统计信息 */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>{category.questions.length} 道题目</span>
              </div>
              {isUnlocked && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>已解锁训练</span>
                </div>
              )}
            </div>
            {isUnlocked ? (
              <Link
                href={`/jobs/${slug}/training`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                开始训练
              </Link>
            ) : (
              <Link
                href="/unlock"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                解锁训练
              </Link>
            )}
          </div>
        </div>

        {/* 题目列表 */}
        <div className="space-y-3">
          {category.questions.map((question, index) => {
            const isPreview = index < previewCount;
            const isLocked = !isUnlocked && !isPreview;
            const qProgress = progress?.questionProgress[question.id];

            return (
              <div
                key={question.id}
                onClick={() => {
                  if (!isLocked) {
                    setSelectedQuestion(question);
                    if (isUnlocked && !qProgress) {
                      const newProgress = startLearning(progress!, question.id);
                      saveProgress(newProgress);
                      setProgress(newProgress);
                    }
                  }
                }}
                className={`bg-white rounded-xl p-4 shadow-sm border ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'cursor-pointer hover:shadow-md transition'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                      {!isUnlocked && isPreview && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          免费预览
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          解锁后查看
                        </span>
                      )}
                      {qProgress?.status === 'mastered' && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          已掌握
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-800 mb-1">{question.question}</h3>
                    <p className="text-sm text-gray-500">{question.questionCn}</p>
                  </div>
                  {!isLocked && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 解锁提示 */}
        {!isUnlocked && (
          <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">
                  解锁完整训练系统
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    查看全部 {category.questions.length} 道题目和答案
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    遗忘曲线记忆训练（科学复习时机）
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    面试日期提醒和跟进
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    学习进度追踪
                  </li>
                </ul>
                <Link
                  href="/unlock"
                  className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  立即解锁 - ¥9.9
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 题目详情弹窗 */}
      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </main>
  );
}

function QuestionModal({ question, onClose }: { question: Question; onClose: () => void }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400">{question.category}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.question}</h3>
          <p className="text-gray-500 mb-6">{question.questionCn}</p>

          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              查看参考答案
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-gray-800 mb-2">{question.answer}</p>
                <p className="text-sm text-gray-500">{question.answerCn}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {question.keywords.map((keyword) => (
                  <span key={keyword} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {keyword}
                  </span>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                继续下一题
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
