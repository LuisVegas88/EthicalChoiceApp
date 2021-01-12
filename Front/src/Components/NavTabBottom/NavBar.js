import React ,{ useContext, useState } from 'react';
import './NavBottom.css';
import HoverImage from "react-hover-image";
import Homelogo from '../../imagenes/Home.png';
import HomelogoG from '../../imagenes/HomeG.png';
import Favlogo from '../../imagenes/Fav.png';
import FavlogoG from '../../imagenes/FavG.png';
import Proflogo from '../../imagenes/Prof.png';
import ProflogoG from '../../imagenes/ProfG.png';

// import { Profile } from '../Profile/Profile';


import UserContext from '../../Contexts/userContext';


import {useRedirect} from '../../Hooks/useRedirect';

const NavBar = () => {
  const { userInfo } = useContext(UserContext);
  const redirect = useRedirect();
    return(
      
      <div className="Bottom">
          <div className= "Home">
    
            <HoverImage className="HomeLogo" src={Homelogo} hoverSrc={HomelogoG}  alt={"logoG"} onClick={(e)=>redirect("/")}/>
            
          </div>
          <div className ="Favs">
            
            <HoverImage className="FavLogo" src={Favlogo} hoverSrc={FavlogoG}  alt={"logofavG"} onClick={(e)=>redirect("/favs")} />
           
          </div>    
          <div className ="Profile">
            <HoverImage className="ProfLogo" src={Proflogo} hoverSrc={ProflogoG}  alt={"ProfG"} onClick={(e)=>redirect( userInfo? "/profile" : "/signup",e)}/>
            
          </div>
      </div>
    )
      
}
export default NavBar;
