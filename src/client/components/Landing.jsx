/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import Screens from '../screens';
import TikTokUsernameModal from './TikTokUsernameModal';
import Homepage from './Homepage/Homepage';

function Landing({ initialScreen, username }) {
  const [screen = initialScreen, setScreen] = useState();
  const [scrapedVideos = null, setScrapedVideos] = useState();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (screen === Screens.SignUp) {
        handleCreateUser(e);
      }
      if (screen === Screens.Login) {
        handleLogin(e);
      }
      if (screen === Screens.TikTokUsername) {
        handleGetCollection(e);
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

  const handleGetCollection = async (username) => {
    console.log(initialScreen);
    console.log(`requesting ${username}`);
    const url = `/api/scrape/${username}`;
    const response = await axios.post(url, {
    });
    setScrapedVideos(response);
    setScreen(Screens.Homepage);
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
        <LoginModal
          handleKeyDown={handleKeyDown}
          handleLogin={handleLogin}
          setCreateUserScreen={() => { setScreen(Screens.SignUp); }}
        />
      );
    }
    case Screens.TikTokUsername: {
      return (
        <TikTokUsernameModal
          handleKeyDown={handleKeyDown}
          handleGetCollection={handleGetCollection}
          setHomepageScreen={() => { setScreen(Screens.Homepage); }}
        />
      );
    }
    case Screens.Homepage: {
      console.log(`scrapedVideos is ${scrapedVideos}`);
      if (!scrapedVideos) {
        console.log('inside null check');
        handleGetCollection(username).then(() => (
          <Homepage userVideoCollection={scrapedVideos.data.rows} />
        ));
      } else {
        return <Homepage userVideoCollection={scrapedVideos.data.rows} />;
      }
    }
    default:
      console.log('ERROR, Screen value not handled');
      break;
  }
}

export default Landing;
