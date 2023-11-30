// import React, { useContext } from "react";
import { Link } from 'react-router-dom';
// import { AuthContext } from "../../context/context";
import classes from './NavBar.module.css'
import MyButton from '../buttons/MyButton';
// import About from '../pages/About';


const NavBar = () => {
  //     const {isAuth, setIsAuth} = useContext(AuthContext)

  //     const logout = () => {
  //       setIsAuth(false);
  //       localStorage.removeItem('auth')
  //     }

// `${'.navBar'}+${'.navBarElements'}`
  return (
    <div className={classes.navBar}>

      <a href='../pages/Home'>Home</a>
      <a href='../pages/Boards'>Board</a>
      <a href=''>Archive</a>
      <a href='./pages/About'>About</a>

      <MyButton style={{width:'100%',borderRadius: 'none'}}>LogOut</MyButton>
    </div>
  )
}

export default NavBar