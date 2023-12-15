import React from 'react';
import classes from './MyModal.module.css'


const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    const contentClasses = [classes.myModal];
    if (visible) {
        contentClasses.push(classes.active);
    }



    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
                {children}
                <div className={classes.inputModal}>
                    <h3>Description:</h3>
                    <textarea className={classes.textareaModal} name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
            

        </div>
    );
}

export default MyModal;

