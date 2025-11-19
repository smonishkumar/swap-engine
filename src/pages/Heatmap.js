import React, { useState, useEffect } from 'react';

const Heatmap = () => {
  const [period, setPeriod] = useState('week');
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    generateHeatmapData();
  }, [period]);

  const generateHeatmapData = () => {
    let days;
    if (period === 'week') days = 7;
    else if (period === 'month') days = 30;
    else days = 90;

    const data = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      const wellness = Math.floor(Math.random() * 100);
      const studyTime = Math.floor(Math.random() * 8) + 1;
      const mood = wellness > 70 ? 'Good 😊' : wellness > 40 ? 'Okay 😐' : 'Poor 😔';
      const sleep = Math.floor(Math.random() * 4) + 5;
      
      data.push({
        date,
        wellness,
        studyTime,
        mood,
        sleep,
        intensity: wellness / 100
      });
    }
    
    setHeatmapData(data);
  };

  const getHeatmapColor = (intensity) => {
    const hue = intensity * 120; // 0 (red) to 120 (green)
    return `hsl(${hue}, 70%, ${50 + intensity * 30}%)`;
  };

  const handleCellClick = (dayData) => {
    setSelectedDay(dayData);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Wellness Heatmap</h1>
        <p>Visual representation of your wellness patterns</p>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '30px' }}>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            style={{ padding: '10px', border: '2px solid var(--border-color)', borderRadius: '8px', fontSize: '1rem' }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">Last 3 Months</option>
          </select>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${period === 'week' ? 7 : period === 'month' ? 10 : 15}, 1fr)`, 
          gap: '5px', 
          marginBottom: '20px' 
        }}>
          {heatmapData.map((day, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '1',
                backgroundColor: getHeatmapColor(day.intensity),
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: day.intensity > 0.5 ? 'white' : 'black'
              }}
              onClick={() => handleCellClick(day)}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          <span>Low</span>
          <div style={{ 
            width: '200px', 
            height: '20px', 
            background: 'linear-gradient(to right, #f3f4f6, var(--wellness-color))', 
            borderRadius: '10px' 
          }}></div>
          <span>High</span>
        </div>

        <div style={{ background: 'var(--light-color)', padding: '20px', borderRadius: '10px' }}>
          <h3>Day Details</h3>
          {selectedDay ? (
            <div>
              <p><strong>Date:</strong> {selectedDay.date.toDateString()}</p>
              <p><strong>Wellness Score:</strong> {selectedDay.wellness}%</p>
              <p><strong>Study Time:</strong> {selectedDay.studyTime} hours</p>
              <p><strong>Mood:</strong> {selectedDay.mood}</p>
              <p><strong>Sleep:</strong> {selectedDay.sleep} hours</p>
            </div>
          ) : (
            <p>Click on any day to see detailed information</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;