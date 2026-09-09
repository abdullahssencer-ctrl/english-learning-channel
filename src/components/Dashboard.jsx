import { useState, useEffect } from 'react';
import { BookOpen, ClipboardCheck, TrendingUp, Award, Calendar, Target, Star, Trophy, Flame } from 'lucide-react';
import { getUserProgress, getDailyProgress, getUserBadges } from '../supabase/progress';

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalStories: 0,
    totalQuizzes: 0,
    averageQuizScore: 0,
    learnedWords: 0,
    lastUpdated: null
  });
  const [dailyProgress, setDailyProgress] = useState({
    storiesRead: 0,
    quizzesCompleted: 0,
    wordsLearned: 0
  });
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!user) return;
    loadStats();
    loadDailyProgress();
    loadBadges();
    loadStreak();
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    
    const progress = await getUserProgress(user.id);
    if (progress) {
      const completedStories = progress.completed_stories || [];
      const quizResults = progress.quiz_results || [];
      const learnedWords = progress.learned_words || [];
      
      const totalStories = completedStories.length;
      const totalQuizzes = quizResults.length;
      const averageQuizScore = quizResults.length > 0 
        ? Math.round(quizResults.reduce((sum, q) => sum + q.score, 0) / quizResults.length)
        : 0;
      
      setStats({
        totalStories,
        totalQuizzes,
        averageQuizScore,
        learnedWords: learnedWords.length,
        lastUpdated: progress.last_updated
      });
    }
  };

  const loadDailyProgress = async () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const todayData = await getDailyProgress(user.id, today);
    
    if (todayData) {
      setDailyProgress({
        storiesRead: todayData.stories_read || 0,
        quizzesCompleted: todayData.quizzes_completed || 0,
        wordsLearned: todayData.words_learned || 0
      });
    }
  };

  const loadBadges = async () => {
    if (!user) return;
    
    const earnedBadges = await getUserBadges(user.id);
    const allBadges = calculateBadges();
    const earnedBadgeIds = earnedBadges.map(b => b.badge_id);
    
    setBadges(allBadges.filter(badge => earnedBadgeIds.includes(badge.id)));
  };

  const loadStreak = async () => {
    if (!user) return;
    
    // Basit streak hesaplama - gerçek uygulamada daha karmaşık olabilir
    const today = new Date();
    let currentStreak = 0;
    
    // Bugün aktivite var mı kontrol et
    const todayData = await getDailyProgress(user.id, today.toISOString().split('T')[0]);
    if (todayData && (todayData.stories_read > 0 || todayData.quizzes_completed > 0 || todayData.words_learned > 0)) {
      currentStreak = 1;
      
      // Geçmiş günleri kontrol et
      for (let i = 1; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayData = await getDailyProgress(user.id, dateStr);
        
        if (dayData && (dayData.stories_read > 0 || dayData.quizzes_completed > 0 || dayData.words_learned > 0)) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
    
    setStreak(currentStreak);
  };

  const calculateBadges = () => {
    if (!user) return [];
    
    const badges = [];
    
    // Hikaye rozetleri
    if (stats.totalStories >= 1) badges.push({ id: 'first-story', name: 'İlk Adım', icon: '📖', description: 'İlk hikayeyi okudun' });
    if (stats.totalStories >= 10) badges.push({ id: 'ten-stories', name: 'Hikaye Sever', icon: '📚', description: '10 hikaye okudun' });
    if (stats.totalStories >= 50) badges.push({ id: 'fifty-stories', name: 'Hikaye Ustası', icon: '🏆', description: '50 hikaye okudun' });
    if (stats.totalStories >= 85) badges.push({ id: 'all-stories', name: 'Hikaye Efsanesi', icon: '👑', description: 'Tüm hikayeleri okudun' });
    
    // Sınav rozetleri
    if (stats.totalQuizzes >= 1) badges.push({ id: 'first-quiz', name: 'Sınav Başlangıcı', icon: '📝', description: 'İlk sınavı çözdün' });
    if (stats.totalQuizzes >= 5) badges.push({ id: 'five-quizzes', name: 'Sınav Avcısı', icon: '🎯', description: '5 sınav çözdün' });
    if (stats.totalQuizzes >= 10) badges.push({ id: 'ten-quizzes', name: 'Sınav Ustası', icon: '🎓', description: '10 sınav çözdün' });
    
    // Kelime rozetleri
    if (stats.learnedWords >= 10) badges.push({ id: 'ten-words', name: 'Kelime Toplayıcı', icon: '🔤', description: '10 kelime öğrendin' });
    if (stats.learnedWords >= 50) badges.push({ id: 'fifty-words', name: 'Kelime Ustası', icon: '📝', description: '50 kelime öğrendin' });
    if (stats.learnedWords >= 100) badges.push({ id: 'hundred-words', name: 'Kelime Dehası', icon: '🧠', description: '100 kelime öğrendin' });
    
    // Skor rozetleri
    if (stats.averageQuizScore >= 80) badges.push({ id: 'high-scorer', name: 'Yüksek Skor', icon: '⭐', description: '80%+ ortalama skor' });
    if (stats.averageQuizScore >= 90) badges.push({ id: 'perfect-scorer', name: 'Mükemmel Skor', icon: '💯', description: '90%+ ortalama skor' });
    
    return badges;
  };

  const completionPercentage = Math.round((stats.totalStories / 85) * 100);

  const renderContent = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">İlerleme Paneli</h1>
            <p className="text-gray-600">Öğrenme yolculuğunuzu takip edin</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.totalStories}</span>
              </div>
              <p className="text-gray-600 text-sm">Okunan Hikaye</p>
              <p className="text-xs text-gray-400 mt-1">/ 85 toplam</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ClipboardCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.totalQuizzes}</span>
              </div>
              <p className="text-gray-600 text-sm">Tamamlanan Sınav</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.averageQuizScore}%</span>
              </div>
              <p className="text-gray-600 text-sm">Ortalama Sınav Puanı</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.learnedWords}</span>
              </div>
              <p className="text-gray-600 text-sm">Öğrenilen Kelime</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{badges.length}</span>
              </div>
              <p className="text-gray-600 text-sm">Kazanılan Rozet</p>
            </div>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Genel İlerleme</h2>
              <span className="text-sm text-gray-500">{stats.totalStories} / 85 hikaye</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {completionPercentage < 25 && 'Henüz başlangıç aşamasındasınız. Devam edin!'}
              {completionPercentage >= 25 && completionPercentage < 50 && 'İyi ilerleme! Yarısına yaklaşıyorsunuz.'}
              {completionPercentage >= 50 && completionPercentage < 75 && 'Harika! Yarısını geçtiniz.'}
              {completionPercentage >= 75 && completionPercentage < 100 && 'Mükemmel! Bitime çok yaklaştınız.'}
              {completionPercentage === 100 && 'Tebrikler! Tüm hikayeleri tamamladınız! 🎉'}
            </p>
          </div>

          {/* Son Aktivite */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Son Aktivite</h2>
            </div>
            {stats.lastUpdated ? (
              <p className="text-gray-600">
                Son güncelleme: {new Date(stats.lastUpdated).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            ) : (
              <p className="text-gray-500">Henüz aktivite yok</p>
            )}
          </div>

          {/* Hedefler */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Günlük Hedefler</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Günde 1 hikaye oku</span>
                <span className={`text-sm font-medium ${dailyProgress.storiesRead >= 1 ? 'text-green-600' : 'text-gray-500'}`}>
                  {dailyProgress.storiesRead}/1
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Günde 5 kelime öğren</span>
                <span className={`text-sm font-medium ${dailyProgress.wordsLearned >= 5 ? 'text-green-600' : 'text-gray-500'}`}>
                  {dailyProgress.wordsLearned}/5
                </span>
              </div>
            </div>
          </div>

          {/* Rozetler */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Kazanılan Rozetler</h2>
            </div>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border-2 border-yellow-200">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm">{badge.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Henüz rozet kazanılmadı</p>
                <p className="text-sm text-gray-400 mt-1">Hikaye okuyarak ve sınav çözerek rozet kazanın!</p>
              </div>
            )}
          </div>

          {/* İlerleme Grafikleri */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">İlerleme Grafikleri</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Hikayeler</span>
                  <span>{stats.totalStories}/85</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.totalStories / 85) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Sınavlar</span>
                  <span>{stats.totalQuizzes}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.totalQuizzes / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Kelimeler</span>
                  <span>{stats.learnedWords}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.learnedWords / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Günlük Seri */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">Günlük Seri</h2>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">{streak} Gün</p>
              <p className="text-gray-600 text-sm">Her gün öğrenmeye devam edin!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
}
