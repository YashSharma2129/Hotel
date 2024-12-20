import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import google from "../../imgs/google.png";
import facebook from "../../imgs/facebook.png";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Alert, Snackbar } from "@mui/material";
import MyFooter from "../Footer/MyFooter";
import MyCopyright from "../Copyright/MyCopyright";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { logIn, googleSignIn, facebookSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setError("");
      try {
        await logIn(email, password);
        navigate("/");
      } catch (err) {
        setSnackbarMessage("Login failed. Please check your credentials.");
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage("Please fill in both email and password.");
      setOpenSnackbar(true);
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="login-form-main">
      <div className="login-form-login-div">
        <h1 className="login-form-login-heading">Log In</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            className="login-form-submit-btn"
          >
            Log In
          </Button>
          <div className="design">
            <hr />
            <b>OR</b>
          </div>
          <Button
            variant="contained"
            className="google"
            fullWidth
            onClick={handleGoogleSignIn}
            startIcon={<img src={google} alt="Google logo" />}
          >
            Log In with Google
          </Button>
          <Button
            variant="contained"
            className="facebook"
            fullWidth
            onClick={handleFacebookSignIn}
            startIcon={<img src={facebook} alt="Facebook logo" />}
          >
            Log In with Facebook
          </Button>
        </form>
      </div>

      <MyFooter />
      <MyCopyright />

      {/* Snackbar for error or success messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default Login;
