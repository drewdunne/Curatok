/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import Screens from '../screens';
import TikTokUsernameModal from './TikTokUsernameModal';
import Homepage from './Homepage/Homepage';
import WelcomeBack from './WelcomeBack';

function Landing(props) {
  const [screen = '', setScreen] = useState();
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
  console.log('invoking setup test passed');
  setup();

  async function handleGetCollection(username) {
    const url = `/api/${username}`;
    const response = await axios.post(url, {
    });
    setScrapedVideos(response);
    setScreen(Screens.Homepage);
  }

  async function setup() {
    console.log('inside setup test passed');
    if (screen === '') {
      const cookies = document.cookie;
      console.log(cookies);
      if (!cookies) {
        console.log('setting screen to username');
        setScreen(Screens.TikTokUsername);
      } else {
        const username = cookies.substring(cookies.indexOf('=') + 1, cookies.length);
        console.log(username);
        await handleGetCollection(username);
        setScreen(Screens.WelcomeBack);
      }
    }
  }

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
      return (
        <Homepage userVideoCollection={scrapedVideos.data.rows} />
      );
    }
    case Screens.WelcomeBack: {
      return (
        <WelcomeBack setScreenToHomepage={() => { setScreen(Screens.Homepage); }} />
      );
    }
    default:
      console.log('ERROR, Screen value not handled');
      break;
  }
}

export default Landing;
