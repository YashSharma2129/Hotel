import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Alert } from "react-bootstrap";
import { getDatabase, ref, set } from "firebase/database";
import MyFooter from "../Footer/MyFooter";
import MyCopyright from "../Copyright/MyCopyright";
import "./Signup.css";

const Signup = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const { signUp } = useUserAuth();
  const db = getDatabase();

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.username ||
      !userData.password ||
      !userData.email ||
      !userData.fullname
    ) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    try {
      // Sign up the user
      await signUp(
        userData.email,
        userData.password,
        userData.fullname,
        userData.username
      );

      // Add user data to Firebase Realtime Database
      const userRef = ref(db, "users/" + userData.username);
      await set(userRef, {
        fullname: userData.fullname,
        email: userData.email,
        username: userData.username,
      });

      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="signup-form-main">
        <div className="signup-form-signup-div">
          <h1 className="signup-form-signup-heading">Sign Up</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <center>
            <div>
              <TextField
                type="text"
                label="Fullname"
                variant="standard"
                className="signup-form-input-fields"
                name="fullname"
                value={userData.fullname}
                onChange={postUserData}
              />
            </div>
            <div>
              <TextField
                type="text"
                label="Username"
                variant="standard"
                className="signup-form-input-fields"
                name="username"
                value={userData.username}
                onChange={postUserData}
              />
            </div>
            <div>
              <TextField
                type="email"
                label="Email"
                variant="standard"
                className="signup-form-input-fields"
                name="email"
                value={userData.email}
                onChange={postUserData}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Password"
                variant="standard"
                className="signup-form-input-fields"
                name="password"
                value={userData.password}
                onChange={postUserData}
              />
            </div>
            <Button
              variant="contained"
              className="signup-form-submit-btn"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </center>
        </div>
      </div>
      <MyFooter />
      <MyCopyright />
    </>
  );
};

export default Signup;
