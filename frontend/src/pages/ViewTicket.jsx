import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Spinner } from "../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const ViewTicket = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [ticket, setTicket]=useState({});
    const {ticketId} = useParams();
    const navigate = useNavigate();

    const fetchTicket = async () => {
        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try{
            const {data} = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`, config);
            setTicket(data);
            setIsLoading(false);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const onTicketClose = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try{
            const {data} = await axios.put(`http://localhost:5000/api/tickets/${ticketId}`,
            {
                status: 'closed'
            }, 
            config);
            setTicket(data);
            setIsLoading(false);
        }catch(error){
            toast.error(error.response.data.message);
        }
    } 

    console.log('Ticket: ', ticket);

    return isLoading === false? (
        <div className='ticket-page'>
            <button className="btn btn-back btn-reverse" onClick={()=>navigate('/tickets')}>
                <FaArrowLeft/>
                Back
            </button>
          <header className='ticket-header'>
            <h2>
              Ticket ID: {ticket._id}
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
            </h2>
            <h3>
              Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className='ticket-desc'>
              <h3>Description of Issue</h3>
              <p>{ticket.description}</p>
            </div>
          </header>
        {ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>
            Close Ticket
            </button>
        )}
        </div>
        ): <Spinner/>
    
}