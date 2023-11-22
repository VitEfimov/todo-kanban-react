import React from 'react';
import classes from '../components/Header.module.css'

function Header() {



    return (
        <div className={classes.header}>
            <h3>ToDo</h3>
            <h3>In Progress</h3>
            <h3>Review</h3>
            <h3>Done</h3>


        </div>
    )
}

export default Header;