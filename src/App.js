

// import { BrowserRouter } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import BoardAllInOne from './components/boards/BoardAllInOne';
import Boards from './components/boards/Boards';

import Boards3 from './components/boards/Boards3';
import TrelloBoard from './components/boards/TrelloBoard';
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
{/* <BoardAllInOne/> */}
      <Boards3/>
      {/* <Boards/> */}
      {/* <TrelloBoard/> */}

      {/* <Test/> */}


    </div>
  );
}

export default App;
