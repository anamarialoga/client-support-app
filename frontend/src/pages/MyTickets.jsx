import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { AppContext } from '../context/appContext';

export const MyTickets= ()=> {
    console.log('My Tickets Page');

    const {isLogged, user} = useContext(AppContext);
    console.log('Is the user logged?', isLogged);
    console.log('Current user: ', user);

    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading ] = useState(false);

    const fetchMyTickets = async ()=> {
        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try{
            const {data} = await axios.get('http://localhost:5000/api/tickets', config);
            setTickets(data);
            setIsLoading(false);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        fetchMyTickets();
    },[]);

  return isLoading === false ?(
    <>
    <h2>My Tickets</h2>
    <br/>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets?.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  ): <Spinner/>
}
