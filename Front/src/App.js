
import  React, { useState} from 'react';
import Home from './Components/Home/Home.js'

import NavBar from './Components/NavTabBottom/NavBar.js';

import {UserProvider} from "./Contexts/userContext";
import {ProductProvider} from "./Contexts/ProductContext";


const App = ()=> {
  const [userInfo, setUserInfo] = useState(null);
  const [idProduct, setIdProduct] = useState(null)
 
  return (

    <div className="App">
      <Home />
      <UserProvider value={{userInfo, setUserInfo}}>
      <ProductProvider value={{idProduct, setIdProduct}}>
        <NavBar className="NavBottom"/>
      </ProductProvider>
      </UserProvider>
      
      
    </div>
   
  );
}

export default App;
