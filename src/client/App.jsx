import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catbox from './components/Catbox';
import Landing from './components/Landing';
import Homepage from './components/Homepage/Homepage';
import Screens from './screens';

function App(props) {
  const [initialScreen, setInitialScreen] = useState('');
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  async function checkForCookies() {
    console.log('checking for cookies');
    const result = await axios.get('/api/cookie');
    console.log('result for server:');
    console.log(result);
    if (result.data.hasCookies) {
      setUsername(result.data.username);
      console.log('cookies');
      console.log(`${username}`);
      setInitialScreen(Screens.Homepage);
    }
    console.log('no cookies');
    setInitialScreen(Screens.TikTokUsername);
  }
  if (!initialScreen && !username) {
    checkForCookies();
  }
  if (username && !initialScreen) {
    setInitialScreen(Screens.Homepage);
  }
  console.log(`after reloading component for initialState, value of username is ${username}`);
  console.log(initialScreen);
  if (initialScreen) {
    return (
      <Landing initialScreen={initialScreen} username={username} />
    );
  }
}

export default App;
