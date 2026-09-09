import { useState } from 'react';
import { RotateCcw, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { getUserProgress, upsertUserProgress } from '../supabase/progress';
import { flashcardsFromExcel } from '../data/flashcardsFromExcel.js';

export default function Flashcards({ user }) {
  const [selectedLevel, setSelectedLevel] = useState('A1'); // Excel'de A1 verisi var, varsayılan olarak A1
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);

  // Seviye bazlı kelime kartları - Excel'den gelen veriler
  const flashcardLevels = flashcardsFromExcel;

  const flashcards = flashcardLevels[selectedLevel];

  // Seviye değiştiğinde index'i sıfırla
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWords([]);
    setUnknownWords([]);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKnown = async () => {
    // Local state'i güncelle
    setKnownWords([...knownWords, flashcards[currentIndex].id]);
    
    // Kullanıcı giriş yapmışsa Supabase'e kaydet
    if (user) {
      try {
        const progress = await getUserProgress(user.id);
        const learnedWords = progress?.learned_words || [];
        
        if (!learnedWords.includes(flashcards[currentIndex].word)) {
          const updated = [...learnedWords, flashcards[currentIndex].word];
          await upsertUserProgress(user.id, {
            completed_stories: progress?.completed_stories || [],
            quiz_results: progress?.quiz_results || [],
            learned_words: updated
          });
        }
      } catch (error) {
        console.error('Kelime kaydedilirken hata:', error);
      }
    }
    
    handleNext();
  };

  const handleUnknown = () => {
    setUnknownWords([...unknownWords, flashcards[currentIndex].id]);
    handleNext();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWords([]);
    setUnknownWords([]);
  };

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Kelime Kartları</h1>
          <p className="text-gray-600">Henüz kelime kartı bulunmuyor.</p>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelime Kartları</h1>
          <p className="text-gray-600">Kelimeleri öğrenmek için kartları çevirin</p>
          
          {/* Seviye Seçici */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {Object.keys(flashcardLevels).filter(level => flashcardLevels[level].length > 0).map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {level} ({flashcardLevels[level].length})
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Kart {currentIndex + 1} / {flashcards.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <div
            className={`relative w-full h-80 cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front */}
            <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center backface-hidden">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{currentCard.word}</h2>
              {currentCard.type && (
                <p className="text-indigo-600 text-sm font-medium mb-4">{currentCard.type}</p>
              )}
              <p className="text-gray-500 text-sm">Çevirmek için tıklayın</p>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180">
              <h3 className="text-3xl font-bold text-white mb-4">{currentCard.meaning}</h3>
              <p className="text-white/90 text-center italic">"{currentCard.example}"</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Önceki
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleUnknown}
            className="flex items-center gap-2 px-8 py-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            <X className="w-5 h-5" />
            Bilmiyorum
          </button>
          <button
            onClick={handleKnown}
            className="flex items-center gap-2 px-8 py-4 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition-colors"
          >
            <Check className="w-5 h-5" />
            Biliyorum
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{knownWords.length}</p>
            <p className="text-sm text-green-700">Bilen</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{unknownWords.length}</p>
            <p className="text-sm text-red-700">Bilmeyen</p>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}
