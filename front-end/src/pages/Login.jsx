import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken, setID, setAdmin } from './Auth';
import './Login.css';

export default function LoginPage(props) {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onClickLogin();
    };

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onClickLogin = () => {
        if (!inputId) {
            setErrorMessage('Please enter your ID.');
            return;
        }
        if (!inputPw) {
            setErrorMessage('Please enter your password.');
            return;
        }

        axios.post("api/user/login", {
            UserID: inputId,
            Password: inputPw,
        })
            .then((res) => {
                if (res.data.accessToken) {
                    setToken(res.data.accessToken);
                    setID(res.data.UserID);
                    setAdmin(res.data.Admin);
                    navigate("/main");

                }
            })
            .catch(() => {
                setErrorMessage('아이디 혹은 비밀번호가 틀렸습니다.');
            });
    };

    return (
        <div className="page">
            <div className="container">
                <div className="left" style={{ borderRadius: '40px' }}>
                    <div className="login">Login</div>
                    <div className="eula">
                        <li>New Here?</li>
                        <li>Enter your personal detail and start journey with us </li>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/">Home</Link></li>
                    </div>
                </div>
                <div className="right" style={{ borderRadius: '40px' }}>
                    {/* ... other UI elements ... */}
                    <form onSubmit={onFormSubmit} style={{ margin: '42px' }}>
                        <label className='llabel' htmlFor="id">ID:</label>
                        <input className='linput' style={{ border: 'inset', marginTop: '10px' }} type="text" id="id" value={inputId} onChange={handleInputId} />
                        <label className='llabel' htmlFor="password">Password:</label>
                        <input className='linput' style={{ border: 'inset', marginTop: '10px' }} type="password" id="password" value={inputPw} onChange={handleInputPw} />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <input className='linput' style={{ background: 'none' }} type="submit" id="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}