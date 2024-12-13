import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import google from "../../imgs/google.png";
import { useUserAuth } from "../../Context/UserAuthContext";
import facebook from "../../imgs/facebook.png";
import "./Login.css";
import { Alert } from "react-bootstrap";
import MyFooter from "../Footer/MyFooter";
import MyCopyright from "../Copyright/MyCopyright";

const Login = ({ posts }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const { fbLogIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (email !== "" && password !== "") {
      e.preventDefault();
      setError("");
      try {
        await logIn(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please fill the input fields");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="login-form-main">
        <div className="login-form-login-div">
          <h1 className="login-form-login-heading">Log In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <center>
            <div>
              <TextField
                type="email"
                id="standard-basic"
                label="Email"
                variant="standard"
                className="login-form-input-fields"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="password"
                id="standard-basic"
                label="Password"
                variant="standard"
                className="login-form-input-fields"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              className="login-form-submit-btn"
              onClick={(e) => handleSubmit(e)}
            >
              Log In
            </Button>
            <div className="design">
              <hr />
              <b>OR</b>
            </div>
            <center>
              <Button
                variant="contained"
                className="google"
                onClick={(e) => handleGoogleSignIn(e)}
              >
                <img src={google} /> Log In with Google+
              </Button>
              <br />
              <Button
                variant="contained"
                className="facebook"
                onClick={(e) => handleFacebookSignIn(e)}
              >
                <img src={facebook} /> Log In with Facebook
              </Button>
            </center>
          </center>
        </div>
      </div>
      <div>
        <h2>Posts from MongoDB:</h2>
        <div>
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            ))}
        </div>
      </div>
      <MyFooter />
      <MyCopyright />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();

  return {
    props: { posts },
  };
}

export default Login;
