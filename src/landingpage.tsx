import React, { useState } from 'react';
import './landingpage.css';
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  document.body.classList.add('landingpage');
  document.body.classList.remove('exercise');

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleTaskClick = () => {
    setShowButtons(true);
  };

  return (
    <div className="landingpage">
      <nav className={navOpen ? 'nav-open' : ''}>
        <div className="landingpage menu-btn" onClick={toggleMenu}>
          <div className={`line line--1 ${navOpen ? 'line-cross' : ''}`}></div>
          <div className={`line line--2 ${navOpen ? 'line-fade-out' : ''}`}></div>
          <div className={`line line--3 ${navOpen ? 'line-cross' : ''}`}></div>
        </div>

        <div className={`nav-links ${navOpen ? 'fade-in' : ''}`}>
          <a href="#" className="link">Home</a>
          <a href="#" className="link" onClick={handleTaskClick}>Aufgaben</a>
          <a href="#" className="link">Profile</a>
          <a href="#" className="link">About</a>
        </div>
      </nav>

      <h1 className="landingpage">Bridge</h1>

      {showButtons && (
        <div className="buttonsclass" id="buttons" style={{ display: 'flex' }}>
          <button onClick={() => navigate("minorOpening", { replace: true })} className="glow-on-hover" type="button">minor Opening</button>
          <button onClick={() => navigate("points", { replace: true })} className="glow-on-hover" type="button">points</button>
          <button onClick={() => navigate("bidding", { replace: true })} className="glow-on-hover" type="button">bidding</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
