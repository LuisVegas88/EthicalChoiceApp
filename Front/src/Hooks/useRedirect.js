import React from 'react'
import { useHistory } from 'react-router-dom'

export const useRedirect = () => {

    const history = useHistory();

    return (url, e, isExternal = false) => {

        if(e){
            e.preventDefault();
        }
        
        if(!isExternal){
            
            if(history){
                history.push(url);
            } else {
                throw new Error("Component was not rendered inside a router")
            }
    
        } else {
            window.location.href = url;
        } 
    }
}