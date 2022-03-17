import React, { useState } from 'react';
import {FaUser} from 'react-icons/fa'
import { toast } from "react-toastify";
toast.configure();

export const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const onChange=(e)=>{
       setFormData((prevState)=> ({
           ...prevState,
           [e.target.id]: e.target.value
       })) 
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(password2 !== password){
            toast.error('Passwords do not match!')
        }
    }

    const {name, email, password, password2} = formData;

    return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Sign Up
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form noValidate={false} onSubmit={onSubmit}>
                <div className="form-group">
                    <input className='form-control' type='text' id='name' value={name} onChange={onChange} placeholder="Enter your name" required/>
                </div>
                <div className="form-group">
                    <input className='form-control' type='email' id='email' value={email} onChange={onChange} placeholder="Enter your e-mail" required/>
                </div>
                <div className="form-group">
                    <input className='form-control' type='password' id='password' value={password} onChange={onChange} placeholder="Enter your password" required/>
                </div>
                <div className="form-group">
                    <input className='form-control' type='password' id='password2' value={password2} onChange={onChange} placeholder="Confirm password" required/>
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
