import { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from './supabase/config';
import Header from './components/Header';
import Hero from './components/Hero';
import StoryList from './components/StoryList';
import Levels from './components/Levels';
import About from './components/About';
import Footer from './components/Footer';
import QuickProgress from './components/QuickProgress';

// Lazy loading for heavy components
const PracticalStories = lazy(() => import('./components/PracticalStories'));
const Quiz = lazy(() => import('./components/Quiz'));
const PracticalStoriesA2 = lazy(() => import('./components/PracticalStoriesA2'));
const QuizA2 = lazy(() => import('./components/QuizA2'));
const PracticalStoriesB1 = lazy(() => import('./components/PracticalStoriesB1'));
const QuizB1 = lazy(() => import('./components/QuizB1'));
const PracticalStoriesC1 = lazy(() => import('./components/PracticalStoriesC1'));
const QuizC1 = lazy(() => import('./components/QuizC1'));
const PracticalStoriesC2 = lazy(() => import('./components/PracticalStoriesC2'));
const QuizC2 = lazy(() => import('./components/QuizC2'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Auth = lazy(() => import('./components/Auth'));
const Flashcards = lazy(() => import('./components/Flashcards'));
const Profile = lazy(() => import('./components/Profile'));

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [initialDifficulty, setInitialDifficulty] = useState(null);

  useEffect(() => {
    // Mevcut session'ı kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    }).catch(error => {
      console.error('Session alınırken hata:', error);
    });

    // Auth değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleDashboardClick = () => {
    setActiveSection('dashboard');
  };

  const handleAuthClick = () => {
    setShowAuth(true);
  };

  const handleAuthChange = (newUser) => {
    setUser(newUser);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero />
            {user && <QuickProgress user={user} />}
            <Levels />
            <StoryList user={user} />
            <About />
          </>
        );
      case 'dashboard':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <Dashboard user={user} />
          </Suspense>
        );
      case 'flashcards':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <Flashcards user={user} />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <Profile user={user} onBack={() => setActiveSection('dashboard')} />
          </Suspense>
        );
      case 'a1-practice':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <PracticalStories user={user} />
          </Suspense>
        );
      case 'a1-quiz':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <Quiz user={user} />
          </Suspense>
        );
      case 'a2-practice':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <PracticalStoriesA2 user={user} />
          </Suspense>
        );
      case 'a2-quiz':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <QuizA2 user={user} />
          </Suspense>
        );
      case 'b1-practice':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <PracticalStoriesB1 user={user} />
          </Suspense>
        );
      case 'b1-quiz':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <QuizB1 user={user} />
          </Suspense>
        );
      case 'c1-practice':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <PracticalStoriesC1 user={user} />
          </Suspense>
        );
      case 'c1-quiz':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <QuizC1 user={user} />
          </Suspense>
        );
      case 'c2-practice':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <PracticalStoriesC2 user={user} />
          </Suspense>
        );
      case 'c2-quiz':
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
            <QuizC2 user={user} />
          </Suspense>
        );
      default:
        return (
          <>
            <Hero />
            {user && <QuickProgress user={user} />}
            <Levels onLevelClick={(difficulty) => {
              setInitialDifficulty(difficulty);
              setTimeout(() => {
                const element = document.getElementById('stories');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }} />
            <StoryList user={user} initialDifficulty={initialDifficulty} />
            <About />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        user={user}
        onDashboardClick={handleDashboardClick}
        onAuthClick={handleAuthClick}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
      <Footer />
      {showAuth && (
        <Suspense fallback={<div className="flex justify-center items-center py-20">Yükleniyor...</div>}>
          <Auth 
            user={user} 
            onAuthChange={handleAuthChange} 
            onClose={() => setShowAuth(false)} 
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
