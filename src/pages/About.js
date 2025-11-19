import React from 'react';

const About = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>About SWAP Engine</h1>
        <p>AI-powered wellness and productivity platform</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h2>Our Mission</h2>
          <p>To help students and teachers maintain optimal wellness while maximizing productivity through intelligent insights and personalized recommendations.</p>
        </div>

        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h2>Key Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '30px' }}>
            <div style={{ textAlign: 'center', padding: '30px', background: 'var(--light-color)', borderRadius: '15px' }}>
              <i className="fas fa-brain" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
              <h3 style={{ marginBottom: '15px' }}>Smart Analytics</h3>
              <p>AI-powered insights into your wellness and productivity patterns</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px', background: 'var(--light-color)', borderRadius: '15px' }}>
              <i className="fas fa-calendar-check" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
              <h3 style={{ marginBottom: '15px' }}>Intelligent Scheduling</h3>
              <p>Optimized study schedules based on your energy levels and preferences</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px', background: 'var(--light-color)', borderRadius: '15px' }}>
              <i className="fas fa-shield-heart" style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}></i>
              <h3 style={{ marginBottom: '15px' }}>Burnout Prevention</h3>
              <p>Early detection and prevention of academic burnout</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h2>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'var(--primary-color)', 
                color: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                margin: '0 auto 20px' 
              }}>
                1
              </div>
              <h3 style={{ marginBottom: '15px' }}>Input</h3>
              <p>Log your daily activities, mood, and study sessions</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'var(--primary-color)', 
                color: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                margin: '0 auto 20px' 
              }}>
                2
              </div>
              <h3 style={{ marginBottom: '15px' }}>ML Analysis</h3>
              <p>Our AI analyzes patterns and identifies optimization opportunities</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'var(--primary-color)', 
                color: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                margin: '0 auto 20px' 
              }}>
                3
              </div>
              <h3 style={{ marginBottom: '15px' }}>Recommendations</h3>
              <p>Receive personalized suggestions for better wellness and productivity</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <h2>Team</h2>
          <p>Built with ❤️ by passionate developers for the hackathon</p>
        </div>
      </div>
    </div>
  );
};

export default About;