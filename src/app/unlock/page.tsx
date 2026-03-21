'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, CheckCircle, MessageCircle, QrCode } from 'lucide-react';
import { loadProgress, saveProgress, unlockTraining, verifyUnlockCode, generateUnlockCode } from '@/lib/forgetting-curve';

export default function UnlockPage() {
  const [unlockCode, setUnlockCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(loadProgress());

  const handleUnlock = () => {
    if (verifyUnlockCode(unlockCode)) {
      const newProgress = unlockTraining(progress, 'general'); // 默认解锁通用岗位
      saveProgress(newProgress);
      setProgress(newProgress);
      setSuccess(true);
      setError('');
    } else {
      setError('解锁码无效，请检查后重试');
      setSuccess(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">解锁完整训练系统</h1>
          <p className="text-gray-500">购买后输入解锁码，立即开始科学记忆训练</p>
        </div>

        {/* 价格卡片 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">面试资料 + 记忆训练</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-orange-600">¥9.9</span>
              <span className="text-sm text-gray-400 line-through ml-2">¥29.8</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">全部高频面试题目（30+ 道）</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">遗忘曲线记忆训练系统</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">面试日期提醒与跟进</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">学习进度追踪</span>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-orange-800 font-medium mb-2">
              <span>🔥</span>
              <span>限时早鸟价</span>
            </div>
            <p className="text-sm text-orange-600">
              原价 ¥29.8，限时特惠仅需 ¥9.9，随时恢复原价
            </p>
          </div>
        </div>

        {/* 购买方式 */}
        {!success && (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                支付方式
              </h3>
              
              {/* 收款二维码区域 */}
              <div className="bg-gray-100 rounded-xl p-8 text-center mb-4">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">收款码</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">微信支付 ¥9.9</p>
                <p className="text-xs text-gray-500">付款后截图发送给客服获取解锁码</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>客服微信: xiaoxue9985211</span>
              </div>
            </div>

            {/* 解锁码输入 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-4">输入解锁码</h3>
              <input
                type="text"
                value={unlockCode}
                onChange={(e) => setUnlockCode(e.target.value.toUpperCase())}
                placeholder="IP-2024-XXXX"
                className="w-full px-4 py-3 border rounded-lg mb-3 text-center tracking-wider font-mono"
              />
              {error && (
                <p className="text-red-500 text-sm mb-3">{error}</p>
              )}
              <button
                onClick={handleUnlock}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                立即解锁
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                解锁码格式: IP-2024-XXXX
              </p>
            </div>
          </>
        )}

        {/* 解锁成功 */}
        {success && (
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">解锁成功！</h3>
            <p className="text-green-600 mb-4">你现在可以使用完整的记忆训练系统了</p>
            <Link
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              开始学习
            </Link>
          </div>
        )}

        {/* 说明 */}
        <div className="mt-6 text-xs text-gray-500 space-y-1">
          <p>• 解锁后永久有效，无需再次付费</p>
          <p>• 支持3天无理由退款</p>
          <p>• 有问题请联系客服微信</p>
        </div>
      </div>
    </main>
  );
}
