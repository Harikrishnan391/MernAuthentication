import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[image,setImage]=useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("file",image);
        const res = await updateUser(formData).unwrap();

        // const res = await updateUser({
        //   _id: userInfo._id,
        //   name,
        //   email,
        //   password,
        //   image
        // }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlledId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlledId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlledId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlledId="confirmPassword">
          <Form.Label>ConfirmPassword</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="image">
          <Form.Label>Profile picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;

// const res = await updateProfile({
//   _id: userInfo._id,
//   name,
//   email,
//   password,
// }).unwrap();
