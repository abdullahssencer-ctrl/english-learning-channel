import { difficultyLevels } from '../data/stories';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Levels({ onLevelClick }) {
  const levels = [
    {
      ...difficultyLevels.beginner,
      icon: '🌱',
      description: 'Temel kelime ve gramer ile başlayın. Basit cümleler ve günlük konuşmalar.',
      stories: '28 hikaye'
    },
    {
      ...difficultyLevels.intermediate,
      icon: '🌿',
      description: 'Karmaşık cümleler ve daha geniş kelime hazinesi. Hikaye anlatımı gelişir.',
      stories: '28 hikaye'
    },
    {
      ...difficultyLevels.advanced,
      icon: '🌳',
      description: 'İleri seviye gramer ve akademik dil. Derin konular ve detaylı anlatımlar.',
      stories: '29 hikaye'
    }
  ];

  return (
    <section id="levels" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Öğrenme Seviyeleri</h2>
          <p className="text-gray-600 text-lg">Kendi seviyenize uygun hikayelerle başlayın</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
              onClick={() => onLevelClick && onLevelClick(level.difficulty)}
            >
              <div className="text-5xl mb-4">{level.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.label}</h3>
              <p className="text-sm text-gray-500 mb-4">Seviye {level.range}</p>
              <p className="text-gray-600 mb-6">{level.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{level.stories}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${level.color}`}>
                  {level.range}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sıralı İlerleme Sistemi</h3>
              <p className="text-gray-600">Her hikaye bir sonraki seviyeye hazırlar. Boşluk bırakmadan ilerleyin.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 font-medium">Tamamlandı</span>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-primary-600"></div>
                <span className="text-gray-700 font-medium">Sıradaki</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
