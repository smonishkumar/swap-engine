import React, { useState } from 'react';

const BurnoutCheck = ({ showNotification }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      text: "How has your mood been lately?",
      options: [
        { text: "😔 Poor", value: 1 },
        { text: "😐 Okay", value: 2 },
        { text: "🙂 Good", value: 3 },
        { text: "😊 Great", value: 4 }
      ]
    },
    {
      id: 2,
      text: "How many hours did you sleep last night?",
      options: [
        { text: "< 4 hours", value: 1 },
        { text: "4-6 hours", value: 2 },
        { text: "6-8 hours", value: 3 },
        { text: "> 8 hours", value: 4 }
      ]
    },
    {
      id: 3,
      text: "How many hours did you study yesterday?",
      options: [
        { text: "0-2 hours", value: 4 },
        { text: "2-4 hours", value: 3 },
        { text: "4-6 hours", value: 2 },
        { text: "> 6 hours", value: 1 }
      ]
    },
    {
      id: 4,
      text: "How tired do you feel right now?",
      options: [
        { text: "😴 Very tired", value: 4 },
        { text: "😑 Somewhat tired", value: 3 },
        { text: "🙂 A bit tired", value: 2 },
        { text: "😄 Energetic", value: 1 }
      ]
    },
    {
      id: 5,
      text: "Any recent stressors?",
      options: [
        { text: "😰 Many", value: 4 },
        { text: "😟 Some", value: 3 },
        { text: "😐 Few", value: 2 },
        { text: "😌 None", value: 1 }
      ]
    }
  ];

  const selectAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion - 1] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / 5;
    
    let riskLevel, icon, title, description, suggestions;
    
    if (averageScore <= 1.5) {
      riskLevel = 'high';
      icon = '🚨';
      title = 'High Burnout Risk';
      description = 'You may be experiencing significant stress and fatigue.';
      suggestions = [
        'Take a longer break from studying',
        'Practice deep breathing exercises',
        'Consider talking to a counselor',
        'Prioritize sleep and nutrition'
      ];
    } else if (averageScore <= 2.5) {
      riskLevel = 'medium';
      icon = '⚠️';
      title = 'Medium Burnout Risk';
      description = 'You\'re showing some signs of stress. Time to take preventive action.';
      suggestions = [
        'Take regular 10-minute breaks',
        'Try light physical activity',
        'Reduce study hours slightly',
        'Practice relaxation techniques'
      ];
    } else {
      riskLevel = 'low';
      icon = '✅';
      title = 'Low Burnout Risk';
      description = 'You\'re managing stress well! Keep up the good work.';
      suggestions = [
        'Maintain your current routine',
        'Continue regular breaks',
        'Stay hydrated and eat well',
        'Keep monitoring your wellness'
      ];
    }
    
    setResult({ riskLevel, icon, title, description, suggestions });
    setShowResult(true);
    showNotification(`Burnout check: ${title}`, 'info');
  };

  const resetCheck = () => {
    setCurrentQuestion(1);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Burnout Check Results</h1>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{result.icon}</div>
            <h3 style={{ marginBottom: '15px' }}>{result.title}</h3>
            <p style={{ marginBottom: '25px', color: 'var(--text-secondary)' }}>{result.description}</p>
            
            <div style={{ background: 'var(--light-color)', padding: '20px', borderRadius: '10px', marginBottom: '25px', textAlign: 'left' }}>
              <h4 style={{ marginBottom: '15px' }}>Suggestions:</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{suggestion}</li>
                ))}
              </ul>
            </div>
            
            <button className="btn-primary" onClick={resetCheck}>Take Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Burnout Check</h1>
        <p>Quick assessment of your current wellness state</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
            {questions[currentQuestion - 1].text}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {questions[currentQuestion - 1].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${answers[currentQuestion - 1] === option.value ? 'selected' : ''}`}
                style={{
                  padding: '20px',
                  background: answers[currentQuestion - 1] === option.value ? 'var(--primary-color)' : 'var(--light-color)',
                  color: answers[currentQuestion - 1] === option.value ? 'white' : 'var(--text-primary)',
                  border: `2px solid ${answers[currentQuestion - 1] === option.value ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onClick={() => selectAnswer(option.value)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <button 
            className="btn-secondary" 
            onClick={prevQuestion}
            disabled={currentQuestion === 1}
            style={{ opacity: currentQuestion === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          
          <span style={{ fontWeight: '600' }}>
            {currentQuestion} / 5
          </span>
          
          <button 
            className="btn-primary" 
            onClick={nextQuestion}
            disabled={!answers[currentQuestion - 1]}
            style={{ opacity: !answers[currentQuestion - 1] ? 0.5 : 1 }}
          >
            {currentQuestion === 5 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BurnoutCheck;