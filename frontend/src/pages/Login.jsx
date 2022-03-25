import React, { useEffect, useState } from 'react';
import {FaSignInAlt} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

toast.configure();

export const Login = () => {

    const navigate= useNavigate();

    //Once the user is logged in, he cannot access this page again
    useEffect(()=>{
        if(localStorage.getItem('token') ){
            //directly redirect to Home
            navigate("/me");
        }
    }, [navigate])


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password} = formData;

    const onChange=(e)=>{
       setFormData((prevState)=> ({
           ...prevState,
           [e.target.id]: e.target.value
       })) 
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const config = {
            header: {
              "Content-Type": "application/json",
            },
        };

        try {
                const { data } = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    email,
                    password,
                },
                config
                );
                localStorage.setItem('token', data.token);
                console.log(data);
                toast.success("Login with success");
                navigate("/me");
          } 
          catch (error) {
                toast.error('Could not log in user');
          }

    }
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
