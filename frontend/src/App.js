import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { PrivateHomeRoute } from './components/PrivateHomeRoute';
import { AppProvider } from './context/appContext';
import { Login } from './pages/Login';
import { MyTickets } from './pages/MyTickets';
import { NewTicket } from './pages/NewTicket';
import { Register } from './pages/Register';
import { ViewTicket } from './pages/ViewTicket';

function App() {
  return (
    <>
    <AppProvider>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path="/me" element={<PrivateHomeRoute />} /> 
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/new-ticket' element={<NewTicket/>}/>
            <Route path='/tickets' element={<MyTickets/>}/>
            <Route path='/tickets/:ticketId' element={<ViewTicket/>}/>
          </Routes>
        </div>
      </Router>
      </AppProvider>
      <ToastContainer />
    </>
  );
}

export default App;
