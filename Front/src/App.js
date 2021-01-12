
import React, { useState } from 'react';
import Home from './Components/Home/Home.js'

import NavBar from './Components/NavTabBottom/NavBar.js';

import { UserProvider } from "./Contexts/userContext";
import { ProductProvider } from "./Contexts/ProductContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Register from './Components/Register/Register'
import { Signup } from './Components/Signup/Signup';
import { Profile } from './Components/Profile/Profile';
import ModalL from './Components/Signup/PopupLogin';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';

import GetProducts from './Components/SearchBar/searchPage';
import { ProductDetail } from './Components/ProductDetail/ProductDetail';
import {Favs} from  './Components/Favs/favs'

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [idProduct, setIdProduct] = useState({})

  return (

    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/">
            <UserProvider value={{ userInfo, setUserInfo }}>
              <ProductProvider value={{ idProduct, setIdProduct }}>
                <Home />
                
              </ProductProvider>
            </UserProvider>

          </Route>

          <Route path="/favs" >
            <UserProvider value={{ userInfo, setUserInfo }}>
              <ProductProvider value={{...idProduct, setIdProduct }}>
                <Favs />
              </ProductProvider>
            </UserProvider>
          </Route>

          <Route path="/signup">
            <UserProvider value={{ userInfo, setUserInfo }}>
              <ProductProvider value={{ idProduct, setIdProduct }}>
                <Register />
              </ProductProvider>
            </UserProvider>
          </Route>
          
          <Route path="/profile">
            <UserProvider value={{ userInfo, setUserInfo }}>
              <ProductProvider value={{ idProduct, setIdProduct }}>
                <Profile />
                </ProductProvider>
            </UserProvider>
          </Route>

          <Route path="/editProfile">
          <UserProvider value={{ userInfo, setUserInfo }}>
            <ProductProvider value={{ idProduct, setIdProduct }}>
              <ProfileEdit />
              </ProductProvider>
            </UserProvider>
          </Route>

          <Route path="/loginP">
          <UserProvider value={{ userInfo, setUserInfo }}>
            <ProductProvider value={{ idProduct, setIdProduct }}>
            <ModalL />
            </ProductProvider>
          </UserProvider>
          </Route>

          <Route path="/search">
            <ProductProvider value={{ ...idProduct, setIdProduct }}>
              <GetProducts />
            </ProductProvider>
          </Route>

          <Route exact path="/Detail">
            <UserProvider value={{ userInfo, setUserInfo }}>
              <ProductProvider value={{ ...idProduct, setIdProduct }}>
                <ProductDetail />
              </ProductProvider>
            </UserProvider>
          </Route>

        </Switch>

      <UserProvider value={{ userInfo, setUserInfo }}>

        <NavBar className="NavBottom" />

      </UserProvider>
      </Router>


    </div>

  );
}

export default App;
