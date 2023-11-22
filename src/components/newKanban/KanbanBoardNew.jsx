import React, { useState } from 'react';
import classes from '../newKanban/KanbanBoardNew.module.css'


function KanbanBoardNew() {

    const [cardList, setCardList] = useState([
        {id:1,order:3,text:"card3"},
        {id:2,order:1,text:"card1"},
        {id:3,order:2,text:"card2"},
        {id:4,order:4,text:"card4"},
    ])
    const [currentCart,setCurrentCard] = useState(null);

    function dragStartHandler(e,card) {
        setCurrentCard(card)
    }
    function dragEndHandler(e) {
        e.target.style.background = '#282c33'
    }
    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = '#333'

    }
    function dropHandler(e,card) {
        e.preventDefault();
        setCardList(cardList.map(p => {
            if (p.id === card.id) {
                return {...p, order: currentCart.order}
            } 
            if (p.id === currentCart.id) {
                return{...p, order: card.order}
            }
            return p;
        }))
        e.target.style.background = '#282c33'
    }
    const sortCards = (a,b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }


    return (
        <div className={classes.board}>
            {cardList.sort(sortCards).map(card => 
                <div 
                onDragStart={e=>dragStartHandler(e,card)}
                onDragLeave={e=>dragEndHandler(e)}
                onDragEnd={e=>dragEndHandler(e)}
                onDragOver={e=>dragOverHandler(e)}
                onDrop={e=>dropHandler(e,card)}
                draggable={true} 
                className={classes.card}>
                    {card.text}
                </div>)}




        </div>
    )
}

export default KanbanBoardNew;