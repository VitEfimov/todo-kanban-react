import React, { useState } from 'react'
import classes from '../boards/Boards.module.css'
import MyButton from '../buttons/MyButton';
import Card from './Card';


const List = ({ props, list, listId, input, lists, setLists, setInput,
    // modalVisible, setModalVisible 
    setAddBtnDisabled
     }) => {
    const [formVisible, setFormVisible] = useState(false);
    const [value, setValue] = useState('');
    const [btnVisible, setBtnVisible] = useState(false)
    const [cards, setCards] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [description, setDescription] = useState('')

    const handleAddCardToList = (listId) => {

        // const newCard = { id: list.cards.lengh + 1, text: input };
        const newCard = { 
            // id: `${listId}${cards.length}`,
            id: cards.length,
            text: input, desc: description 
        };

        const updatedLists = lists.map(list => {
            if (list.id === listId) {
                setCards([...list.cards, newCard])
                return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
        });
        setLists(updatedLists);
        setInput('');
        setValue('')
        setFormVisible(false)
        setBtnVisible(false)
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
        setInput('')
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

        const updatedLists = lists.filter(list => list.id !== listId);
        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));

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
        <div key={list.id} className={classes.card} draggable>
            <div className={classes.titleContainer}><span className={classes.title} >{list.title}</span>
                <div className={classes.buttonContainer}>
                    <MyButton onClick={() => handleDeleteList(listId)}>
                        Delete
                    </MyButton>
                </div>
                {/* <MyButton onClick={() => handleDeleteList(listId)}>Delete list</MyButton> */}
            </div>
            <div className={classes.list}
            // onDragOver={handleDragOver} onDrop={handleDrop}>
            >
                {list.cards.map(card => (
                    <Card
                        key={card.id}
                        listid={listId}
                        cardid={card.id}
                        card={card}
                        lists={lists}
                        list={list}
                        setLists={setLists}
                        setAddBtnDisabled={setAddBtnDisabled}
                        // modalVisible={modalVisible} setModalVisible={setModalVisible}
                    // maxLength={10}

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
                        onChange={(e) => handleInputChange(e)}
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


            <button className={classes.add_btn} onClick={() => changeVisibleForm(listId)} > + Add card</button>

        </div>
    )
}

export default List;