import React from 'react';
import './NavBottom.css';
import HoverImage from "react-hover-image";
import Homelogo from '../../imagenes/Home.png';
import HomelogoG from '../../imagenes/HomeG.png';
import Favlogo from '../../imagenes/Fav.png';
import FavlogoG from '../../imagenes/FavG.png';
import Proflogo from '../../imagenes/Prof.png';
import ProflogoG from '../../imagenes/ProfG.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { Profile } from '../Profile/Profile';
const NavBar = () => {
    return(
      <Router>
      <div className="Bottom">
          <div className= "Home">
            <Link to="/home" >
            <HoverImage className="HomeLogo" src={Homelogo} hoverSrc={HomelogoG}  alt={"logoG"} />
            </Link > 
          </div>
          <div className ="Favs">
            <Link to="/favs">
            <HoverImage className="FavLogo" src={Favlogo} hoverSrc={FavlogoG}  alt={"logofavG"} />
            </Link >
          </div>
          <div className ="Profile">
            <Link  to="/profile">
            <HoverImage className="ProfLogo" src={Proflogo} hoverSrc={ProflogoG}  alt={"ProfG"} />
            </Link >
          </div>
            
            
        <Switch>
          <Route exact path="/home">
            {/* <Home /> */}
          </Route>
          <Route path="/favs" >
            {/* <About /> */}
          </Route>
          <Route path="/profile">
            <Profile id="Profileimg"/>
          </Route>
          <Redirect to = "/home"/>
        </Switch>
      </div>
    </Router>
    )
      
}
export default NavBar;
