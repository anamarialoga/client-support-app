import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useContext } from 'react';
import { AppContext } from '../context/appContext';

export const Home = () => {
  console.log('Home Page');

  const {isLogged, user} = useContext(AppContext);
  console.log('Is the user logged?', isLogged);
  console.log('Current user: ', user);
  
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
