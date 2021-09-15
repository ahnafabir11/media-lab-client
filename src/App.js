import "./App.css";
import Cookies from 'js-cookie';
import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PrivateLogin from './PrivateLogin';
import VerifiedUser from './VerifiedUser';
import AntiVerify from './AntiVerify';
import Header from "./components/Header/Header";
import Activity from "./pages/Activity/Activity";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import UserVerification from './pages/UserVerificatioin/UserVerification';
import Followers from "./pages/Followers/Followers";

export const UserContext = createContext()
export const PostContext = createContext()
export const AllUserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const userId = Cookies.get('sid')
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setLoggedInUser(data))

    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
      .then(res => res.json())
      .then(data => {
        setAllPosts(data.reverse())
        setDataLoaded(true)
      })

    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users`)
      .then(res => res.json())
      .then(data => setAllUsers(data))
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <PostContext.Provider value={[allPosts, setAllPosts]}>
        <AllUserContext.Provider value={[allUsers, setAllUsers]}>
          <Router>
            <Header />
            <Switch>
              <VerifiedUser path="/leaderboard">
                <LeaderBoard />
              </VerifiedUser>
              <VerifiedUser path="/post/create">
                <CreatePost />
              </VerifiedUser>
              <VerifiedUser path="/followers/:id">
                <Followers />
              </VerifiedUser>
              <VerifiedUser path="/profile/edit">
                <EditProfile />
              </VerifiedUser>
              <VerifiedUser path="/profile/:id">
                <Profile />
              </VerifiedUser>
              <VerifiedUser path="/users">
                <Users />
              </VerifiedUser>
              <PrivateRoute path="/verify">
                <AntiVerify path="/verify">
                  <UserVerification />
                </AntiVerify>
              </PrivateRoute>
              <PrivateLogin path="/register">
                <Register />
              </PrivateLogin>
              <PrivateLogin path="/login">
                <Login />
              </PrivateLogin>
              <VerifiedUser path="/">
                <Activity dataLoaded={dataLoaded} />
              </VerifiedUser>
            </Switch>
          </Router>
        </AllUserContext.Provider>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
