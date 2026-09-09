import { useState } from 'react';
import { practicalStoriesC2 } from '../data/practicalStoriesC2';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, FileText } from 'lucide-react';

export default function PracticalStoriesC2({ user }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [expandedSentence, setExpandedSentence] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-pink-600" />
            C2 Pratik Hikayeler
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            C2 Mastery seviyesinde kusursuz akıcılık, ileri düzey kelime seçimleri ve deyimsel yapıları geliştirin. Her cümlenin detaylı gramer analiziyle öğrenin.
          </p>
        </div>

        {!selectedStory ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicalStoriesC2.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-pink-500 p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{story.title}</h3>
                    <span className="inline-block bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full">
                      {story.grammarFocus}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{story.turkishText}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <button
              onClick={() => setSelectedStory(null)}
              className="mb-6 text-pink-600 hover:text-pink-800 font-medium flex items-center gap-2"
            >
              ← Hikayelere Dön
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedStory.title}</h2>
              <span className="inline-block bg-pink-100 text-pink-700 text-sm px-4 py-2 rounded-full">
                {selectedStory.grammarFocus}
              </span>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Türkçe Metin
              </h3>
              <p className="text-gray-700 leading-relaxed">{selectedStory.turkishText}</p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Çeviri İpuçları
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedStory.vocabulary.map((vocab, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-pink-600">{vocab.turkish}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-gray-700">{vocab.english}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Cümle Cümle Çeviri ve Gramer Analizi
              </h3>
              <div className="space-y-4">
                {selectedStory.sentences.map((sentence, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSentence(expandedSentence === index ? null : index)}
                      className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <div className="text-left flex-1">
                        <p className="text-sm text-gray-500 mb-1">Cümle {index + 1}</p>
                        <p className="font-medium text-gray-900">{sentence.turkish}</p>
                      </div>
                      {expandedSentence === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 ml-4" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 ml-4" />
                      )}
                    </button>
                    {expandedSentence === index && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <div className="mb-4">
                          <p className="text-sm text-pink-600 font-medium mb-1">İngilizce:</p>
                          <p className="text-gray-900 font-semibold">{sentence.english}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pink-600 font-medium mb-1">Gramer Analizi:</p>
                          <p className="text-gray-700 text-sm leading-relaxed">{sentence.grammar}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
