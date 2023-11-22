import React, { useState } from 'react'
import classes from './MyInput.module.css'
import MyButton from '../buttons/MyButton'

const MyInput = ({props,boards}) => {
const [title,setTitle] = useState('');
const newBoard = {
  id: 9,
  title: title
}
props.board(...boards,newBoard);

  return (
    <div className={classes.inputDiv}>
      add new list
    <input
    className={classes.myInput}
    {...props}
    value={title}
    onChange={(e)=> setTitle(e.target.value)}
    />
    <MyButton>add new list</MyButton>
    </div>
  )
}

export default MyInput