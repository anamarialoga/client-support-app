import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Spinner } from "../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import NoteItem from "../components/NoteItem";
import Modal from 'react-modal';
import ReactPaginate from "react-paginate";

Modal.setAppElement('body');

export const ViewTicket = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [ticket, setTicket]=useState({});
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {ticketId} = useParams();
    const navigate = useNavigate();

    const openModal = () => {setModalIsOpen(true)};
    const closeModal = () => {setModalIsOpen(false)};

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

    const fetchTicketNoes = async()=>{
        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try{
            const response = await axios.get(`http://localhost:5000/api/tickets/${ticketId}/notes`, config)  ;
            if(response.data.length> 0)
            {
              setNotes(response.data);
            }else{
              toast.info('These ticket does not have any notes');
            }
        }catch(error){
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        fetchTicket();
        fetchTicketNoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onAddNote = async ()=> {
        const config = {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        try{
            const {data} = await axios.post(`http://localhost:5000/api/tickets/${ticketId}/notes`, 
            {
                text: noteText,
            }, 
            config);
            console.log(data);
            closeModal();
            fetchTicketNoes();

        }catch(error){
            toast.error(error.response?.data?.message);
        }
    }

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

    const customStyles = {
        content: {
          width: '600px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          position: 'relative',
        },
    }


    //PAGINATION
    const [pageNumber, setPageNumber] = useState(0);
    const notesPerPage = 2;
    const notesSeen = pageNumber * notesPerPage;
    const pageCount = Math.ceil(notes.length / notesPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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
        <button onClick={openModal} className='btn btn-reverse'>
          <FaPlus /> Add Note
        </button>
        )}

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
        >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
            <form onSubmit={onAddNote}>
                <div className='form-group'>
                    <textarea
                    name='noteText'
                    id='noteText'
                    className='form-control'
                    placeholder='Note text'
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    ></textarea>
                </div>
                <div className='form-group'>
                    <button className='btn' type='submit'>
                    Submit
                    </button>
                </div>
            </form>
        </Modal>

        <h2>
            Notes
        </h2>
        {notes.length > 0 ? (Array.from(notes)?.slice(notesSeen, notesSeen + notesPerPage).map((note) => (
        <NoteItem key={note._id} note={note} /> 
        ))) : (<div>Currently, this ticket doesn't have any notes</div>)}

        <ReactPaginate
        previousLabel={'<'}
        nextLabel={notes.length > 0 ? ">" : ""}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        />

        {ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>
            Close Ticket
            </button>
        )}
        </div>
        ): <Spinner/>
}