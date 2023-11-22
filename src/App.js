

// import { BrowserRouter } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import Test from './components/Test/Test';
import Boards from './components/boards/Boards';
import MyButton from './components/buttons/MyButton';
import KanbanBoardNew from './components/newKanban/KanbanBoardNew';


import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
function App() {



  return (
    <div className="App">

      {/* <h1>Kanban Board App</h1> */}

      <BrowserRouter>
              <NavBar />
        {/* <AppRouter /> */}
      </BrowserRouter>
      {/* <Header/> */}
      {/* <KanbanBoardNew /> */}
      <Boards/>
      {/* <Test/> */}


    </div>
  );
}

export default App;
