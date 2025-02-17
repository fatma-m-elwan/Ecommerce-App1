import { createContext , useEffect, useState } from "react";



export let  TokenContext = createContext()

export default function TokenContextProvider (props) {
    console.log(props);
    
    const [token, setToken] = useState(null)


    useEffect(()=> {

        if(localStorage.getItem("userContext")) {
            setToken(localStorage.getItem("userContext"))
        }

    } , [])


    

    return <TokenContext.Provider value={{token , setToken}}> 
        {props.children}
        </TokenContext.Provider>
    
}