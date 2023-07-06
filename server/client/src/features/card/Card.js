import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import ItemTypes from "../utilities/ItemTypes";
import styles from "./Card.module.css"; 
import { startDrag, stopDrag } from "../homeScreen/DragDropSlice";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";



const Card = ({ id, name, listId }) => {
  // create local state and functions for displaying modals for each card
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const dispatch = useDispatch();
  const item = { id, name, listId };
  // connect Card to monitors state of React Drag and Drop via useDrag hook
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item,
    collect: (monitor, props) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // when drag operation begins following function is invoked
    // begin: (monitor) => {
    //   dispatch(startDrag(item)); // You may also want to include other properties such as initial listId
    // },
    //when drag operation ends:
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        // If the item was not dropped into a target, don't do anything
        return;
      }
      const dropResult = monitor.getDropResult();
      dispatch(stopDrag({id, listId: dropResult.listId})); 
    },
  }));
    // // start drag operation:
    // if(isDragging) dispatch(startDrag(item));

  return (
    <div>
      <CardContainer ref={drag} key={id} style ={{
        opacity: isDragging? 0.5 : 1
      }} onClick={handleShowModal}>{name}</CardContainer>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Card Title Here!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Card Description</li>
            <li>Comments</li>
            <li>Activities</li>
            <li>Labeling capabilities</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleCloseModal}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  background: white;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  font-size: 15px;
  overflow-wrap: break-word;
  min-height: 18px;
`;