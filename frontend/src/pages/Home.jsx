import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext';

export const Home = () => {
  const {isLogged, user} = useContext(AppContext);

  useEffect(()=>{
    console.log('Home Page');
    console.log('Is the user logged?', isLogged);
    console.log('Current user: ', user);
  }, [isLogged, user]);
  
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}
