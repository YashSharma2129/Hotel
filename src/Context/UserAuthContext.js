import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { child, get, ref, set } from "firebase/database";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LOGIN WITH EMAIL AND PASSWORD
  function logIn(email, password) {
    get(child(ref(db), "/users"))
      .then((data) => {
        const userAuth = Object.values(data.val()).filter(
          (item) => item.email === email && item.isAdmin === false
        );
        if (userAuth[0]) {
          return signInWithEmailAndPassword(auth, email, password).catch(
            (error) => {
              alert("Error signing in: " + error.message);
            }
          );
        } else {
          alert("No user found. Please sign up first.");
        }
      })
      .catch((error) => {
        alert("Error fetching data: " + error.message);
      });
  }

  // Signup
  function signUp(email, password, fullname, username) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return set(ref(db, `users/${username}`), {
          email,
          fullname,
          username,
          password,
          isAdmin: false,
        });
      })
      .catch((error) => {
        alert("Error signing up: " + error.message);
      });
  }

  // Logout
  function logOut() {
    return signOut(auth);
  }

  // Google Authentication
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert("Error with Google Sign-In: " + error.message);
      });
  }

  // Facebook Authentication
  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookAuthProvider)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        alert("Error with Facebook Sign-In: " + error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <userAuthContext.Provider value={{ user, error, setError }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
