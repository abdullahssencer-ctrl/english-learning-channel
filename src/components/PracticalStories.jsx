import { useState } from 'react';
import { practicalStories } from '../data/practicalStories';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export default function PracticalStories({ user }) {
  const [expandedStory, setExpandedStory] = useState(null);
  const [expandedSentence, setExpandedSentence] = useState(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-100 rounded-full px-4 py-2 mb-4">
            <Lightbulb className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Pratik Hikayeler</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A1 Pratik Hikayeleri</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Öğrendiğiniz dil bilgisi yapılarını kullanarak kendi kendine İngilizceye çevirebileceğiniz pratik hikayeler.
          </p>
        </div>

        <div className="space-y-6">
          {practicalStories.map((story) => (
            <div key={story.id} className="card overflow-hidden">
              <button
                onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-gray-900">{story.title}</h3>
                    <p className="text-sm text-gray-500">{story.grammarFocus}</p>
                  </div>
                </div>
                {expandedStory === story.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedStory === story.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="mt-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Çeviri İpuçları (Vocabulary & Clues):</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.vocabulary.map((word, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {story.sentences.map((sentence, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedSentence(expandedSentence === index ? null : index)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700">Cümle {index + 1}</span>
                          {expandedSentence === index ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        {expandedSentence === index && (
                          <div className="p-4 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-3 bg-red-50 rounded-lg">
                                <p className="text-xs font-medium text-red-800 mb-1">Türkçe:</p>
                                <p className="text-sm text-gray-800">{sentence.turkish}</p>
                              </div>
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-xs font-medium text-blue-800 mb-1">İngilizce:</p>
                                <p className="text-sm text-gray-800">{sentence.english}</p>
                              </div>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                              <p className="text-xs font-medium text-yellow-800 mb-1">📝 Gramer Analizi:</p>
                              <p className="text-sm text-gray-800">{sentence.analysis}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pratik Yapın!</h3>
            <p className="text-gray-600">
              Bu hikayelerle öğrendiğiniz dil bilgisi yapılarını pekiştirin. Her cümleyi dikkatlice inceleyin ve gramer analizlerini okuyun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
