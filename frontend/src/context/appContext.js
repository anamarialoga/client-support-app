import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {decodeToken} from 'react-jwt';
import axios from 'axios';


toast.configure();

export const AppContext = createContext();


export const AppProvider = ({children})=>{

    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);


    useEffect(()=>{
        if(localStorage.getItem('token'))
            {
                setIsLogged(true);
                setUser(decodeToken(localStorage.getItem('token')));
            }
        else
            {
                setIsLogged(false);
                setUser({});
            }
    },[isLogged]);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const onChange=(e)=>{
       setFormData((prevState)=> ({
           ...prevState,
           [e.target.id]: e.target.value
       })) 
    }

    const { email, password} = formData;

    const onLogin = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };
        
         try{
                const  {data}  = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    email,
                    password,
                },
                config
                );
                    localStorage.setItem('token', data.token);
                    console.log('data', data);
                    window.location.href = '/me';
                    toast.success("Login with success");
         } 
          catch (error) {
                toast.error(error.response.data.message);
          }

    }

    const onLogOut=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = '/login';
        toast.success('Logout with success');
      }

return (
    <AppContext.Provider value={{
    onChange,
    onLogin, 
    formData,
    onLogOut,
    isLogged,
    user,
    }}>
        {children}
    </AppContext.Provider>
)

}