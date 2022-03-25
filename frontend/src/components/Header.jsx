import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link,  useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate();

    const onLogOut=()=>{
        localStorage.removeItem("token");
        window.location.reload();
        navigate('/login');
      }

    return localStorage.getItem('token') ? (
        <header className='header'>
            <div className="logo">
                    <Link to='/me'>
                        Support Desk
                    </Link>
            </div>
            <ul>
                <li>
                    <button className='btn' onClick={onLogOut}>
                        <FaSignOutAlt/>
                        Log Out
                    </button>
                </li>
            </ul>
        </header>
    ) : (
        <header className='header'>
            <div className="logo">
                    Support Desk
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/>
                        Log In
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <FaUser/>
                        Sign Up
                    </Link>
                </li>
            </ul>
        </header>
    )
};