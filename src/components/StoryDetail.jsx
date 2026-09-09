import { ArrowLeft, BookOpen, Clock, Tag, Check, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUserProgress, upsertUserProgress, upsertDailyProgress } from '../supabase/progress';
import VoiceReader from './VoiceReader';

export default function StoryDetail({ story, onBack, user }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    const loadProgress = async () => {
      const progress = await getUserProgress(user.id);
      if (progress) {
        setIsCompleted(progress.completed_stories?.includes(story.id) || false);
        setLearnedWords(progress.learned_words || []);
      }
    };
    
    loadProgress();
  }, [story.id, user]);

  const markAsCompleted = async () => {
    if (!user) return;
    
    try {
      const progress = await getUserProgress(user.id);
      const completedStories = progress?.completed_stories || [];
      
      if (!completedStories.includes(story.id)) {
        const updatedStories = [...completedStories, story.id];
        
        await upsertUserProgress(user.id, {
          completed_stories: updatedStories,
          quiz_results: progress?.quiz_results || [],
          learned_words: progress?.learned_words || []
        });
        
        // Günlük ilerlemeyi güncelle
        const today = new Date().toISOString().split('T')[0];
        const dailyProgress = await upsertDailyProgress(user.id, today, {
          stories_read: (progress?.stories_read || 0) + 1,
          quizzes_completed: 0,
          words_learned: 0
        });
        
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Hikaye tamamlanırken hata:', error);
    }
  };

  const toggleWordLearned = async (word) => {
    if (!user) return;
    
    try {
      const progress = await getUserProgress(user.id);
      const allLearnedWords = progress?.learned_words || [];
      
      if (allLearnedWords.includes(word)) {
        const updated = allLearnedWords.filter(w => w !== word);
        setLearnedWords(updated);
        
        await upsertUserProgress(user.id, {
          completed_stories: progress?.completed_stories || [],
          quiz_results: progress?.quiz_results || [],
          learned_words: updated
        });
      } else {
        const updated = [...allLearnedWords, word];
        setLearnedWords(updated);
        
        await upsertUserProgress(user.id, {
          completed_stories: progress?.completed_stories || [],
          quiz_results: progress?.quiz_results || [],
          learned_words: updated
        });
        
        // Günlük ilerlemeyi güncelle
        const today = new Date().toISOString().split('T')[0];
        const dailyProgress = await upsertDailyProgress(user.id, today, {
          stories_read: 0,
          quizzes_completed: 0,
          words_learned: (progress?.words_learned || 0) + 1
        });
      }
    } catch (error) {
      console.error('Kelime işaretlenirken hata:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Hikayelere Dön
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  story.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  story.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {story.difficulty === 'beginner' ? 'Başlangıç' :
                  story.difficulty === 'intermediate' ? 'Orta' : 'İleri'} - Seviye {story.level}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {isCompleted && (
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Tamamlandı
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
            <p className="text-gray-600 text-lg">{story.description}</p>
          </div>

          <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{story.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{story.vocabulary.length} kelime</span>
            </div>
          </div>

          {story.grammarFocus && (
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Gramer Odak</h3>
              </div>
              <p className="text-blue-800">{story.grammarFocus}</p>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                İngilizce Metin
              </h2>
              <VoiceReader text={story.englishText} language="en-US" />
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.englishText}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Türkçe Çeviri
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.turkishText}</p>
            </div>
          </div>

          {story.vocabulary && story.vocabulary.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6" />
                Kelime Listesi
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {story.vocabulary.map((word, index) => (
                  <div 
                    key={index} 
                    className={`bg-gray-50 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-100 ${
                      learnedWords.includes(word) ? 'border-2 border-yellow-400 bg-yellow-50' : ''
                    }`}
                    onClick={() => toggleWordLearned(word)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{word}</span>
                      {learnedWords.includes(word) && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Kelimeye tıklayarak öğrendi olarak işaretleyin
              </p>
            </div>
          )}

          {!isCompleted && (
            <button
              onClick={markAsCompleted}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Okundu Olarak İşaretle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
