import React from 'react'
import { render } from 'react-dom';
import './styles/main.scss'
import App from './App.jsx'
import catTyping from './assets/typing.gif'

const catGif = document.getElementById('headerImg')
catGif.src = catTyping

render(<App />,  document.getElementById('header'));