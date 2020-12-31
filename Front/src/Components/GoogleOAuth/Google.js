import React from 'react';
import  useFetch  from '../../Hooks/useFetch.js';


function Google() {

    // const {data} = useFetch('http://localhost:8888/loginG');
    // const { email, password } = !!data && data[0];
    // console.log(state);

    return (
        <div>
            <input type="button" buttonText = "login" value= "Login with Google"/>
        </div>
    )
}

export default Google;