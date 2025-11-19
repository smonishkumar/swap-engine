import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import MoodPopup from '../components/MoodPopup';

const Dashboard = ({ user, showNotification }) => {
  const [showTimer, setShowTimer] = useState(false);
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [activities, setActivities] = useState([
    { time: '2 hours ago', text: 'Completed 45min study session' },
    { time: '5 hours ago', text: 'Mood: Good 😊' }
  ]);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    updateRecommendation();
  }, []);

  const updateRecommendation = () => {
    const hour = new Date().getHours();
    let rec;
    
    if (hour < 12) {
      rec = "Good morning! Start with your most challenging subject while your mind is fresh.";
    } else if (hour < 17) {
      rec = "Afternoon energy dip? Try a 40-minute focused session with a 10-minute break.";
    } else {
      rec = "Evening study time! Review what you learned today and plan for tomorrow.";
    }
    
    setRecommendation(rec);
  };

  const addActivity = (activity) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    setActivities(prev => [
      { time: timeString, text: activity },
      ...prev.slice(0, 4)
    ]);
  };

  const handleMoodSet = (mood) => {
    const suggestions = {
      good: "Awesome! Keep the energy going. Want to plan a productive session?",
      okay: "You're doing fine. A small break or short study session might help.",
      bad: "It's okay to slow down. Try a 10-minute walk or music break before studying."
    };
    
    showNotification(suggestions[mood], 'info');
    addActivity(`Mood: ${mood} ${mood === 'good' ? '😊' : mood === 'okay' ? '😐' : '😔'}`);
    setShowMoodPopup(false);
  };

  const handleTimerComplete = () => {
    showNotification('Focus session completed! Great job!', 'success');
    addActivity('Completed 25min focus session');
    setShowTimer(false);
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name || 'User'}!</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="score-cards">
          <div className="score-card wellness">
            <div className="score-gauge-large">
              <div className="gauge-fill" style={{'--percentage': '75%'}}></div>
              <div className="score-content">
                <span className="score-number">75%</span>
                <span className="score-label">Wellness Score</span>
              </div>
            </div>
          </div>
          <div className="score-card productivity">
            <div className="score-gauge-large">
              <div className="gauge-fill" style={{'--percentage': '82%'}}></div>
              <div className="score-content">
                <span className="score-number">82%</span>
                <span className="score-label">Productivity Score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recommendation-card">
          <h3>Today's Recommendation</h3>
          <p>{recommendation}</p>
        </div>

        <div className="quick-inputs">
          <h3>Quick Inputs</h3>
          <div className="input-row">
            <button className="input-btn" onClick={() => setShowMoodPopup(true)}>
              <i className="fas fa-smile"></i> Mood
            </button>
            <button className="input-btn" onClick={() => showNotification('Sleep logging feature coming soon!', 'info')}>
              <i className="fas fa-bed"></i> Sleep
            </button>
            <button className="input-btn" onClick={() => setShowTimer(true)}>
              <i className="fas fa-play"></i> Start Study
            </button>
          </div>
        </div>

        <div className="activity-timeline">
          <h3>Recent Activity</h3>
          <div className="timeline">
            {activities.map((activity, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-time">{activity.time}</span>
                  <span className="timeline-text">{activity.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTimer && (
        <Timer
          onComplete={handleTimerComplete}
          onClose={() => setShowTimer(false)}
        />
      )}

      {showMoodPopup && (
        <MoodPopup
          onClose={() => setShowMoodPopup(false)}
          onMoodSet={handleMoodSet}
        />
      )}
    </div>
  );
};

export default Dashboard;