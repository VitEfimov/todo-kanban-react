import React, { useState } from 'react'
import classes from './MyInput.module.css'
// import MyButton from '../buttons/MyButton'

const MyInput = ({ props, boards, setBoards}) => {
  const [input, setInput] = useState('');
  // const [visible,setVisible] = useState(true)

//   const visible = changeListVisible();


// //   const handleAddCard = () => {
// //     const newBoard = { id: boards.length + 1, title: input };
// //     setBoards([...boards, newBoard]);
// //     setInput('');
// //     changeListVisible();

// // };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

//   // const handleVisible = () => {
//   //   setVisible(false)
//   // }

  return (
    <div className={classes.myInput}>
      <textarea
        className={classes.inputArea}
        placeholder="input card name"
        value={input}
        onChange={handleInputChange}
      ></textarea>

     
    </div>
  )
}

export default MyInput