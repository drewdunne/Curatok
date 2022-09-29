import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catbox from './components/Catbox';
import Landing from './components/Landing';
import Homepage from './components/Homepage/Homepage';

function App(props) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchTitle = async () => {
      const response = await axios.get('/api');

      const getCookie = async () => {
        const response = await axios.get('/api/setcookie');
      };
      setTitle(response.data.title);
    };
    fetchTitle()
      .catch(console.error);
  });

  // setTitle(response.data);

  // getCookie()
  //   .catch(console.log('React getCookie test failed'));

  return (
    <Homepage />
  );
}

export default App;
