import { BookOpen, Home, FileText, ClipboardCheck, BarChart3, LogIn, LogOut, User, Layers, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import XPBar from './XPBar';

export default function Header({ activeSection, setActiveSection, onDashboardClick, user, onAuthClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [levelsMenuOpen, setLevelsMenuOpen] = useState(false);
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  const mainNavItems = [
    { id: 'home', label: 'Ana Sayfa', icon: Home, color: 'indigo' },
    { id: 'dashboard', label: 'İlerleme', icon: BarChart3, color: 'indigo', action: onDashboardClick },
    { id: 'flashcards', label: 'Kelime Kartları', icon: Layers, color: 'purple' },
  ];

  const levels = [
    { key: 'a1', label: 'A1', color: 'green' },
    { key: 'a2', label: 'A2', color: 'purple' },
    { key: 'b1', label: 'B1', color: 'orange' },
    { key: 'c1', label: 'C1', color: 'red' },
    { key: 'c2', label: 'C2', color: 'pink' },
  ];

  const levelNavItems = levels.flatMap((level) => [
    { id: `${level.key}-practice`, label: `${level.label.toUpperCase()} Pratik`, icon: FileText, color: level.color },
    { id: `${level.key}-quiz`, label: `${level.label.toUpperCase()} Sınav`, icon: ClipboardCheck, color: level.color },
  ]);

  // Mobil menü hepsini tek listede düz gösterir
  const navItems = [...mainNavItems, ...levelNavItems];

  const isLevelSectionActive = levelNavItems.some((item) => item.id === activeSection);

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveSection(item.id);
    }
    setMobileMenuOpen(false);
    setLevelsMenuOpen(false);
  };

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 ${darkMode ? 'dark:bg-gray-900' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-indigo-600 flex-shrink-0" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">English Learning</h1>
              <p className="text-xs text-gray-500 hidden sm:block">85 Hikaye ile İngilizce Öğrenin</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === item.id
                    ? `bg-${item.color}-100 text-${item.color}-700`
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            {/* Seviyeler dropdown */}
            <div className="relative">
              <button
                onClick={() => setLevelsMenuOpen((open) => !open)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  isLevelSectionActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                Seviyeler
                <ChevronDown className={`w-4 h-4 transition-transform ${levelsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {levelsMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLevelsMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-50">
                    <div className="grid grid-cols-2 gap-2">
                      {levelNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
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
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Auth & Theme */}
          <div className="hidden lg:flex items-center gap-3">
            {user && <XPBar />}
            <button
              onClick={() => toggleDarkMode()}
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
          <div className="lg:hidden py-4 border-t border-gray-200">
            {user && (
              <div className="mb-4">
                <XPBar />
              </div>
            )}
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
                onClick={() => toggleDarkMode()}
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
