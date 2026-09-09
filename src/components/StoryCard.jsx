import { Clock, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { memo } from 'react';

function StoryCard({ story, onClick }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'Başlangıç';
      case 'intermediate':
        return 'Orta';
      case 'advanced':
        return 'İleri';
      default:
        return difficulty;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onClick={() => onClick && onClick(story)}
    >
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Hikaye {story.id}</p>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={cn("px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm", getDifficultyColor(story.difficulty))}>
            {getDifficultyLabel(story.difficulty)} - Seviye {story.level}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{story.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{story.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{story.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{story.vocabulary.length} kelime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StoryCard);
