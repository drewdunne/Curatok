/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loginbox from './Loginbox';
import SignUpModal from './CreateUserBox';
import Screens from '../screens';

function Landing(props) {
  const [screen = Screens.Login, setScreen] = useState();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (screen === Screens.SignUp) {
        handleCreateUser(e);
      }
      if (screen === Screen.Login) {
        handleLogin(e);
      }
    }
  };

  const handleLogin = (e) => {
    const attemptLogin = async () => {
      // send post request to login
    };
  };

  const handleCreateUser = (e) => {
    // complete validation and then setScreen(Screens.Homepage);

  };

  switch (screen) {
    case Screens.SignUp: {
      return (
        <SignUpModal
          handleKeyDown={handleKeyDown}
          handleCreateUser={handleCreateUser}
          setLoginScreen={() => { setScreen(Screens.Login); }}
        />
      );
    }
    case Screens.Login: {
      return (
        <Loginbox
          handleKeyDown={handleKeyDown}
          handleLogin={handleLogin}
          setCreateUserScreen={() => { setScreen(Screens.SignUp); }}
        />
      );
    }
    default:
      console.log('ERROR, Screen value not handled');
      break;
  }
}

export default Landing;
