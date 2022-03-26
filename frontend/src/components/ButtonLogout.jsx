import React, { useContext } from 'react'
import {FaSignOutAlt} from 'react-icons/fa'
import { AppContext } from '../context/appContext';

export const ButtonLogout = ()=> {

  const {onLogOut} = useContext(AppContext)

  return (
    <button className='btn' onClick={onLogOut}>
        <FaSignOutAlt/>
        Log Out
</button>
  )
}
