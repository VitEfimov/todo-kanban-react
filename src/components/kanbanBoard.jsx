import React, {useState} from 'react';
// import classes from '../components/KanbanBoard.module.css'

function KanbanBoard() {

    const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    review: [],
    done: [],
  });

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTask],
    });
    setNewTask('');
  };

  const handleMoveTask = (task, fromColumn, toColumn) => {
    const updatedTasks = { ...tasks };
    updatedTasks[fromColumn] = updatedTasks[fromColumn].filter((t) => t !== task);
    updatedTasks[toColumn] = [...updatedTasks[toColumn], task];
    setTasks(updatedTasks);
  };

  return (
    <div className="board">
      <div className="">
        <div className="column">
            {tasks.todo.map((task, index) => (
              <div className='board-item'>
              <p className='board-item-content' key={index} onClick={() => handleMoveTask(task, 'todo', 'inProgress')}>
                {task}
              </p></div>
            ))}
        </div>
        <div className="column">
            {tasks.inProgress.map((task, index) => (
               <div className='board-item'>
               <p className='board-item-content' key={index} onClick={() => handleMoveTask(task, 'inProgress', 'review')}>
                {task}
                </p></div>
            ))}
        </div>
        <div className="column">
            {tasks.review.map((task, index) => (
               <div className='board-item'>
               <p className='board-item-content' key={index} onClick={() => handleMoveTask(task, 'review', 'done')}>
                {task}
                </p></div>
            ))}
        </div>
        <div className="column">
            {tasks.done.map((task, index) => (
              <p key={index} >{task}</p>
            ))}
        </div>
      </div>
      <div className="add-task">
        <input style={{borderRadius:'3px'}}
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          
        /><br/>
        <button style={{borderRadius:'3px'}} onClick={handleAddTask}>Add</button>
      </div>
    </div>
  
        
    )
}

export default KanbanBoard;