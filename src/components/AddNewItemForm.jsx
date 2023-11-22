import React, { useState } from 'react'
import MyInput from './input/MyInput'
import MyButton from './buttons/MyButton'

const AddNewItemForm = ({ create }) => {
    const [item, setItem] = useState({ title: ''})
    const addNewItem = (e) => {
        e.preventDefault();
        const newItem = {
            ...item,id: Date.now()
        }
        create(newItem)
        setItem({title:''})
    }

    return (
        <form>
            <MyInput
                value={item.title}
                onChange={e => setItem({ ...item, title: e.target.value })}
                type='text'
                placeholder='Type text'
            ></MyInput>
            <MyButton onClick={addNewItem}>Add new card</MyButton>
        </form>
    )
}

export default AddNewItemForm