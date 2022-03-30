import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { AppContext } from '../context/appContext';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MyTickets= ()=> {
    const navigate=useNavigate();
    const {isLogged, user} = useContext(AppContext);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading ] = useState(false);

    const fetchMyTickets = async ()=> {
        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try{
            const response = await axios.get('http://localhost:1179/api/tickets', config)  ;
            if(response.data.length> 0)
            {
              setTickets(response.data);
            }else{
              toast.info('There are no tickets in the queue')
            }
            setIsLoading(false);
        }catch(error){
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(()=>{
        console.log('My Tickets Page');
        console.log('Is the user logged?', isLogged);
        console.log('Current user: ', user);
        setIsLoading(true);
        fetchMyTickets();
    },[user,isLogged]);


    //PAGINATION
    const [pageNumber, setPageNumber] = useState(0);
    const ticketsPerPage = 3;
    const ticketsSeen = pageNumber * ticketsPerPage;
    const pageCount = Math.ceil(tickets.length / ticketsPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

  return isLoading === false ?(
    <>
    <button className="btn btn-back btn-reverse" onClick={()=>navigate('/')}>
        <FaArrowLeft/>
        Back
    </button>
    <h2>My Tickets</h2>
    <br/>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.length > 0 ? (Array.from(tickets)?.slice(ticketsSeen, ticketsSeen + ticketsPerPage).map((ticket) => (
        <TicketItem key={ticket._id} ticket={ticket} /> 
        ))) : (<div>Currently, you did not open any tickets</div>)}
        <ReactPaginate
        previousLabel={'<'}
        nextLabel={tickets.length > 0 ? ">" : ""}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      </div>
    </>
  ): <Spinner/>
}
