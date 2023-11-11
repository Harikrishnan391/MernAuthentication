import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import React from 'react'
const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const PROFILE_IMAGE_DIR_PATH = "http://localhost:5000/userImage/";
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
    
          {userInfo ? (
             
            <>
              {userInfo.imagePath && (
                <img
                  src={PROFILE_IMAGE_DIR_PATH + userInfo.imagePath}
                  alt={userInfo.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </>
          ) : ("")}
          <h1 className="text-center mb-4">
            {userInfo ? ` Welcome ${userInfo.name}` : "MERN Authentication"}
          </h1>
          <p className="text-center mb-4">
            {userInfo
              ? `Email:${userInfo.email}`
              : "   This is a boilerplater for MERN authentication that stores a JWT inan Http-Only cookie .It also uses Redux Toolkit and the React  Bootstrap library"}
          </p>
          <div className="d-flex">
            {userInfo ? (
              ""
            ) : (
              <>
                <LinkContainer to="/login">
                  <Button variant="primary" className="me-3">
                    SignIn
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">SignUp</Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
