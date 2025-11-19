import React, { useState } from 'react';
import MoodPopup from '../components/MoodPopup';

const Home = ({ user, onShowAuth, showNotification }) => {
  const [showMoodPopup, setShowMoodPopup] = useState(false);

  const handleDemo = () => {
    showNotification('Demo mode activated! Explore all features.', 'info');
  };

  const handleMoodSet = (mood) => {
    const suggestions = {
      good: "Awesome! Keep the energy going. Want to plan a productive session?",
      okay: "You're doing fine. A small break or short study session might help.",
      bad: "It's okay to slow down. Try a 10-minute walk or music break before studying."
    };
    
    showNotification(suggestions[mood], 'info');
    setShowMoodPopup(false);
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>SWAP Engine</h1>
          <p className="tagline">Stay well. Study smart.</p>
          <p className="value-prop">AI-powered wellness and productivity platform for students and teachers</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onShowAuth}>Get Started</button>
            <button className="btn-secondary" onClick={handleDemo}>Try Demo</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="score-preview">
            <div className="score-gauge">
              <div className="gauge wellness">
                <div className="gauge-fill" style={{'--percentage': '75%'}}></div>
                <span>75%</span>
                <label>Wellness</label>
              </div>
              <div className="gauge productivity">
                <div className="gauge-fill" style={{'--percentage': '82%'}}></div>
                <span>82%</span>
                <label>Productivity</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {user && (
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <button className="action-card" onClick={() => showNotification('Burnout check started!', 'info')}>
              <i className="fas fa-heart-pulse"></i>
              <span>Quick Burnout Check</span>
            </button>
            <button className="action-card" onClick={() => showNotification('Focus session started!', 'success')}>
              <i className="fas fa-play"></i>
              <span>Start Focus Session</span>
            </button>
            <button className="action-card" onClick={() => setShowMoodPopup(true)}>
              <i className="fas fa-smile"></i>
              <span>Add Mood</span>
            </button>
            <button className="action-card" onClick={() => showNotification('Sleep logging feature coming soon!', 'info')}>
              <i className="fas fa-bed"></i>
              <span>Log Sleep</span>
            </button>
          </div>
        </section>
      )}

      <section className="trust-section">
        <p className="stats">70% of students reported improved focus in our pilot program</p>
      </section>

      {showMoodPopup && (
        <MoodPopup
          onClose={() => setShowMoodPopup(false)}
          onMoodSet={handleMoodSet}
        />
      )}
    </div>
  );
};

export default Home;