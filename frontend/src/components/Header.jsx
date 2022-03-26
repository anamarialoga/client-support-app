import React from 'react';
import {FaSignInAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { ButtonLogout } from './ButtonLogout';

export const Header = () => {
    return localStorage.getItem('token') ? (
        <header className='header'>
            <div className="logo">
                    <Link to='/me'>
                        Support Desk
                    </Link>
            </div>
             <ul>
                <li>
                    <ButtonLogout/>
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