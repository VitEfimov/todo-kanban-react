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
      <div className={classes.navBarElements} >
      <a href='../pages/Home'>Home</a>
      <a href=''>Board</a>
      <a href=''>Archive</a>
      <a href='./pages/About'>About</a>
    </div>
      <MyButton>LogOut</MyButton>
    </div>
  )
}

export default NavBar