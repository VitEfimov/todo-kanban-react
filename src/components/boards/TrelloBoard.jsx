import React, { useState, useRef } from 'react';
import classes from './Boards.module.css';
import MyButton from '../buttons/MyButton';
import { VscTrash } from 'react-icons/vsc';
import MyModal from '../myModal/MyModal';

const TrelloBoard = () => {

    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) || []);


    return (
        <div className={classes.cardsList}>

            {lists.map((list) => (
                <div className={classes.card}>
                    <div className={classes.titleContainer}>
                        {list.title}
                    </div>

                    <div className={classes.list}>
                        {list.cards.map((card) => (<div className={classes.cardBox}>
                            <div className={classes.card_item}>
                                {card.text}
                            </div>
                            <div className={classes.buttonContainer}>
                                <MyButton >
                                    <VscTrash />
                                </MyButton>
                            </div>



                        </div>
                    ))}
                    


                    </div>

                </div>
            )
            )}







        </div>
    )
}

export default TrelloBoard