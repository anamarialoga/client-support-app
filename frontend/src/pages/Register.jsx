import React, { useState, useEffect, useContext } from 'react';
import {FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios'
import { AppContext } from '../context/appContext';
toast.configure();

export const Register = () => {
    const {isLogged} = useContext(AppContext);
    const navigate=useNavigate();

    //Once the user is logged in, he cannot access this page again
    useEffect(()=>{
        console.log('Register Page');
        console.log('Is the user logged?', isLogged, 'token: ', localStorage.getItem('token'));
        if(isLogged){
            //directly redirect to Home
            navigate("/me");
        }
    }, [isLogged, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const {name, email, password, password2} = formData;

    const onChange=(e)=>{
       setFormData((prevState)=> ({
           ...prevState,
           [e.target.id]: e.target.value
       })) 
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if(password2 !== password){
            toast.error('Passwords do not match!')
        }else{

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        try {
                const { data } = await axios.post(
                "http://localhost:5000/api/users",
                {
                    name,
                    email,
                    password,
                },
                config
                );
                
                console.log(data);
                toast.success("Registrated with success");
        
                navigate("/login");
          } 
          catch (error) {
                toast.error(error.response.data.message);
          }
        }
    }

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
