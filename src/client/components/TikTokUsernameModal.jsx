import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/curatok.png';

function TikTokUsernameModal({ handleKeyDown, setHomepageScreen, handleGetCollection }) {
  const [username, setUsername] = React.useState('');

  return (
    <div className="center">
      <div className="login-modal">
        <div className="modal-header">
          <img id="modal-logo" src={logo} alt="Curatok Logo" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
          <span className="material-symbols-outlined">close</span>
        </div>
        <div id="tt-username__content-box">
          <div id="tt-username-description">
            Enter a TikTok username to browse their liked collection
          </div>
          <input id="tt-username-input" placeholder="TikTok Username" onChange={(e) => setUsername(e.target.value)} type="text" value={username} onKeyDown={handleKeyDown(username)} />
          <input id="tt-username__button" onClick={() => handleGetCollection(username)} value="View Collection" type="button" />
          <div id="text-box-username">
            Need a new account?
            <strong><u> Sign up.</u></strong>
          </div>
        </div>
      </div>
    </div>
  );
}

TikTokUsernameModal.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  setHomepageScreen: PropTypes.func.isRequired,
  handleGetCollection: PropTypes.func.isRequired,
};

export default TikTokUsernameModal;
