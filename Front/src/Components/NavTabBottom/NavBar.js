import React ,{ useContext, useState } from 'react';
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
  } from "react-router-dom";
// import { Profile } from '../Profile/Profile';
import {Home} from '../Home/Home';
import { Signup } from '../Signup/Signup';
import { Profile } from '../Profile/Profile';
import ModalL from '../Signup/PopupLogin';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import UserContext from '../../Contexts/userContext';

const NavBar = () => {
  const { userInfo } = useContext(UserContext);
  // const [userId, setUserId] = useState();
//   const fetchUser = () =>{
//     const url ="http://localhost:8888/User"
//     // fetch(url, {
//     //     credentials: "include"
//     //   })
//     // .then(response => response.json())
//     // .then(data => {
//     //     console.log(data)
//     //     setUserId(data[0].idUser)
//     //     console.log(userId);
//     // })
// }
// fetchUser()

    return(
      
      <Router>
      <div className="Bottom">
          <div className= "Home">
            <Link to="/" >
            <HoverImage className="HomeLogo" src={Homelogo} hoverSrc={HomelogoG}  alt={"logoG"} />
            </Link > 
          </div>
          <div className ="Favs">
            <Link to="/favs">
            <HoverImage className="FavLogo" src={Favlogo} hoverSrc={FavlogoG}  alt={"logofavG"} />
            </Link >
          </div>    
          <div className ="Profile">
            
            <Link  to={userInfo ? "/profile" : "/signup"}>
            <HoverImage className="ProfLogo" src={Proflogo} hoverSrc={ProflogoG}  alt={"ProfG"} />
            </Link >
          </div>
            
            
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/favs" >
            {/* <About /> */}
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path ="/profile">
            <Profile />
          </Route>
          <Route path ="/editProfile">
            <ProfileEdit/>
          </Route>
          <Route path ="/loginP">
            <ModalL />
          </Route>
          
        </Switch>
      </div>
    </Router>
    )
      
}
export default NavBar;
