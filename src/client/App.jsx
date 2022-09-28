import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Catbox from './components/Catbox';
import Landing from './components/Landing';

function App(props) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await axios.get('http://localhost:8080');
      setTitle(response.data.title);
    };

    fetchTitle()
      .catch(console.error);
  });

  return (
    <>
      <Catbox />
      <h1>{title}</h1>
      <Landing />
    </>
  );
}

export default App;
