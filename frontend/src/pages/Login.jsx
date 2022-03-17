import React, { useState } from 'react';
import {FaSignInAlt} from 'react-icons/fa'
import { toast } from "react-toastify";
toast.configure();

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const onChange=(e)=>{
       setFormData((prevState)=> ({
           ...prevState,
           [e.target.id]: e.target.value
       })) 
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('log in');
    }

    const { email, password} = formData;

    return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/> Log In
            </h1>
            <p>Please log in to your account</p>
        </section>
        <section className="form">
            <form noValidate={false} onSubmit={onSubmit}>
                <div className="form-group">
                    <input className='form-control' type='email' id='email' value={email} onChange={onChange} placeholder="Enter your e-mail" required/>
                </div>
                <div className="form-group">
                    <input className='form-control' type='password' id='password' value={password} onChange={onChange} placeholder="Enter your password" required/>
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
