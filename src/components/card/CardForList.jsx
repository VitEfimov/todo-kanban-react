import React, { useState } from 'react';
import classes from '../boards/Boards.module.css'
import MyButton from '../buttons/MyButton';
import { VscTrash } from "react-icons/vsc";

const CardForList = ({ props, lists, listId, cardId, setLists, card }) => {

    const handleDeleteCardInList = () => {
        // const updatedLists = lists.map(list => {
        //     if (list.id === listId) {
        //         return {
        //             ...list,
        //             cards: list.cards.filter(card => card.id !== cardId)
        //         };
        //     }
        //     return list;
        // });

        // setLists(updatedLists);
        // localStorage.setItem("lists", JSON.stringify(updatedLists));
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.filter(card => card.id !== cardId)
                };
            }
            return list;
        });

        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', cardId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };



    return (

        <div
            cardId={cardId}
            listId={listId}
            className={classes.card_item}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
        >
            {card.text}

            <div className={classes.buttonContainer}>
                <MyButton >
                    <VscTrash onClick={handleDeleteCardInList} />
                </MyButton>
            </div>
        </div>

    )
}

export default CardForList;