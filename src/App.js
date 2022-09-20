import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { UserProvider } from "./contexts/userContext";
import Account from "./pages/Account";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  }

  const authenticate = () => {
    localStorage.getItem("token") !== null
      ?
      fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUser({
            id: data.userProfile._id,
            isAdmin: data.userProfile.isAdmin
          })
        })
      :
      setUser({
        id: null,
        isAdmin: null
      })
  }

  useEffect(() => {
    authenticate();
  }, [])

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <div className="App">
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/account" element={<Account />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App;
