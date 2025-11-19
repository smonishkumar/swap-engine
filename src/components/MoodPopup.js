import React from 'react';

const MoodPopup = ({ onClose, onMoodSet }) => {
  return (
    <div className="popup" onClick={(e) => e.target.className === 'popup' && onClose()}>
      <div className="popup-content">
        <h3>How was your day today?</h3>
        <div className="mood-options">
          <button className="mood-btn" onClick={() => onMoodSet('good')}>
            🙂 Good
          </button>
          <button className="mood-btn" onClick={() => onMoodSet('okay')}>
            😐 Okay
          </button>
          <button className="mood-btn" onClick={() => onMoodSet('bad')}>
            😔 Bad
          </button>
        </div>
        <button className="btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MoodPopup;