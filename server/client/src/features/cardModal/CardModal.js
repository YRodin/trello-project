import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import AddItem from "../utilities/AddItem";
import Comment from "../comment/Comment";  
import styles from "./CardModal.module.css";


const CardModal = ({ cardId, listId, boardId, visible, onClose }) => {
  const boards = useSelector((state) => state.homeScreen.boards);
  const board = boards.find(board => board._id === boardId);
  const list = board.lists.find(list => list._id === listId);
  const card = list.cards.find(card => card._id === cardId);

  // Code to handle editing of description textarea in card modal
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const handleDescriptionClick = () => setDescriptionEditing(true);
  const handleDecriptionClose = () => setDescriptionEditing(false);
  
  // function for adding description to state
  const handleDescriptionSaveClick = () => {
    // code to add to state

    setDescriptionEditing(false);
  };
  
  // rendering form for editing card description. I will likely move all this code to its own
  // file to clean this file up
  const renderCardDescription = () => {
    return descriptionEditing ? (
      <Form>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} placeholder="Add description here" />
          <Button variant="primary" onClick={handleDescriptionSaveClick}>Save Changes</Button>
          <Button variant="secondary" className="ms-1" onClick={handleDecriptionClose}>Close</Button>
        </Form.Group>
      </Form>
    ) : (
      <div onClick={handleDescriptionClick}>{card.description}</div>
    )
  };

  return (
    <div>
      <Modal size="lg" show={visible} onHide={onClose}>
        <Modal.Header closeButton>

          {/* Card Title in modal */}
          <Modal.Title>{card.name}</Modal.Title>

          {/* Card Label in modal */}
          <div className={styles.cardLabel}style={{ backgroundColor: card.label }}></div>
        </Modal.Header>

        {/* Shows what list the card is part of in the modal */}
        <div className="ps-3">in list <span className={styles.list}>{list.name}</span></div>

        <Modal.Body>
          <Container>
            <Row>
              <Col md={8}>
                <Modal.Body>

                  {/* Card Description */}
                  <Modal.Title>Description</Modal.Title>
                  {renderCardDescription()} 
                </Modal.Body>
           
                <Modal.Body>

                  {/* Shows Comments and activities associated with the card */}
                  <Modal.Title>Activity</Modal.Title>

                  {/* Add Comment Button */}
                  <AddItem title="Comment" cardId={cardId} listId={listId} boardId={boardId} />
         
                  {/* Displays Comments. Maybe activities and comments can be in the same array */}
                  <Comment cardId={cardId} listId={listId} boardId={boardId} />  
                </Modal.Body>
              </Col>

              {/* Styling for label, move card, and archive buttons is added. Still need to add code to make these changes to state */}
              <Col md={4}>

                {/* Label Select */}
                <Modal.Title>Label</Modal.Title>
                <Form.Select className={styles.selectBtn}>
                  <option>Label</option>
                  <option>None</option>
                  <option>Purple</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Orange</option>
                  <option>Red</option>
                </Form.Select>
                <hr />

                {/* Move Card Select */}
                <Modal.Title>Move Card to</Modal.Title>
                <Form.Select className={styles.selectBtn}>
                  <option>List</option>
                  {board.lists.map((list) => (
                    <option key={list._id}>{list.name}</option>
                  ))}
                </Form.Select>
                <hr />

                {/* Archive button */}
                <Modal.Title>Actions</Modal.Title>
                <div className={styles.actionButton}>Archive</div>
                <hr />
                
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default CardModal;