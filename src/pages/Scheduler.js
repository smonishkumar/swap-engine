import React, { useState } from 'react';

const Scheduler = ({ showNotification }) => {
  const [formData, setFormData] = useState({
    subject: '',
    priority: 'high',
    timeSlots: []
  });
  const [schedule, setSchedule] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSlotChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      timeSlots: checked 
        ? [...prev.timeSlots, value]
        : prev.timeSlots.filter(slot => slot !== value)
    }));
  };

  const generateSchedule = () => {
    if (!formData.subject || formData.timeSlots.length === 0) {
      showNotification('Please fill in subject and select time slots', 'warning');
      return;
    }

    const times = {
      morning: ['9:00 - 9:40 AM', '9:50 - 10:30 AM'],
      afternoon: ['2:00 - 2:40 PM', '2:50 - 3:30 PM'],
      evening: ['7:00 - 7:40 PM', '7:50 - 8:30 PM']
    };

    const newSchedule = [];
    
    formData.timeSlots.forEach(slot => {
      times[slot].forEach((time, index) => {
        newSchedule.push({
          time,
          subject: formData.subject,
          type: 'Focus Session',
          isBreak: false
        });
        
        if (index === 0) {
          const breakTime = slot === 'morning' ? '9:40 - 9:50 AM' : 
                           slot === 'afternoon' ? '2:40 - 2:50 PM' : '7:40 - 7:50 PM';
          newSchedule.push({
            time: breakTime,
            subject: 'Break',
            type: 'Rest',
            isBreak: true
          });
        }
      });
    });

    setSchedule(newSchedule);
    showNotification('Schedule generated successfully!', 'success');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Smart Scheduler</h1>
        <p>Plan your study sessions intelligently</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3>Add Subjects & Available Time</h3>
          
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics"
            />
          </div>
          
          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleInputChange}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Available Time Slots</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'normal' }}>
                <input
                  type="checkbox"
                  value="morning"
                  onChange={handleTimeSlotChange}
                /> Morning (6-12 PM)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'normal' }}>
                <input
                  type="checkbox"
                  value="afternoon"
                  onChange={handleTimeSlotChange}
                /> Afternoon (12-6 PM)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'normal' }}>
                <input
                  type="checkbox"
                  value="evening"
                  onChange={handleTimeSlotChange}
                /> Evening (6-10 PM)
              </label>
            </div>
          </div>
          
          <button className="btn-primary" onClick={generateSchedule}>
            Generate Schedule
          </button>
        </div>

        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <h3>Your Study Schedule</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {schedule.length > 0 ? schedule.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr',
                  gap: '15px',
                  padding: '15px',
                  background: item.isBreak ? '#fef3c7' : 'var(--light-color)',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${item.isBreak ? 'var(--warning-color)' : 'var(--primary-color)'}`
                }}
              >
                <div style={{ fontWeight: '600' }}>{item.time}</div>
                <div style={{ fontWeight: '500' }}>{item.subject}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.type}</div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                Generate a schedule to see your study plan here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;