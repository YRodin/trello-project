import { Container, Row, Col }from "react-bootstrap";
import styled from "styled-components";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { signout } from "../actions";
import { useEffect } from "react";
import { fetchUser } from "../actions";

// Using React-Bootstrap and style-components. 
// I will try to style more as the project goes on. 
// I want to get a skeleton built first then get more complex.

// Header/NavBar to show Logo, Title, and other potential nav links.
// My simple idea for Login Info is to have a dropdown that says "Please Log In" or
//   if user is logged in then it will say "Username is currently logged in" and
//   maybe add a Sign Out but there as well.
const Header = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.auth.authenticated);
  const email = useSelector(state => state.auth.email);
  
  const handleSignOutClick = () => {
    dispatch(signout(() => {
      navigate("/");
    }));
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <Fragment>
          <Col md={2} style={{ width: "fit-content" }}>
            <UserEmailDiv>{email}</UserEmailDiv>
          </Col>
          <Col>
          <SignOutDiv onClick={handleSignOutClick}>Sign Out</SignOutDiv>
          </Col>
        </Fragment>
      );
    } else {
      return;
    }
  }

  return (
    <NavContainer>
      <Container fluid>
        <Row className="align-items-center">
          <Col md={{ span: 6, offset: 1 }}>
            <h1 className="display-3"><strong>Trello Jr</strong></h1>
          </Col>
          {renderLinks()}
        </Row>
      </Container>
    </NavContainer>
  )
};

export default Header;

const NavContainer = styled.div`
  position: fixed;
  z-index: 999;
  background: hsl(0, 0%, 12%);
  color: white;
  margin: 0;
  width: 100%;
  height: auto;
  padding: 1.5em;
`;

const UserEmailDiv = styled.div`
  font-size: 30px;
`;

const SignOutDiv = styled.div`
  font-size: 25px;
  &:hover {
    text-decoration: underline;
  }
`;