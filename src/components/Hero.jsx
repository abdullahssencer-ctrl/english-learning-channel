import { BookOpen, ArrowRight, TrendingUp } from 'lucide-react';

export default function Hero() {
  const handleStoriesClick = () => {
    const element = document.getElementById('stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAboutClick = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 hover:bg-white/30 transition-colors">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">85 Hikaye • 5 Seviye • Sıralı İlerleme</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            İngilizce Öğrenmenin<br />
            <span className="text-yellow-300">En Eğlenceli Yolu</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            En basitten başlayarak, birbirinin devamı olan 85 hikaye ile İngilizcenizi geliştirin. 
            Her hikaye bir sonraki seviyeye hazırlar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              type="button"
              onClick={handleStoriesClick} 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Hikayeleri Okumaya Başla</span>
            </button>
            <button 
              type="button"
              onClick={handleAboutClick} 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-sm"
            >
              <span>Daha Fazla Bilgi</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
