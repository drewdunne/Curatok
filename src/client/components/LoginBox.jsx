import React from 'react';
import PropTypes from 'prop-types';

function Loginbox({ handleLogin, handleKeyDown, setCreateUserScreen }) {
  return (
    <>
      <div id="login-box">
        <div id="username-input-title">Username</div>
        <div id="password-input-title">Password</div>
        <input id="username-input" type="text" onKeyDown={handleKeyDown} />
        <input id="password-input" type="text" onKeyDown={handleKeyDown} />
        <input id="submit-login" type="button" value="Enter" onClick={handleLogin} />
      </div>
      <input id="create-account" type="button" value="Create Account" onClick={setCreateUserScreen} />
    </>
  );
}
Loginbox.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setCreateUserScreen: PropTypes.func.isRequired,
};

export default Loginbox;
