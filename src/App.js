import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import { UserAuthContextProvider } from "./Context/UserAuthContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import Contact from "./screens/Contact/Contact";
import Rooms from "./screens/Rooms/Rooms";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SingleRoom from "./screens/Rooms/SingleRoom";
import Booknow from "./components/Booking/Booknow";
import MyBookings from "./components/Booking/MyBookings";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // You can implement your Firebase logic here if required
    // dispatch(ReadFromFirebase()); // Uncomment and implement this if you're fetching data from Firebase
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/singleRoom/:roomType" element={<SingleRoom />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route
              path="/booknow/:roomType"
              element={
                <ProtectedRoute>
                  <Booknow />
                </ProtectedRoute>
              }
            />
            {/* Add more routes or handle fallback if necessary */}
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
