import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catbox from './components/Catbox';
import Landing from './components/Landing';

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


  // getCookie()
  //   .catch(console.log('React getCookie test failed'));

  return (
    <>
      <Catbox />
      <h1>{title}</h1>
      <Landing />
    </>
  );
}

export default App;
