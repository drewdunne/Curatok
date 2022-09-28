/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loginbox from './Loginbox';
import CreateUserBox from './CreateUserBox';
import Screens from '../screens';

function Landing(props) {
  const [screen = Screens.Login, setScreen] = useState();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (screen === Screens.CreateUser) {
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
    case Screens.Login: {
      return (
        <Loginbox
          handleKeyDown={handleKeyDown}
          handleLogin={handleLogin}
          setCreateUserScreen={() => { setScreen(Screens.CreateUser); }}
        />
      );
    }
    case Screens.CreateUser: {
      return (
        <CreateUserBox
          handleKeyDown={handleKeyDown}
          handleCreateUser={handleCreateUser}
          setLoginScreen={() => { setScreen(Screens.Login); }}
        />
      );
    }
    default:
      console.log('ERROR, Screen value not handled');
      break;
  }
}

export default Landing;
