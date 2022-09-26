import React from 'react';
import catTyping from '../assets/typing.gif'

// const catGif = document.getElementById('headerImg');
// catGif.src = catTyping;

// <img id="headerImg" alt="" />

function Catbox(props) {
    return (
        <img id='cat-image' src={catTyping} alt="A cat typing on a keyboard" />
    )
}

export default Catbox;