import { useState, useEffect, useCallback, useMemo } from 'react';
import { stories, difficultyLevels } from '../data/stories';
import StoryCard from './StoryCard';
import StoryDetail from './StoryDetail';
import { Filter, Search } from 'lucide-react';

export default function StoryList({ user, initialDifficulty }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);

  // initialDifficulty değiştiğinde filtre güncelle
  useEffect(() => {
    if (initialDifficulty) {
      setSelectedDifficulty(initialDifficulty);
    }
  }, [initialDifficulty]);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesDifficulty = selectedDifficulty === 'all' || story.difficulty === selectedDifficulty;
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           story.vocabulary.some(word => word.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDifficulty && matchesSearch;
    });
  }, [selectedDifficulty, searchQuery]);

  const handleStoryClick = useCallback((story) => {
    console.log('Hikaye tıklandı:', story);
    setSelectedStory(story);
  }, []);

  if (selectedStory) {
    return <StoryDetail story={selectedStory} onBack={() => setSelectedStory(null)} user={user} />;
  }

  return (
    <section id="stories" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hikaye Listesi</h2>
          <p className="text-gray-600 text-lg">85 hikaye, zorluk seviyesine göre filtreleyebilirsiniz</p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm flex-1 max-w-md border border-gray-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Hikaye ara..."
              className="w-full outline-none text-gray-700 bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            >
              <option value="all">Tüm Seviyeler</option>
              <option value="beginner">Başlangıç (1-28)</option>
              <option value="intermediate">Orta (29-56)</option>
              <option value="advanced">İleri (57-85)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStories.map(story => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onClick={handleStoryClick}
            />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aramanıza uygun hikaye bulunamadı.</p>
            <p className="text-gray-400 text-sm mt-2">Filtreleri değiştirerek tekrar deneyin</p>
          </div>
        )}
      </div>
    </section>
  );
}
