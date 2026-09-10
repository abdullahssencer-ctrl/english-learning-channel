import { Mail, Heart, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4 text-xl">English Learning</h4>
            <p className="text-gray-400 text-sm">
              85 hikaye ile İngilizce öğrenmenin en eğlenceli yolu. 
              Başlangıçtan ileri seviyeye kadar kademeli ilerleme.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.instagram.com/a1_a2_ingilizce/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://t.me/asencer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>for English learners</span>
          </div>
          <p className="mt-2">© 2024 English Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
