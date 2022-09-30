import React from 'react';
import logo from '../assets/curatok.png';

export default function WelcomeBack({ setScreenToHomepage }) {
  return (
    <div className="center">
      <div className="login-modal">
        <div id="welcome-content-box">
          <img id="welcome-logo" src={logo} alt="Curatok Logo" />
          <div id="welcome-back-text">
            Welcome Back!
          </div>
          <input id="welcome-button" onClick={setScreenToHomepage} type="button" value="Enter" />
        </div>
      </div>
    </div>
  );
}
