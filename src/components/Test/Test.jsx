import React, { useState } from 'react';
import classes from '../newKanban/KanbanBoardNew.module.css'
import MyButton from '../buttons/MyButton';

import MyModal from '../modal/MyModal';
import AddNewItemForm from '../AddNewItemForm';



function Test() {

    const [boards, setBoards] = useState([
        { id: 1, title: "ToDo", items: [{ id: 1, title: "Find job" }, { id: 2, title: "Go to market" }, { id: 3, title: "Trash" }] },
        { id: 2, title: "InWork", items: [{ id: 1, title: "Loking for a job" }, { id: 2, title: "going to the market" }, { id: 3, title: "preparing Trash" }] },
        { id: 3, title: "Done", items: [{ id: 1, title: "Finded job" }, { id: 2, title: "went in market" }, { id: 3, title: "done Trash" }] },
    ])


    
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [modal, setModal] = useState(false);
const [items,setItems] = useState([boards.items])
const createItem = (newItem) => {
    setCurrentBoard([...items,newItem])
    setModal(false);
}


    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }


    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'//#282c33
    }

    function dragleaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }


    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === 'KanbanBoardNew_item__H8DOe') {
            e.target.style.boxShadow = '0 15px 15px darkgreen'
        }

    }


    function dropHandler(e, board, item) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem)
        console.log(currentIndex)
        currentBoard.items.splice(currentIndex, 1)
        console.log(currentBoard)
        const dropIndex = board.items.indexOf(item)
        console.log(dropIndex)
        currentBoard.items.splice(dropIndex, 0, currentItem)
        console.log(currentBoard)
        setCurrentBoard(currentBoard)
        setBoards((prevBoards) => {
            return prevBoards.map((p) => {


                if (p.id === currentBoard.id) {
                    return { ...p, currentBoard };
                }
                if (p.id === board.id) {
                    return { ...p, board };
                }

                return p;
            });
        });





        // e.target.style.background = '#282c33'
        e.target.style.boxShadow = 'none'
        // }
    }

    function dropCardHandler(e, board, item) {

        if (currentBoard !== board) {

            board.items.push(currentItem)

            const dropIndex = board.items.indexOf(item)
            // currentBoard.items.splice(dropIndex, 1, currentItem)

            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)


            setBoards((prevBoards) => {
                return prevBoards.map((p) => {
                    if (p.id === board.id) {
                        return { ...p, board };
                    }
                    if (p.id === currentBoard.id) {
                        return { ...p, currentBoard };

                    }
                    return p;
                });
            });
        }


        e.target.style.boxShadow = 'none'
        // e.target.style.background = '#282c33'
    }



    return (
        <div className={classes.board}>
            <div className={classes.cards}>
                {boards.map((board, item) =>
                    <div
                        key={board.id}
                        className={classes.board}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, board, item)}
                    >
                        <div className={classes.board_title}>
                            {board.title}
                        </div>
                        {board.items.map((item, index) =>
                            <div
                                key={index}
                                className={classes.item}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragLeave={(e) => dragleaveHandler(e)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                            >
                                {item.title}
                            </div>)}
                        <MyButton onClick={() => setModal(true)}>Add a card </MyButton>
                        <MyModal visible={modal} setVisible={setModal}>
<AddNewItemForm create={createItem}/>
                        </MyModal>
                    </div>)}
            </div>

        </div>
    )
}

export default Test;