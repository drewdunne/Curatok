import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoginBox(props) {
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    const handleSubmit = (e) => {
        const attemptLogin = async () => {
            // send post request to login
        }

    }

    return (
        <div id='login-box'>
            <text id ='username-input-title'>Username</text>
            <text id ='password-input-title'>Password</text>
            <input id='username-input' type='text' onKeyDown={handleKeyDown} />
            <input id='password-input' type='text' onKeyDown={handleKeyDown} />
            <input id='submit-login' type='button' value='Enter' onClick={handleSubmit}/>
        </div>
    )
}

export default LoginBox;