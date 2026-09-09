import { BookOpen, TrendingUp, Flame, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUserProgress, getDailyProgress } from '../supabase/progress';

export default function QuickProgress({ user }) {
  const [progress, setProgress] = useState({
    totalStories: 0,
    dailyStories: 0,
    streak: 0
  });

  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const userProgress = await getUserProgress(user.id);
      const today = new Date().toISOString().split('T')[0];
      const dailyProgress = await getDailyProgress(user.id, today);

      setProgress({
        totalStories: userProgress?.completed_stories?.length || 0,
        dailyStories: dailyProgress?.stories_read || 0,
        streak: 0 // Basit streak hesaplama
      });
    };

    loadProgress();
  }, [user]);

  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Toplam Hikaye</p>
              <p className="text-lg font-bold text-gray-900">{progress.totalStories}/85</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Bugün</p>
              <p className="text-lg font-bold text-gray-900">{progress.dailyStories}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Seri</p>
              <p className="text-lg font-bold text-gray-900">{progress.streak} gün</p>
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="w-32">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>İlerleme</span>
              <span>{Math.round((progress.totalStories / 85) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(progress.totalStories / 85) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}