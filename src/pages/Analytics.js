import React, { useEffect, useRef } from 'react';

const Analytics = ({ showNotification }) => {
  const studyChartRef = useRef(null);
  const moodChartRef = useRef(null);
  const sleepChartRef = useRef(null);

  useEffect(() => {
    drawChart(studyChartRef.current, [6, 7, 5, 8, 6, 4, 7], 'Study Time (Hours)');
    drawChart(moodChartRef.current, [3.5, 4, 3, 4.5, 4, 3.5, 4], 'Mood Score');
    drawChart(sleepChartRef.current, [7, 6, 8, 7, 6, 7, 8], 'Sleep Hours');
  }, []);

  const drawChart = (canvas, data, title) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / data.length;
    const maxValue = Math.max(...data);
    
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 40);
      const x = index * barWidth;
      const y = canvas.height - barHeight - 20;
      
      // Draw bar
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(x + 10, y, barWidth - 20, barHeight);
      
      // Draw value label
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth/2, y - 5);
    });
    
    // Draw days labels
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.forEach((day, index) => {
      const x = index * barWidth + barWidth/2;
      ctx.fillStyle = '#666';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(day, x, canvas.height - 5);
    });
  };

  const exportAnalytics = () => {
    showNotification('Analytics report exported successfully!', 'success');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Insights into your wellness and productivity patterns</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px' }}>Weekly Study Time</h3>
            <canvas ref={studyChartRef} style={{ maxWidth: '100%', height: '200px' }}></canvas>
          </div>
          
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px' }}>Mood Trend</h3>
            <canvas ref={moodChartRef} style={{ maxWidth: '100%', height: '200px' }}></canvas>
          </div>
          
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '20px' }}>Sleep Consistency</h3>
            <canvas ref={sleepChartRef} style={{ maxWidth: '100%', height: '200px' }}></canvas>
          </div>
        </div>

        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <h3>Weekly Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '30px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>28.5</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hours Studied</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>7.2</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg Sleep Hours</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>3.8</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg Mood Score</span>
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={exportAnalytics}>
          Export Report
        </button>
      </div>
    </div>
  );
};

export default Analytics;