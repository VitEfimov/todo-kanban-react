import React, { useState } from 'react'
import classes from './Boards.module.css'
import MyButton from '../buttons/MyButton';
// import { useLocalStorage } from '../../hooks/localStorageHook';
// import List from '../card/List';


const Boards3 = () => {




    const [lists, setLists] = useState(JSON.parse(localStorage.getItem("lists")) || []);
 ;
    const [input, setInput] = useState('');
    const [listVisible, setListVisible] = useState(false);
    const [selectedList, setSelectedList] = useState(null);


    const handleAddList = () => {
        const newList = { id: lists.length + 1, title: input, cards: [] };
        const updatedLists = [...lists, newList]
        setLists(updatedLists);
        setInput('');
        setListVisible(false);
        localStorage.setItem("lists", JSON.stringify(updatedLists))
    };

    const handleAddCardToList = (listId) => {
        const newCard = { id: listId + 5, text: input };
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
        });
        setLists(updatedLists);
        setInput('');
        setFormVisible(false)
        localStorage.setItem("lists", JSON.stringify(updatedLists));
    };



    const changeListAddVisible = () => {
        setListVisible(true)
    }
    const changeListAddVisibleFalse = () => {
        setListVisible(false)
    }

    const handleInputListChange = (e) => {
        setInput(e.target.value);
    };

    const handleDeleteList = (listId) => {
        // const removingList = lists.splice(list => list.id === listId);
        // localStorage.removeItem(removingList)
        const updatedLists = lists.filter(list => list.id !== listId);
        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        setLists(lists.filter(list => list.id !== listId));
    };
    const handleDeleteCardInList = (listId, cardId) => {
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


    const [formVisible, setFormVisible] = useState(false);
    const [value, setValue] = useState('');
    const [btnVisible, setBtnVisible] = useState(false)

    const changeVisibleForm = (listId) => {
       
        setFormVisible(true)
        setSelectedList(listId);
    }

    const changeVisibleFormFalse = () => {
        setFormVisible(false)
        setBtnVisible(false)
        setValue(null)
        // setInput('')
    }

    const handleInputChange = (e) => {
        if (e.target.value) {
            setBtnVisible(true);
        }
        setValue(e.target.value);
        setInput(e.target.value)

    };



    return (
        <div className={classes.cardsList} draggable={true}>

            {lists.map((list) => (
                <div key={list.id} className={classes.card}>
                    <span contentEditable="true" className={classes.title}>{list.title}</span>
                    <div className={classes.list}>
                        {list.cards.map(card => (
                            <div key={card.id} className={classes.card_item} draggable onDoubleClick={() => handleDeleteCardInList(list.id, card.id)}>
                                {card.text}
                            </div>
                        ))}
                    </div>
                    {formVisible
                        ?
                        <div className={classes.form}>
                            <textarea
                                className={classes.textarea}
                                placeholder="input card name"
                                value={value}
                                onChange={handleInputChange}
                            ></textarea>
                            <div className={classes.boardBtn}>
                                {btnVisible
                                    ?
                                    <button className={classes.add_item_btn}
                                        onClick={() => handleAddCardToList(list.id)}>
                                        Add card
                                    </button>
                                    :
                                    null
                                }
                                <button className={classes.cancel_item_btn} onClick={changeVisibleFormFalse}>Decline</button>
                            </div>
                        </div>
                        : null
                    }

                    <MyButton onClick={() => handleDeleteList(list.id)}>Delete list</MyButton>
                    <button className={classes.add_btn} onClick={()=>changeVisibleForm(list.id)} > + Add card</button>

                </div>

            ))}
            {listVisible ?
                <div>
                    <div className={classes.myInput}>
                        <textarea
                            className={classes.inputArea}
                            placeholder="input list name"
                            value={input}
                            onChange={handleInputListChange}
                        ></textarea>
                    </div>
                    <MyButton onClick={handleAddList}>Add list</MyButton>
                    <MyButton onClick={changeListAddVisibleFalse}>Decline</MyButton>
                </div>
                :
                null}
            <div className={classes.add_board_button}>
                <MyButton onClick={changeListAddVisible}>Add new list</MyButton>

            </div>
        </div>
    )
}

export default Boards3