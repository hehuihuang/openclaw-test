'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Globe, ShoppingCart, Clock, BookOpen, TrendingUp, Lock, CheckCircle } from 'lucide-react';
import { jobCategories } from '@/data/questions';
import { loadProgress, UserProgress } from '@/lib/forgetting-curve';

const iconMap: { [key: string]: React.ElementType } = {
  Building2,
  Globe,
  ShoppingCart,
};

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              面试急救包
            </h1>
            <p className="text-xl opacity-90 mb-2">
              商务英语面试突击训练
            </p>
            <p className="text-sm opacity-80 mb-6">
              基于艾宾浩斯遗忘曲线 · 今晚背完 · 明天面试不翻车
            </p>
            
            {/* 遗忘曲线可视化 */}
            <div className="bg-white/10 rounded-xl p-4 mt-6">
              <div className="flex items-end justify-center gap-2 h-24">
                {[100, 58, 44, 36, 26, 22, 23, 21].map((h, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-white/30 rounded-t"
                      style={{ height: `${h}px` }}
                    />
                    <span className="text-xs mt-1 opacity-70">
                      {['刚刚', '20分', '1时', '9时', '1天', '2天', '6天', '31天'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3 opacity-80">
                20分钟后记忆只剩58% · 科学复习对抗遗忘
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 岗位选择 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          选择你的目标岗位
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {jobCategories.map((category) => {
            const Icon = iconMap[category.icon] || Building2;
            return (
              <Link
                key={category.id}
                href={`/jobs/${category.id}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition">
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition" />
                  </div>
                  {progress?.unlocked && progress.purchasedCategory === category.id && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{category.nameEn}</p>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{category.questionCount} 道高频题</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 价值主张 */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            为什么选择我们的训练系统？
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">科学复习时机</p>
                <p className="text-gray-500">在遗忘临界点提醒复习，效率提升3倍</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">高频真题</p>
                <p className="text-gray-500">精选面试官最常问的商务英语问题</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">记忆卡片</p>
                <p className="text-gray-500">翻转卡片+间隔重复，记得更牢</p>
              </div>
            </div>
          </div>
        </div>

        {/* 定价 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm">
            <span className="font-bold">🔥 早鸟价</span>
            <span>资料 9.9元 + 训练解锁 9.9元（原价 19.9+9.9）</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">限时优惠，随时恢复原价</p>
        </div>
      </div>
    </main>
  );
}
