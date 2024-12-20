import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Firebase configuration (make sure to replace these with your own details)
const firebaseConfig = {
  apiKey: "AIzaSyBAE3EZUTtwQmCFc4Dyl-Tg7KWEtSTG5jI",
  authDomain: "hotel-management-78c2a.firebaseapp.com",
  projectId: "hotel-management-78c2a",
  storageBucket: "hotel-management-78c2a.firebasestorage.app",
  messagingSenderId: "250903432765",
  appId: "1:250903432765:web:ebb36732fe17ccda9e2454",
  measurementId: "G-4WTRDFZ8YD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { db, auth, app };