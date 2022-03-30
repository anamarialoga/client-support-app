import React, { useContext, useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa'
import { toast } from "react-toastify";
import { AppContext } from '../context/appContext';
toast.configure();

export const Login = () => {
    const {onChange, onLogin, formData, isLogged} = useContext(AppContext);

    useEffect(()=>{
        console.log('Login Page');
        console.log("Is the user logged?", isLogged, 'token: ', localStorage.getItem('token'));
    },[isLogged]);


    return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/> Log In
            </h1>
            <p>Please log in to your account</p>
        </section>
        <section className="form">
            <form noValidate={false} onSubmit={onLogin}>
                <div className="form-group">
                    <input className='form-control' type='email' id='email' value={formData.email} onChange={onChange} placeholder="Enter your e-mail" required/>
                </div>
                <div className="form-group">
                    <input className='form-control' type='password' id='password' value={formData.password} onChange={onChange} placeholder="Enter your password" required/>
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block' >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
    );
};
