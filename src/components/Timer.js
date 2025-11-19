import React, { useState, useEffect } from 'react';

const Timer = ({ onComplete, onClose }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            onComplete();
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
    onClose();
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Focus Session</h3>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: '20px 0' }}>
          {formatTime(minutes, seconds)}
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={toggleTimer}>
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button className="btn-danger" onClick={stopTimer}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;