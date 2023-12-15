import React, { useState, useRef } from 'react';
import classes from '../boards/Boards.module.css'
import MyButton from '../buttons/MyButton';
import { VscTrash } from "react-icons/vsc";
import MyModal from '../myModal/MyModal';

const Card = ({ props, lists, listid, cardid, setLists, card, list,
    // modalVisible,setModalVisible 
    setAddBtnDisabled
}) => {

    /**
     * 
     */


    const [modalVisible, setModalVisible] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);

    const draggedItem = useRef(null);


    const handleDeleteCardInList = () => {

        const updatedLists = lists.map(list => {
            if (list.id === listid) {
                return {
                    ...list,
                    cards: list.cards.filter(card => card.id !== cardid)
                };
            }
            return list;
        });

        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));
    };



    const handleModalVisible = () => {

        setModalVisible(true)
        setAddBtnDisabled(true)


    }
    const handleModalVisibleClose = () => {
        setModalVisible(false)
        setAddBtnDisabled(false)
    }




    ///////////

    // const handleDragStartCard = (e, cardId, sourceListId) => {
    //     e.dataTransfer.setData('text/plain', JSON.stringify({ cardId, sourceListId }));
    // };

    // const handleDragOverCard = (e) => {
    //     e.preventDefault();
    // };

    // const handleDropCard = (e,listId,cardId) => {
    //     // if (!draggedItem.current) {
    //     //   return;
    //     // }
    //     console.log(listId + "listId" + "cardId" + cardId);

    //     const { listId: draggedListId, cardId: draggedCardId } = draggedItem.current;
    //     console.log("draggedItem", draggedItem.current);
    //     const draggedCardIndex = draggedCardId;
    //     e.target.style.boxShadow = 'none'
    //     if (listId === draggedListId) {
    //       // Sort within the same list
    //       const updatedLists = lists.map((list) => {
    //         if (list.id === draggedListId) {
    //           const updatedCards = [...list.cards];
    //           const [draggedCard] = updatedCards.splice(draggedCardIndex, 1);
    //           updatedCards.splice(draggedCardIndex, 0, draggedCard);
    //           e.target.style.boxShadow = 'none'
    //           return { ...list, cards: updatedCards };
    //         }
    //         e.target.style.boxShadow = 'none'
    //         return list;
    //       });

    //       setLists(updatedLists);
    //       localStorage.setItem('lists', JSON.stringify(updatedLists));
    //     } else {
    //       // Move card to a different list with deletion from the start list
    //       const updatedLists = lists.map((list) => {
    //         if (list.id === draggedListId) {
    //           const updatedCards = [...list.cards];
    //           updatedCards.splice(draggedCardIndex, 1);
    //           e.target.style.boxShadow = 'none'
    //           return { ...list, cards: updatedCards };
    //         } else if (list.id === listId) {
    //           const updatedCards = [...list.cards];
    //           updatedCards.push({ id: list.cards.length + 1, text: lists[draggedListId - 1].cards[draggedCardIndex].text });
    //           e.target.style.boxShadow = 'none'
    //           return { ...list, cards: updatedCards };
    //         }
    //         e.target.style.boxShadow = 'none'
    //         return list;
    //       });

    //       setLists(updatedLists);
    //       localStorage.setItem('lists', JSON.stringify(updatedLists));
    //     }
    //     e.target.style.boxShadow = 'none'

    //     draggedItem.current = null;
    //   };

    // const handleDropCard = (e, listId, cardId) => {
    //     // if (!draggedItem.current) {
    //     //   return;
    //     // }
    //     e.preventDefault();

    //     console.log(listId + " listId" + "cardId " + cardId);
    //     const currentIndex = list.cards.indexOf(card)
    //         console.log("currentIndex" + currentIndex);
    //         list.cards.splice(card,1);
    //         const dropIndex = list.cards.indexOf(card)
    //         list.cards.splice(dropIndex + 1,0,card)
    //         setLists(lists.map(list=>{
    //             if (list.id===listid) {
    //                 return list
    //             }
    //             if (list.id===list.id) {
    //                 return list
    //             }
    //             return list
    //         }))

    // };


    // const handleDropCard = (e, targetListId) => {
    //     e.preventDefault();
    //     const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    //     const { cardId, sourceListId } = data;

    //     if (targetListId !== sourceListId) {
    //         const updatedLists = lists.map(list => {
    //             if (list.id === sourceListId) {
    //                 return { ...list, cards: list.cards.filter(c => c.id !== cardId) };
    //             }
    //             if (list.id === targetListId) {
    //                 const updatedCard = { id: cardId, text: card.text, desc: card.desc };
    //                 return { ...list, cards: [...list.cards, updatedCard] };
    //             }
    //             return list;
    //         });

    //         setLists(updatedLists);
    //         localStorage.setItem("lists", JSON.stringify(updatedLists));
    //     }
    // };

    //////////////////////////////////////////////////////////////////
    const dragLeaveHandler = (e,list,card) => {
        e.target.style.boxShadow = 'none'
        // draggedItem.current = null;
        // console.log(list.id + " listId" + "cardId " + card.id);
        // const currentIndex = list.cards.indexOf(card)
        // console.log("currentIndex" + currentIndex);
        // list.cards.splice(card,1);

    };

    const handleDragStartCard = (e, card, list) => {
        setCurrentList("CurrentList "+list);
        console.log("CurrentListID " + list.id);
        setCurrentCard("CurrentCard "+card)
        console.log("CurrentCardID " + card.id);
        // e.dataTransfer.setData('text/plain', JSON.stringify({ cardid, listid }));
        // draggedItem.current = { listid, cardid };
        // e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', e.target.parentNode);
        // e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    const handleDragOverCard = (e) => {
        e.preventDefault();
        if (e.target.className.includes('card_item')) {
            e.target.style.boxShadow = '0 2px 3px yellow'
        }

    };





        const handleDropCard = (e,list,card) => {
    // console.log("currentCard" + currentCard);
        console.log("DropList " + list.id);
        console.log("DropCard " + card.id);

            e.target.style.boxShadow = 'none'
            console.log("currentList " + currentList);


            const currentIndex = currentList.cards.indexOf(currentCard)
            console.log("currentIndex" + currentIndex);
            list.cards.splice(currentIndex,1);
            const dropIndex = list.cards.indexOf(card)
            list.cards.splice(dropIndex + 1,0,currentCard)
            setLists(lists.map(l=>{
                if (l.id===list.id) {
                    return list
                }
                if (l.id===currentList.id) {
                    return currentList
                }
                return l;
            }))


        }

    // const handleDropCard = (e, targetList, draggedCard) => {
    //     e.preventDefault();
    //     console.log("currentCard: " + currentCard);
    //     console.log("draggedCard: " + draggedCard);
    //     console.log("targetList: " + targetList);

    //     const currentIndex = currentList.cards.indexOf(currentCard);
    //     // const currentIndex = draggedCard
    //     console.log("currentIndex: " + currentIndex);

    //     // Remove the card from the original position
    //     targetList.cards.splice(currentIndex, 1);

    //     // Find the drop index in the target list
    //     const dropIndex = targetList.cards.indexOf(card);

    //     // Insert the dragged card at the drop index
    //     targetList.cards.splice(dropIndex + 1, 0, draggedCard);

    //     // Update the lists state
    //     setLists((prevLists) =>
    //         prevLists.map((list) =>
    //             list.id === targetList.id ? { ...list, cards: [...targetList.cards] } : list
    //         )
    //     );
    // };



    return (
        <div className={classes.cardBox}>
            <div
                cardid={cardid}
                listid={listid}
                className={classes.card_item}
                draggable={true}
                onDragLeave={(e) => dragLeaveHandler(e, list, card)}
                onDragStart={(e) => handleDragStartCard(e, card, list)}
                onDragOver={(e) => handleDragOverCard(e)}
                onDrop={(e) => handleDropCard(e, list, card)}
                // maxLength={10}
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
    )
}

