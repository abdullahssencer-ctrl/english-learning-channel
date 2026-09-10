import { useState } from 'react';
import { quizA2 } from '../data/quizA2';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Award, RotateCcw } from 'lucide-react';
import { saveQuizResult } from '../supabase/progress';

export default function QuizA2({ user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasSavedResult, setHasSavedResult] = useState(false);

  const handleAnswer = (answerIndex) => {
    if (answeredQuestions[currentQuestion] !== undefined) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === quizA2.questions[currentQuestion].correctAnswer;
    setAnsweredQuestions({ ...answeredQuestions, [currentQuestion]: isCorrect });
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizA2.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions({});
    setShowExplanation(false);
    setHasSavedResult(false);
  };

  const saveQuizResultInternal = async (score, totalQuestions) => {
    if (!user) return;

    const result = {
      quizId: 'A2',
      score,
      correctCount: score,
      totalQuestions,
      completedAt: new Date().toISOString()
    };

    await saveQuizResult(user.id, result);
  };

  const getScoreMessage = () => {
    if (score >= quizA2.scoring.excellent.min) {
      return quizA2.scoring.excellent;
    } else if (score >= quizA2.scoring.good.min) {
      return quizA2.scoring.good;
    } else {
      return quizA2.scoring.needsPractice;
    }
  };

  if (showResult) {
    const scoreMessage = getScoreMessage();
    const percentage = (score / quizA2.questions.length) * 100;
    
    // Sonucu kaydet (sadece bir kez)
    if (!hasSavedResult) {
      saveQuizResultInternal(score, quizA2.questions.length);
      setHasSavedResult(true);
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <Award className="w-20 h-20 mx-auto text-indigo-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sınav Tamamlandı!</h2>
              <p className="text-gray-600">A2 Kapsamlı Değerlendirme Sınavı</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 mb-6">
              <p className="text-white text-5xl font-bold mb-2">{score} / {quizA2.questions.length}</p>
              <p className="text-white/80 text-lg">{percentage.toFixed(0)}%</p>
            </div>

            <div className={`p-6 rounded-xl mb-6 ${
              percentage >= 80 ? 'bg-green-50 border-2 border-green-500' :
              percentage >= 60 ? 'bg-yellow-50 border-2 border-yellow-500' :
              'bg-red-50 border-2 border-red-500'
            }`}>
              <p className={`font-semibold ${
                percentage >= 80 ? 'text-green-700' :
                percentage >= 60 ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {scoreMessage.message}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Sınavı Yeniden Başlat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizA2.questions[currentQuestion];
  const isAnswered = answeredQuestions[currentQuestion] !== undefined;
  const isCorrect = answeredQuestions[currentQuestion] === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{quizA2.title}</h2>
              <p className="text-gray-600 text-sm mt-1">Geçmek için en az {quizA2.passingScore} doğru gerekli</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-600">{currentQuestion + 1}</p>
              <p className="text-gray-500 text-sm">/ {quizA2.questions.length}</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizA2.questions.length) * 100}%` }}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                let buttonClass = 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50';
                let icon = null;

                if (isAnswered) {
                  if (index === question.correctAnswer) {
                    buttonClass = 'border-green-500 bg-green-50';
                    icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                  } else if (index === selectedAnswer && !isCorrect) {
                    buttonClass = 'border-red-500 bg-red-50';
                    icon = <XCircle className="w-5 h-5 text-red-600" />;
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between ${buttonClass} ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="font-medium text-gray-900">{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="bg-indigo-50 rounded-xl p-6 mb-6 animate-in slide-in-from-top duration-300">
              <h4 className="font-semibold text-indigo-900 mb-2">Açıklama:</h4>
              <p className="text-indigo-800 text-sm leading-relaxed">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Önceki
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Doğru:</span>
              <span className="font-bold text-indigo-600">{score}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {currentQuestion === quizA2.questions.length - 1 ? 'Sonuçları Gör' : 'Sonraki'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
