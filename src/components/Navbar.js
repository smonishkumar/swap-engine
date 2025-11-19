import React, { useState } from 'react';

const Navbar = ({ currentPage, setCurrentPage, user, onShowAuth, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'scheduler', label: 'Scheduler', icon: 'fas fa-calendar' },
    { id: 'burnout', label: 'Burnout Check', icon: 'fas fa-heart' },
    { id: 'heatmap', label: 'Heatmap', icon: 'fas fa-chart-area' },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
    { id: 'about', label: 'About', icon: 'fas fa-info-circle' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <i className="fas fa-brain"></i>
          <span>SWAP Engine</span>
        </div>
        
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <i className={item.icon}></i> {item.label}
            </div>
          ))}
        </div>
        
        <div className="nav-auth">
          {user ? (
            <button className="btn-secondary" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <button className="btn-primary" onClick={onShowAuth}>
              Login / Signup
            </button>
          )}
        </div>
        
        <div 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;