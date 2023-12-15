import React, { useState } from 'react'
import classes from './Boards.module.css'
import MyButton from '../buttons/MyButton';
import { VscTrash } from "react-icons/vsc";
import MyModal from '../myModal/MyModal';

const BoardAllInOne = () => {

    const [lists, setLists] = useState(JSON.parse(localStorage.getItem("lists")) || []);
    const [value, setValue] = useState('');
    const [input, setInput] = useState('');
    const [listVisible, setListVisible] = useState(false);


    const handleAddList = () => {
        const newList = { id: lists.length + 1, title: input, cards: [] };
        const updatedLists = [...lists, newList]
        setLists(updatedLists);
        setInput('');
        setValue('')
        setListVisible(false);
        localStorage.setItem("lists", JSON.stringify(updatedLists))
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


    //list logic////////////////////
    const [formVisible, setFormVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(false)
    const [cards, setCards] = useState([]);
    const [description, setDescription] = useState('')

    const handleAddCardToList = (listId) => {

        const newCard = { id: cards.length + 1, text: input, desc: description };

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


    const changeVisibleForm = () => {
        setFormVisible(true)
    }

    const changeVisibleFormFalse = () => {
        setFormVisible(false)
        setBtnVisible(false)
        setValue('')
        setInput('')
    }



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

    ///card logic////////////////////////////
    const [modalVisible, setModalVisible] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);


    const handleDeleteCardInList = () => {

        const updatedLists = lists.map(list => {
            if (list.id === list.id) {
                return {
                    ...list,
                    cards: list.cards.filter(card => card.id !== card.id)
                };
            }
            return list;
        });

        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
    };



    const handleModalVisible = () => {
        if (modalVisible == true) {
            setModalVisible(false)
        } else { setModalVisible(true) }

    }
    const handleModalVisibleClose = () => {
        setModalVisible(false)
    }



    return (
        <div className={classes.cardsList} >

            {lists.map(list => (
                <div key={list.id} className={classes.card} draggable>
                    <div className={classes.titleContainer}><span className={classes.title} >{list.title}</span>
                        <div className={classes.buttonContainer}>
                            <MyButton onClick={() => handleDeleteList(list.id)}>
                                Delete
                            </MyButton>
                        </div>
                    </div>
                    <div className={classes.list}
                    >
                        {list.cards.map(card => (
                            <div className={classes.cardBox}>
                                <div
                                    cardid={card.id}
                                    listid={list.id}
                                    className={classes.card_item}
                                    draggable={true}
                                    onDoubleClick={handleModalVisible}
                                >

                                    {card.text}
                                </div>
                                <div className={classes.buttonContainer}>
                                    <MyButton onClick={handleDeleteCardInList}>
                                        <VscTrash />
                                    </MyButton>
                                </div>
                                <MyModal visible={modalVisible} setVisible={setModalVisible}>{card.text}
                                    <form><MyButton onClick={handleModalVisibleClose}>Save
                                    </MyButton></form>
                                </MyModal>

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
                                onChange={(e) => handleInputChange(e)}
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


                    <button className={classes.add_btn} onClick={() => changeVisibleForm(list.id)} > + Add card</button>

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
                <MyButton

                    onClick={changeListAddVisible}>Add new list</MyButton>

            </div>
        </div>
    )
}

export default BoardAllInOne