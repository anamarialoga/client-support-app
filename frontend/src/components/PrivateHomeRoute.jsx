import React from 'react';
import {Navigate} from 'react-router-dom';
import { Home } from '../pages/Home';

export const PrivateHomeRoute = () => {
  return localStorage.getItem('token')? <Home /> : <Navigate to='/login'/>
}
