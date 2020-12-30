import React, {useState} from 'react';
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
    Link
  } from "react-router-dom";


const NavBottom = () => {
    return(
      <Router>
      <div class="Bottom">
          <div class= "Home">
            <Link to="/home" >
            <HoverImage className="HomeLogo" src={Homelogo} hoverSrc={HomelogoG}  alt={"logoG"} />
            </Link> 
          </div>
          <div class ="Favs">
            <Link to="/favs">
            <HoverImage className="FavLogo" src={Favlogo} hoverSrc={FavlogoG}  alt={"logofavG"} />
            </Link>
          </div>
          <div class ="Profile">
            <Link to="/profile">
            <HoverImage className="ProfLogo" src={Proflogo} hoverSrc={ProflogoG}  alt={"ProfG"} />
            </Link>
          </div>
            
            
        <Switch>
          <Route exact path="/home">
            {/* <Home /> */}
          </Route>
          <Route path="/favs">
            {/* <About /> */}
          </Route>
          <Route path="/dashboard">
            {/* <Dashboard /> */}
          </Route>
        </Switch>
      </div>
    </Router>
    )
      
}

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }
export default NavBottom;