import styled from "styled-components";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../actions";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  org: Yup.string().required(),
  password: Yup.string().required(),
});

// Login page with straightforward login form. 
// Sign up button is there for looks. If we decide to add that functionality
//   the sign up button can just link to a Sign Up Page.
const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    dispatch(
      signup(data, () => {
        navigate("/boards");
      })
    );
  };

  const handleBackButton = () => {
    navigate("/");
  }

  return (
    <SignUpContainer>
      <Container>
        <h2 className="mb-3">Sign up for Trello Jr!!</h2>
        <h4 className="mb-4">Please fill out all the fields below to sign up.</h4>

        <Form onSubmit={handleSubmit(handleFormSubmit)} className="col-md-4">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" name="email" {...register("email", { required: true })} />
            {errors.email?.message}
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" {...register("password", { required: true })}/>
            {errors.password?.message}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" name="firstName" {...register("firstName", { required: true })} />
            {errors.firstName?.message}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" name="lastName" {...register("lastName", { required: true })} />
            {errors.lastName?.message}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupOrg">
            <Form.Label>Organization</Form.Label>
            <Form.Control type="text" placeholder="Organization" name="org" {...register("org", { required: true })} />
            {errors.org?.message}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button type="submit" >Sign Up</Button>
            </Col>
            <Col>
              <Button onClick={handleBackButton}>Back to Login</Button>
            </Col>
          </Form.Group>
        </Form>

      </Container>
    </SignUpContainer>
  )
  
};

export default Signup;

const SignUpContainer = styled.div`
  padding-top: 160px;
  padding-left: 100px;
`;