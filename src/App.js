import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import BurnoutCheck from './pages/BurnoutCheck';
import Heatmap from './pages/Heatmap';
import Analytics from './pages/Analytics';
import About from './pages/About';
import AuthModal from './components/AuthModal';
import Notification from './components/Notification';
import { useAuth } from './hooks/useAuth';
import { useNotification } from './hooks/useNotification';
import apiService from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, login, logout } = useAuth();

  // Initialize API connection on app start
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Verify token and get user info
      apiService.getUserInfo().catch(() => {
        // Token expired, clear it
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      });
    }
  }, []);
  const { notification, showNotification } = useNotification();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} onShowAuth={() => setShowAuthModal(true)} showNotification={showNotification} />;
      case 'dashboard':
        return <Dashboard user={user} showNotification={showNotification} />;
      case 'scheduler':
        return <Scheduler showNotification={showNotification} />;
      case 'burnout':
        return <BurnoutCheck showNotification={showNotification} />;
      case 'heatmap':
        return <Heatmap />;
      case 'analytics':
        return <Analytics showNotification={showNotification} />;
      case 'about':
        return <About />;
      default:
        return <Home user={user} onShowAuth={() => setShowAuthModal(true)} showNotification={showNotification} />;
    }
  };

  return (
    <div className="App">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onShowAuth={() => setShowAuthModal(true)}
        onLogout={logout}
      />
      
      <main>
        {renderPage()}
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={login}
          showNotification={showNotification}
        />
      )}

      {notification && <Notification {...notification} />}
    </div>
  );
}

export default App;