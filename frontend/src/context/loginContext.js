import { createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({children})=>{

return (
    <LoginContext.Provider value={{
    }}>
        {children}
    </LoginContext.Provider>
)

}