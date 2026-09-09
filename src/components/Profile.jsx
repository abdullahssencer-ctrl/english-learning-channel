import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, BookOpen, Target, ArrowLeft } from 'lucide-react';
import { getUserProgress } from '../supabase/progress';

export default function Profile({ user, onBack }) {
  const [stats, setStats] = useState({
    totalStories: 0,
    totalQuizzes: 0,
    learnedWords: 0
  });

  useEffect(() => {
    if (!user) return;
    loadStats();
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    
    const progress = await getUserProgress(user.id);
    if (progress) {
      setStats({
        totalStories: progress.completed_stories?.length || 0,
        totalQuizzes: progress.quiz_results?.length || 0,
        learnedWords: progress.learned_words?.length || 0
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Lütfen giriş yapın.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Geri Dön
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Profil</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-indigo-700">{stats.totalStories}</p>
              <p className="text-sm text-indigo-600">Okunan Hikaye</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">{stats.totalQuizzes}</p>
              <p className="text-sm text-green-600">Tamamlanan Sınav</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-700">{stats.learnedWords}</p>
              <p className="text-sm text-purple-600">Öğrenilen Kelime</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hesap Bilgileri</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">E-posta</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Kayıt Tarihi</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
