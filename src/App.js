import "./App.css";
import { useState, createContext, useEffect } from "react";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Header from "./components/Header/Header";
import Activity from "./pages/Activity/Activity";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    const userId = Cookies.get('sid')
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setLoggedInUser(data);
      })
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path="/leaderboard">
            <LeaderBoard />
          </PrivateRoute>
          <PrivateRoute path="/post/create">
            <CreatePost />
          </PrivateRoute>
          <PrivateRoute path="/profile/edit">
            <EditProfile />
          </PrivateRoute>
          <PrivateRoute path="/profile/:id">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Activity />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
