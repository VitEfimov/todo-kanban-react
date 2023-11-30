import React, { useState } from 'react'
import classes from './Boards.module.css'
import MyButton from '../buttons/MyButton';
import ListForBoard from '../card/ListForBoard';
// import { useLocalStorage } from '../../hooks/localStorageHook';
// import List from '../card/List';


const Boards3 = () => {

    const [lists, setLists] = useState(JSON.parse(localStorage.getItem("lists")) || []);
 ;
 const [value, setValue] = useState('');

    const [input, setInput] = useState('');
    const [listVisible, setListVisible] = useState(false);
    // const [selectedList, setSelectedList] = useState(null);


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

    return (
        <div className={classes.cardsList} draggable={true}>

            {lists.map(list => (
                <ListForBoard
                key={list.id}
                list={list}
                lists={lists}
                setLists={setLists}
                listId={list.id}
                input={input}
                setInput={setInput}
                />

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