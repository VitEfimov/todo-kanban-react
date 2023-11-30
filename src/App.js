

// import { BrowserRouter } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';

import Boards3 from './components/boards/Boards3';
import MyButton from './components/buttons/MyButton';



import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
function App() {



  return (
    <div className="App">



      <BrowserRouter>
              <NavBar />
        {/* <AppRouter /> */}
      </BrowserRouter>

      <Boards3/>

      {/* <Test/> */}


    </div>
  );
}

export default App;
