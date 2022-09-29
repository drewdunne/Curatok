import React from 'react';
import PropTypes from 'prop-types';

function CreateUserBox({ handleCreateUser, handleKeyDown, setLoginScreen }) {
  return (
    <>
      <div id="create-user-box">
        <div id="create-user-title">Create Account</div>
        <div id="username-input-title">Username:</div>
        <div id="password-input-title">Password:</div>
        <input id="username-input" onKeyDown={handleKeyDown} />
        <input id="password-input" onKeyDown={handleKeyDown} />
        <input id="submit-login" type="button" value="Create" onClick={handleCreateUser} />
      </div>
      <input id="back-button" type="button" value="Back" onClick={setLoginScreen} />
    </>
  );
}
CreateUserBox.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  setLoginScreen: PropTypes.func.isRequired,
};

export default CreateUserBox;
