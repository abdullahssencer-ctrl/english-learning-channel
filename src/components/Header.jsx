import { BookOpen, Home, FileText, ClipboardCheck, BarChart3, LogIn, LogOut, User, Layers, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header({ activeSection, setActiveSection, onDashboardClick, user, onAuthClick, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa', icon: Home, color: 'indigo' },
    { id: 'dashboard', label: 'İlerleme', icon: BarChart3, color: 'indigo', action: onDashboardClick },
    { id: 'flashcards', label: 'Kelime Kartları', icon: Layers, color: 'purple' },
    { id: 'a1-practice', label: 'A1 Pratik', icon: FileText, color: 'green' },
    { id: 'a1-quiz', label: 'A1 Sınav', icon: ClipboardCheck, color: 'green' },
    { id: 'a2-practice', label: 'A2 Pratik', icon: FileText, color: 'purple' },
    { id: 'a2-quiz', label: 'A2 Sınav', icon: ClipboardCheck, color: 'purple' },
    { id: 'b1-practice', label: 'B1 Pratik', icon: FileText, color: 'orange' },
    { id: 'b1-quiz', label: 'B1 Sınav', icon: ClipboardCheck, color: 'orange' },
    { id: 'c1-practice', label: 'C1 Pratik', icon: FileText, color: 'red' },
    { id: 'c1-quiz', label: 'C1 Sınav', icon: ClipboardCheck, color: 'red' },
    { id: 'c2-practice', label: 'C2 Pratik', icon: FileText, color: 'pink' },
    { id: 'c2-quiz', label: 'C2 Sınav', icon: ClipboardCheck, color: 'pink' },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveSection(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 ${darkMode ? 'dark:bg-gray-900' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">English Learning</h1>
              <p className="text-xs text-gray-500 hidden sm:block">85 Hikaye ile İngilizce Öğrenin</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === item.id
                    ? `bg-${item.color}-100 text-${item.color}-700`
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Auth & Theme */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSection('profile')}
                  className="flex items-center gap-2 bg-indigo-100 px-3 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700">Profil</span>
                </button>
                <button
                  onClick={onAuthClick}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <LogIn className="w-4 h-4" />
                Giriş
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === item.id
                      ? `bg-${item.color}-100 text-${item.color}-700`
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors bg-gray-100 hover:bg-gray-200"
              >
                {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
                <span className="text-sm">{darkMode ? 'Aydınlık' : 'Karanlık'}</span>
              </button>
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSection('profile')}
                    className="flex items-center gap-2 bg-indigo-100 px-3 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <User className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-700">Profil</span>
                  </button>
                  <button
                    onClick={onAuthClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <LogIn className="w-4 h-4" />
                  Giriş
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
