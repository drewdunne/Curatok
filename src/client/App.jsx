import React, { useEffect, useState} from 'react'
import Catbox from './components/Catbox.jsx'
import axios from 'axios';


function App(props) {
    const [title, setTitle] = useState('')
    
    useEffect(() => {
      const fetchTitle = async () => {
        const response = await axios.get('http://localhost:8080');
        setTitle(response.data.title);
      }

      fetchTitle()
      .catch(console.error);
    })

    return (
        <>
          <Catbox />
          <h1>{title}</h1>
        </>
    )
}

export default App;