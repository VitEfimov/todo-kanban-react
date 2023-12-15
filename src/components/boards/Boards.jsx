import React, { useState, useRef } from 'react';
import classes from './Boards.module.css';
import MyButton from '../buttons/MyButton';
import { VscTrash } from 'react-icons/vsc';
import MyModal from '../myModal/MyModal';

const Boards = () => {
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) || []);
    const [value, setValue] = useState('');
    const [input, setInput] = useState('');
    const [listVisible, setListVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(false);
    const [cards, setCards] = useState([]);
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);

    const draggedItem = useRef(null);

    const handleAddList = () => {
        const newList = { id: lists.length + 1, title: input, cards: [] };
        const updatedLists = [...lists, newList];
        setLists(updatedLists);
        setInput('');
        setValue('');
        setListVisible(false);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    };

    const handleInputListChange = (e) => {
        setInput(e.target.value);
    };

    const changeListAddVisible = () => {
        setListVisible(true);
    };

    const changeListAddVisibleFalse = () => {
        setListVisible(false);
    };

    const changeVisibleForm = (listId) => {
        setFormVisible(true);  
      };

    const handleInputChange = (e) => {
        if (e.target.value) {
            setBtnVisible(true);
        }
        setValue(e.target.value);
        setInput(e.target.value);
    };

    const handleAddCardToList = (listId) => {
        const newCard = { id: cards.length + 1, text: input, desc: description };

        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return { ...list, cards: [...list.cards, newCard] };
            }
            return list;
        });

        setLists(updatedLists);
        setInput('');
        setValue('');
        setDescription('');
        setFormVisible(false);
        setBtnVisible(false);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    };

    const handleDeleteList = (listId) => {
        const updatedLists = lists.filter((list) => list.id !== listId);
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    };

    const handleDragStart = (e, listId, cardId) => {
        // e.preventDefault();
        draggedItem.current = { listId, cardId };
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
      };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (listId) => {
        const { listId: draggedListId, cardId: draggedCardId } = draggedItem.current;
        let draggedCard = [];
        if (listId !== draggedListId) {
          const updatedLists = lists.map((list) => {
            if (list.id === draggedListId) {
              const updatedCards = [...list.cards];
             draggedCard = updatedCards.splice(draggedCardId, 1);
              return { ...list, cards: updatedCards };
            }
            if (list.id === listId) {
              const updatedCards = [...list.cards];
              updatedCards.push({ id: list.cards.length + 1, text: draggedCard.text });
              return { ...list, cards: updatedCards };
            }
            return list;
          });
    
          setLists(updatedLists);
          localStorage.setItem("lists", JSON.stringify(updatedLists));
        }
    
        draggedItem.current = null;
      };

      const handleDragStartCard = (e, listId, cardId) => {
        draggedItem.current = { listId, cardId };
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
      };
    
      const handleDragOverCard = (e) => {
        e.preventDefault();
      };
    
    //   const handleDropCard = (listId) => {
    //     if (!draggedItem.current) {
    //       return;
    //     }
    
    //     const { listId: draggedListId, cardId: draggedCardId } = draggedItem.current;
    
    //     if (listId !== draggedListId) {
    //       const updatedLists = lists.map((list) => {
    //         if (list.id === draggedListId) {
    //           // Remove from the current list
    //           const updatedCards = [...list.cards];
    //           const draggedCard = updatedCards.splice(draggedCardId, 1)[0];
    
    //           // Add to the new list
    //           const destinationList = lists.find((l) => l.id === listId);
    //           destinationList.cards.push(draggedCard);
    
    //           return { ...list, cards: updatedCards };
    //         }
    
    //         return list;
    //       });
    
    //       setLists(updatedLists);
    //       localStorage.setItem('lists', JSON.stringify(updatedLists));
    //     }
    
    //     draggedItem.current = null;
    //   };
    
    const handleDropCard = (listId) => {
        if (!draggedItem.current) {
          return;
        }
    
        const { listId: draggedListId, cardId: draggedCardId } = draggedItem.current;
        const draggedCardIndex = draggedCardId;
    
        if (listId === draggedListId) {
          // Sort within the same list
          const updatedLists = lists.map((list) => {
            if (list.id === draggedListId) {
              const updatedCards = [...list.cards];
              const [draggedCard] = updatedCards.splice(draggedCardIndex, 1);
              updatedCards.splice(draggedCardIndex, 0, draggedCard);
              return { ...list, cards: updatedCards };
            }
            return list;
          });
    
          setLists(updatedLists);
          localStorage.setItem('lists', JSON.stringify(updatedLists));
        } else {
          // Move card to a different list with deletion from the start list
          const updatedLists = lists.map((list) => {
            if (list.id === draggedListId) {
              const updatedCards = [...list.cards];
              updatedCards.splice(draggedCardIndex, 1);
              return { ...list, cards: updatedCards };
            } else if (list.id === listId) {
              const updatedCards = [...list.cards];
              updatedCards.push({ id: list.cards.length + 1, text: lists[draggedListId - 1].cards[draggedCardIndex].text });
              return { ...list, cards: updatedCards };
            }
            return list;
          });
    
          setLists(updatedLists);
          localStorage.setItem('lists', JSON.stringify(updatedLists));
        }
    
        draggedItem.current = null;
      };

      const changeVisibleFormFalse = () => {
        setFormVisible(false);
        setBtnVisible(false);
        setValue('');
        setInput('');
      };  

    const handleDeleteCardInList = (listId, cardId) => {
        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.filter((card) => card.id !== cardId),
                };
            }
            return list;
        });

        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    };

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    };

    const handleModalVisibleClose = () => {
        setModalVisible(false);
    };

    return (
        <div className={classes.cardsList}>
            {lists.map((list) => (
                <div 
                key={list.id}
                className={classes.card} 
                // onDragOver={() => handleDragOver(list.id)} 
                // onDrop={() => handleDrop(list.id)}
                >
                    <div className={classes.titleContainer}>
                        <span className={classes.title}>{list.title}</span>
                        <div className={classes.buttonContainer}>
                            <MyButton onClick={() => handleDeleteList(list.id)}>Delete</MyButton>
                        </div>
                    </div>
                    <div className={classes.list}>
                        {list.cards.map((card) => (
                            <div
                            key={card.id} 
                            className={classes.cardBox} 
                            draggable 
                            // onDragStart={(e) => handleDragStartCard(e, list.id, index)}
                            onDragStart={(e) => handleDragStart(e, list.id, card.id)} 
                            onDoubleClick={handleModalVisible}
                            onDragOver={() => handleDragOver(list.id)} 
                            onDrop={() => handleDropCard(list.id)}
                            // onDragOver={() => handleDragOver(list.id)} 
                            // onDrop={() => handleDrop(list.id)}
                            >
                                <div className={classes.card_item}>
                                    {card.text}
                                </div>
                                <div className={classes.buttonContainer}>
                                    <MyButton onClick={() => handleDeleteCardInList(list.id, card.id)}>
                                        <VscTrash />
                                    </MyButton>
                                </div>
                                <MyModal visible={modalVisible} setVisible={setModalVisible}>
                                    {card.text}
                                    <form>
                                        <MyButton onClick={handleModalVisibleClose}>Save</MyButton>
                                    </form>
                                </MyModal>
                            </div>
                        ))}
                    </div>
                    {formVisible ? (
                        <div className={classes.form}>
                            <textarea
                                className={classes.textarea}
                                placeholder="input card name"
                                value={value}
                                onChange={(e) => handleInputChange(e)}
                            ></textarea>
                            <div className={classes.boardBtn}>
                                {btnVisible ? (
                                    <button
                                    className={classes.add_item_btn} onClick={() => handleAddCardToList(list.id)}>
                                        Add card
                                    </button>
                                ) : null}
                                <button className={classes.cancel_item_btn} onClick={changeVisibleFormFalse}>
                                    Decline
                                </button>
                            </div>
                        </div>
                    ) : null}
                    <button className={classes.add_btn} onClick={() => changeVisibleForm(list.id)}>
                        + Add card
                    </button>
                </div>
            ))}
            {listVisible ? (
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
            ) : null}
            <div className={classes.add_board_button}>
                <MyButton onClick={changeListAddVisible}>Add new list</MyButton>
            </div>
        </div>
    );
};

export default Boards;
