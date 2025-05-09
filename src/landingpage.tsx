import React, { useState } from 'react';
import './landingpage.css';
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleTaskClick = () => {
    setShowButtons(true);
  };

  return (
    <div>
      <nav className={navOpen ? 'nav-open' : ''}>
        <div className="menu-btn" onClick={toggleMenu}>
          <div className={`line line--1 ${navOpen ? 'line-cross' : ''}`}></div>
          <div className={`line line--2 ${navOpen ? 'line-fade-out' : ''}`}></div>
          <div className={`line line--3 ${navOpen ? 'line-cross' : ''}`}></div>
        </div>

        <div className={`nav-links ${navOpen ? 'fade-in' : ''}`}>
          <a href="#" className="link">Home</a>
          <a href="#" className="link" onClick={handleTaskClick}>Aufgabe</a>
          <a href="#" className="link">Profile</a>
          <a href="#" className="link">About</a>
        </div>
      </nav>

      <h1>Bridge</h1>

      {showButtons && (
        <div className="buttonsclass" id="buttons" style={{ display: 'flex' }}>
          <button onClick={() => navigate("points", { replace: true })} className="glow-on-hover" type="button">points</button>
          <button onClick={() => navigate("bidding", { replace: true })} className="glow-on-hover" type="button">bidding</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
