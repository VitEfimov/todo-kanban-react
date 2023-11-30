import React, { useState } from 'react'
import classes from './Card.module.css'
import CardForList from './CardForList';
import MyButton from '../buttons/MyButton';


const ListForBoard = ({props, list,listId, input, lists, setLists, setInput}) => {
    const [formVisible, setFormVisible] = useState(false);
    const [value, setValue] = useState('');
    const [btnVisible, setBtnVisible] = useState(false)
    const [cards, setCards] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
        /**
 * Custom function description.
 *
 * @param param1 - Description of the first parameter.
 * @param param2 - Description of the second parameter.
 * @returns Description of the return value.
 */
    const handleAddCardToList = (listId) => {

        const newCard = { id: cards.lengh + 1, text: input };
        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
        });
        setLists(updatedLists);
        // setInput('');
        setValue('')
        setFormVisible(false)
        localStorage.setItem("lists", JSON.stringify(updatedLists));
    };

    // const changeVisibleForm = (listId) => {
       
    //     setFormVisible(true)
    //     setSelectedList(listId);
    // }
    const changeVisibleForm = () => {
       
        setFormVisible(true)
        // setSelectedList(listId);
    }

    const changeVisibleFormFalse = () => {
        setFormVisible(false)
        setBtnVisible(false)
        setValue('')
        // setInput('')
    }

    const handleInputListChange = (e) => {
        setInput(e.target.value);
    };

    const handleInputChange = (e) => {
        if (e.target.value) {
            setBtnVisible(true);
        }
        setValue(e.target.value);
        setInput(e.target.value)

    };

    const handleDeleteList = (listId) => {
        // const removingList = lists.splice(list => list.id === listId);
        // localStorage.removeItem(removingList)
        const updatedLists = lists.filter(list => list.id !== listId);
        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        // setLists(lists.filter(list => list.id !== listId));
    };




    //dragLogic
    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // const handleDrop = () => {
    //     const cardId = parseInt(localStorage.getItem("draggedCardId"), 10);
    //     const updatedLists = lists.map(updatedList => {
    //         if (updatedList.id === listId) {
    //             return { ...updatedList, cards: [...updatedList.cards, { id: cardId, text: "New Card" }] };
    //         }
    //         return updatedList;
    //     });
    //     setLists(updatedLists);
    //     localStorage.setItem("lists", JSON.stringify(updatedLists));
    //     localStorage.removeItem("draggedCardId");
    // };

    
  return (
    <div key={list.id} className={classes.card}>
                    <span contentEditable="true" className={classes.title} >{list.title}</span>
                    <div className={classes.list}
                    // onDragOver={handleDragOver} onDrop={handleDrop}>
                    >
                        {list.cards.map(card => (
                            <CardForList
                            key={card.id}
                            listId={listId}
                            cardId={card.id}
                            card={card}
                            lists={lists}
                            setLists={setLists}
                            
                            
                            />
                        ))}
                    </div>
                    {formVisible
                        ?
                        <div className={classes.form}>
                            <textarea
                                className={classes.textarea}
                                placeholder="input card name"
                                value={value}
                                onChange={(e)=>handleInputChange(e)}
                            ></textarea>
                            <div className={classes.boardBtn}>
                                {btnVisible
                                    ?
                                    <button className={classes.add_item_btn}
                                        onClick={() => handleAddCardToList(listId)}>
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

                    <MyButton onClick={() => handleDeleteList(listId)}>Delete list</MyButton>
                    <button className={classes.add_btn} onClick={()=>changeVisibleForm(listId)} > + Add card</button>

                </div>
  )
}

export default ListForBoard;