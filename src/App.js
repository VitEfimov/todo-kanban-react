// import KanbanBoard from './components/kanbanBoard';


import './App.css';
import Header from './components/Header';
import Test from './components/Test/Test';
// import KanbanBoardNew from './components/newKanban/KanbanBoardNew';

function App() {
  return (
    <div className="App">
      <h1>Kanban Board App</h1>
      {/* <Header/> */}
      {/* <KanbanBoardNew /> Include the Kanban board component */}
      <Test/>
    </div>
  );
}

export default App;
