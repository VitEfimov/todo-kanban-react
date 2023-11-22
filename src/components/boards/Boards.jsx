import React, { useState } from 'react'
import classes from './Boards.module.css'
import MyButton from '../buttons/MyButton';

const Boards = () => {

    const [boards,setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);

    const [showBoards, setShowBoards] = React.useState(true)
    const handleAddBoard = (e) => {
        e.preventDefault();
        setShowBoards(false)
      }



  return (
    <div className={classes.boardsList}>
        <div className={classes.board}>board1
        
        <MyButton>add a card</MyButton>
        
        
        
        </div>
        <div className={classes.board}>board2</div>
        <div className={classes.board}>board3</div>
        <div className={classes.board}>board4</div>
        <div className={classes.board}>board5</div>
        <div className={classes.board}>board1</div>
        <div className={classes.board}>board2</div>
        <div className={classes.board}>board3</div>
        <div className={classes.board}>board4</div>
        <div className={classes.board}>board5</div>
        <div className={classes.board}>board1</div>
        <div className={classes.board}>board2</div>
        <div className={classes.board}>board3</div>
        <div className={classes.board}>board4</div>
        <div className={classes.board}>board5</div>
        
    </div>
  )
}

export default Boards