import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

toast.configure();

export const AppContext = createContext();


export const AppProvider = ({children})=>{

    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token'))
            {setIsLogged(true);}
        else
            {setIsLogged(false);}
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

    const onLogin = async (e) => {
        const { email, password} = formData;
        e.preventDefault();

        const config = {
            header: {
              "Content-Type": "application/json",
            },
        };

        try {
                const { data } = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    email,
                    password,
                },
                config
                );
                localStorage.setItem('token', data.token);
                console.log(data);
                window.location.href = '/me';
                toast.success("Login with success");
          } 
          catch (error) {
                toast.error('Invalid Credentials');
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
    }}>
        {children}
    </AppContext.Provider>
)

}