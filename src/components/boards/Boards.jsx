import React, { useState } from 'react'
import classes from './Boards.module.css'
import MyButton from '../buttons/MyButton';
import MyModal from '../modal/MyModal';
import AddNewItemForm from '../AddNewItemForm';
import MyInput from '../input/MyInput';

const Boards = () => {

    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);
    const [input, setInput] = useState(false)
    const inputNewBoard = (e) => {
        e.preventDefault();
         const boards = JSON.parse(localStorage.getItem("boards")) || [];
         const board ={
            id: boards.length + 1,
            title: title
         }

         setBoards(...boards,board)
        //  boards.push(board);
         localStorage.setItem("boards", JSON.stringify(boards));
    }

    

    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([boards.items])
    const createItem = (newItem) => {
        setItems([...items, newItem])
        setModal(false);
    }


    const [title, setTitle] = useState({ title: '' })

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
            <div className={classes.board}>board2
                <MyButton onClick={() => setModal(true)}>Add a card </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <AddNewItemForm create={createItem} />
                </MyModal>
            </div>
            <div className={classes.board}>board3</div>
            <div className={classes.board}>board4</div>
            <div className={classes.board}>board5</div>
            <div><MyButton
            style={{ minWidth: '200px', minHeight: '200px' }}
            onClick={() => setInput(true)}
            >
                Add new board
            <MyInput visible={input} board={setBoards} />
            </MyButton>
            
            
            </div>


        </div>
    )
}

export default Boards