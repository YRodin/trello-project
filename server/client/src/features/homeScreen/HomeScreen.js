import styled from "styled-components";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddItem from "../utilities/AddItem";
import styles from "./HomeScreen.module.css";

// HomeScreen Component
const HomeScreen = () => {
  const boards = useSelector((state) => state.homeScreen.boards);
  const { orgId, orgName } = useSelector((state) => state.homeScreen.user);

  const navigate = useNavigate();

  const handleBoardClick = (e) => {
    const boardId = e.currentTarget.id;
    navigate(`/boards/${boardId}`);
  }

  return(
    <div className={styles.homeScreen}>
      <Container>
        <h2> {orgName} Workspace</h2>
        <hr />

        <Row>

          {boards.map((board) => (
            <Col md={3} key={board._id} className={styles.cardContainer}>
              <Card id={board._id} board={board} onClick={handleBoardClick} className={styles.card}>
                <Card.Body className="text-center">
                  <Card.Title>{board.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))} 

        </Row>
 
        <AddItem title="Board" orgId={orgId} />
               
      </Container>
    </div>
  )
};

export default HomeScreen;