import React, { useState } from 'react';
import { addCard, addCardThunk, addList, addListThunk, addBoard, addBoardThunk } from '../homeScreen/HomeScreenSlice';
import generateId from './generateId';
import { useDispatch } from 'react-redux';

const AddItem = ({ title, boardId, listId, org }) => {
  const dispatch = useDispatch();
  const [addingItem, setAddingItem] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleAddClick = () => {
    setAddingItem(true);
  };

  const handleCancelClick = () => {
    setAddingItem(false);
    setInputValue('');
    setErrorMessage(null); 
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage(null); 
  };

  const handleSubmitClick = () => {
    if (inputValue.trim() !== '') {
      const _id = generateId(5);
      // depending on title prop dispatch appropriate action to add card, list, or board
      switch (title) {
        case 'Card':
          dispatch(addCard({ boardId, listId, _id, inputValue }));
          dispatch(addCardThunk({name: inputValue, boardId, listId, tempId: _id}));
          break;
        case 'List':
          dispatch(addList({ boardId, _id, inputValue }));
          dispatch(addListThunk({ name: inputValue, boardId, tempId: _id }));
          break;
        case 'Board':
          dispatch(addBoard({ _id, inputValue, org }));
          dispatch(addBoardThunk({ title: inputValue, tempId: _id, org }));
          break;
        default:
          console.log('No card title is passed into client/features/list/List.js!');
      }
      setAddingItem(false);
      setInputValue('');
    } else {
      setErrorMessage(`${title} cannot be empty!`); 
    }
  };

  return addingItem ? (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmitClick}>{`Add a ${title}`}</button>
      <button onClick={handleCancelClick}>{'\u00D7'}</button>
      {errorMessage && <p>{errorMessage}</p>} 
    </div>
  ) : (
    <button onClick={handleAddClick}>{`Add a ${title}`}</button>
  );
};

export default AddItem;

// VALUES TO PASS INTO REDUX ACTIONS SWITCH CASE BLOCK:

// ADD CARD: 
// sync:  dispatch(addCard({ boardId, listId, _id, inputValue}))
// async: dispatch(addCardThunk({ name: inputValue, boardId, listId, tempId: _id}))


// ADD LIST: 
// sync: dispatch(addList({ boardId, _id, inputValue }));
// async: dispatch(addListThunk({ name: inputValue, boardId, tempId: _id }))

// ADD BOARD:
// sync: dispatch(addBoard({ _id, inputValue, org }))
// async: dispatch(addBoardThunk({ title: inputValue, tempId: _id, org }))