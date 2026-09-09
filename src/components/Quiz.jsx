import { useState } from 'react';
import { quizData } from '../data/quiz';
import { CheckCircle, XCircle, Clock, Award, RotateCcw } from 'lucide-react';
import { getUserProgress, upsertUserProgress, upsertDailyProgress } from '../supabase/progress';

export default function Quiz({ user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState({});
  const [hasSavedResult, setHasSavedResult] = useState(false);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
    setShowExplanation({
      ...showExplanation,
      [questionId]: true
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct * quizData.pointsPerQuestion;
  };

  const getCorrectCount = () => {
    let correct = 0;
    quizData.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanation({});
    setHasSavedResult(false);
  };

  const saveQuizResult = async (score, correctCount) => {
    if (!user) return;
    
    const progress = await getUserProgress(user.id);
    const quizResults = progress?.quiz_results || [];
    
    quizResults.push({
      quizId: 'A1',
      score,
      correctCount,
      totalQuestions: quizData.totalQuestions,
      completedAt: new Date().toISOString()
    });
    
    await upsertUserProgress(user.id, {
      completed_stories: progress?.completed_stories || [],
      quiz_results: quizResults,
      learned_words: progress?.learned_words || []
    });
    
    // Günlük ilerlemeyi güncelle
    const today = new Date().toISOString().split('T')[0];
    await upsertDailyProgress(user.id, today, {
      stories_read: 0,
      quizzes_completed: (progress?.quizzes_completed || 0) + 1,
      words_learned: 0
    });
  };

  const currentQ = quizData.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;
  const isCorrect = selectedAnswers[currentQ.id] === currentQ.correctAnswer;

  if (showResults) {
    const score = calculateScore();
    const correctCount = getCorrectCount();
    const passed = score >= quizData.passingScore;
    
    // Sonuçları kaydet (sadece bir kez)
    if (!hasSavedResult) {
      saveQuizResult(score, correctCount);
      setHasSavedResult(true);
    }
    
    const resultMessage = quizData.scoreScale.find(
      scale => correctCount >= scale.min && correctCount <= scale.max
    )?.message || "";

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <div className="text-center mb-8">
              {passed ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
              )}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {passed ? "Tebrikler!" : "Sınav Tamamlandı"}
              </h2>
              <div className="text-5xl font-bold text-primary-600 mb-4">
                {score}/{quizData.totalQuestions * quizData.pointsPerQuestion}
              </div>
              <p className="text-gray-600 mb-2">
                {correctCount} doğru, {quizData.totalQuestions - correctCount} yanlış
              </p>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {passed ? "Geçti ✓" : "Kaldı ✗"}
              </div>
            </div>

            <div className={`p-6 rounded-xl mb-6 ${
              passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
            }`}>
              <p className="text-gray-800">{resultMessage}</p>
            </div>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Sınavı Tekrar Çöz</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-100 rounded-full px-4 py-2 mb-4">
            <Clock className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Değerlendirme Sınavı</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A1 Seviye Sınavı</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {quizData.description}
          </p>
        </div>

        <div className="card p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Soru {currentQuestion + 1} / {quizData.questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {answeredCount} cevaplandı
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Soru {currentQ.id}: {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index);
                const isSelected = selectedAnswers[currentQ.id] === optionLetter;
                const isCorrectOption = optionLetter === currentQ.correctAnswer;
                const showResult = showExplanation[currentQ.id];

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(currentQ.id, optionLetter)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showResult
                        ? isCorrectOption
                          ? 'border-green-500 bg-green-50'
                          : isSelected && !isCorrectOption
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                        : isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        showResult
                          ? isCorrectOption
                            ? 'bg-green-500 text-white'
                            : isSelected && !isCorrectOption
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                          : isSelected
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {showResult && isCorrectOption && <CheckCircle className="w-5 h-5" />}
                        {showResult && isSelected && !isCorrectOption && <XCircle className="w-5 h-5" />}
                        {!showResult && optionLetter}
                      </span>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation[currentQ.id] && (
              <div className={`mt-4 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      {isCorrect ? "Doğru!" : "Yanlış!"}
                    </p>
                    <p className="text-sm text-gray-700">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Önceki
            </button>

            {currentQuestion === quizData.questions.length - 1 ? (
              <button
                onClick={() => setShowResults(true)}
                className="btn-primary"
                disabled={answeredCount === 0}
              >
                Sonuçları Gör
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                Sonraki
              </button>
            )}
          </div>

          {/* Question Navigation */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 justify-center">
              {quizData.questions.map((q, index) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = index === currentQuestion;
                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                      isCurrent
                        ? 'bg-primary-600 text-white'
                        : isAnswered
                        ? isCorrect
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Geçiş Notu: {quizData.passingScore} puan ({quizData.passingScore / quizData.pointsPerQuestion} doğru cevap)
          </p>
        </div>
      </div>
    </section>
  );
}