export default Card;


// import React, { useState } from 'react';
// import classes from '../boards/Boards.module.css';
// import MyButton from '../buttons/MyButton';
// import { VscTrash } from 'react-icons/vsc';
// import MyModal from '../myModal/MyModal';

// const Card = ({ lists, listid, cardid, setLists, card, setAddBtnDisabled }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleDeleteCardInList = () => {
//     const updatedLists = lists.map(list =>
//       list.id === listid
//         ? { ...list, cards: list.cards.filter(c => c.id !== cardid) }
//         : list
//     );

//     setLists(updatedLists);
//     localStorage.setItem('lists', JSON.stringify(updatedLists));
//   };

//   const handleModalVisible = () => {
//     setModalVisible(true);
//     setAddBtnDisabled(true);
//   };

//   const handleModalVisibleClose = () => {
//     setModalVisible(false);
//     setAddBtnDisabled(false);
//   };

//   const handleDragStartCard = (e) => {
//     e.dataTransfer.setData('text/plain', JSON.stringify({ cardid, listid }));
//   };

//   const handleDragOverCard = (e) => {
//     e.preventDefault();
//     if (e.target.className.includes(classes.card_item)) {
//       e.target.style.boxShadow = '0 2px 3px yellow';
//     }
//   };

//   const handleDragLeaveCard = (e) => {
//     e.target.style.boxShadow = 'none';
//   };

//   const handleDropCard = (e) => {
//     e.preventDefault();
//     e.target.style.boxShadow = 'none';

//     if (!e.dataTransfer.getData('text/plain')) {
//       return;
//     }

//     const { listId: draggedListId, cardId: draggedCardId } = JSON.parse(e.dataTransfer.getData('text/plain'));

//     if (listid !== draggedListId) {
//       const updatedLists = lists.map(list => {
//         if (list.id === draggedListId) {
//           const updatedCards = [...list.cards];
//           updatedCards.splice(draggedCardId, 1);
//           return { ...list, cards: updatedCards };
//         } else if (list.id === listid) {
//           const updatedCards = [...list.cards];
//           updatedCards.push({ id: list.cards.length + 1, text: lists[draggedListId - 1].cards[draggedCardId].text });
//           return { ...list, cards: updatedCards };
//         }
//         return list;
//       });

//       setLists(updatedLists);
//       localStorage.setItem('lists', JSON.stringify(updatedLists));
//     }
//   };

//   return (
//     <div className={classes.cardBox}>
//       <div
//         className={classes.card_item}
//         draggable
//         onDragStart={handleDragStartCard}
//         onDragOver={handleDragOverCard}
//         onDragLeave={handleDragLeaveCard}
//         onDrop={handleDropCard}
//         onDoubleClick={handleModalVisible}
//       >
//         {card.text}
//       </div>
//       <div className={classes.buttonContainer}>
//         <MyButton onClick={handleDeleteCardInList}>
//           <VscTrash />
//         </MyButton>
//       </div>
//       <MyModal visible={modalVisible} setVisible={setModalVisible}>
//         {card.text}
//         <form>
//           <MyButton onClick={handleModalVisibleClose}>Save</MyButton>
//         </form>
//       </MyModal>
//     </div>
//   );
// };

// export default Card;
