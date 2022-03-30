import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
toast.configure();

export const NewTicket = () => {
    const {isLogged, user} = useContext(AppContext);
    const navigate= useNavigate();

    useEffect(()=>{
      console.log('New Ticket Page');
      console.log('Is the user logged?', isLogged);
      console.log('Current user: ', user);
    },[isLogged, user]);

    const [product, setProduct] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async (e)=>{
        e.preventDefault();

        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        
         try{
                const  {data}  = await axios.post(
                "http://localhost:1179/api/tickets",
                {
                    product,
                    description,
                },
                config
                );
                    console.log('data', data);
                    toast.success("Ticket created successfully");
                    navigate('/tickets');
         } 
          catch (error) {
                toast.error(error.response.data.message);
          }
    }

    return (
      <>
        <section className='heading'>
        <button className="btn btn-back btn-reverse" onClick={()=>navigate('/')}>
          <FaArrowLeft/>
          Back
        </button>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={user.name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={user.email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value={""} disabled hidden >Select iProduct...</option>
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
      </>
    )
}
