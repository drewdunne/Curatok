import React from 'react';
import PropTypes from 'prop-types';

function CreateUserBox({ handleCreateUser, handleKeyDown, setLoginScreen }) {
  return (
    <>
      <div id="create-user-box">
        <text id="create-user-title">Create Account</text>
        <text id="username-input-title">Username:</text>
        <text id="password-input-title">Password:</text>
        <input id="username-input" type="text" onKeyDown={handleKeyDown} />
        <input id="password-input" type="text" onKeyDown={handleKeyDown} />
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
