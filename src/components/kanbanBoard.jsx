import React, {useState} from 'react';
import classes from '../components/KanbanBoard.module.css'

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
    <div className="App">
      <h1>Kanban Board</h1>
      <div className={classes.cards}>
        <div className="column">
          <h2>ToDo</h2>
            {tasks.todo.map((task, index) => (
              <p key={index} onClick={() => handleMoveTask(task, 'todo', 'inProgress')}>
                {task}
              </p>
            ))}
        </div>
        <div className="column">
          <h2>In Progress</h2>
            {tasks.inProgress.map((task, index) => (
              <p key={index} onClick={() => handleMoveTask(task, 'inProgress', 'review')}>
                {task}
              </p>
            ))}
        </div>
        <div className="column">
          <h2>Review</h2>
            {tasks.review.map((task, index) => (
              <p key={index} onClick={() => handleMoveTask(task, 'review', 'done')}>
                {task}
              </p>
            ))}
        </div>
        <div className="column">
          <h2>Done</h2>
            {tasks.done.map((task, index) => (
              <p key={index} >{task}</p>
            ))}
        </div>
      </div>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  
        
    )
}

export default KanbanBoard;