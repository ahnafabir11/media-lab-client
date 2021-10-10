import "./App.css";
import Cookies from 'js-cookie';
import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import WebsiteLoad from "./components/WebsiteLoad/WebsiteLoad";
import WrongUrl from "./components/WrongUrl/WrongUrl";

export const UserContext = createContext()
export const PostContext = createContext()
export const AllUserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loginDataLoaded, setLoginDataLoaded] = useState(false)

  useEffect(() => {
    const userId = Cookies.get('sid')
    if (userId) {
      fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users/${userId}`)
        .then(res => res.json())
        .then(data => {
          setLoggedInUser(data)
          setLoginDataLoaded(true)
        })
    } else {
      setLoginDataLoaded(true)
    }

    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
      .then(res => res.json())
      .then(data => {
        setAllPosts(data.reverse())
        setDataLoaded(true)
      })

    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users`)
      .then(res => res.json())
      .then(data => setAllUsers(data))
  }, [loggedInUser.email])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <PostContext.Provider value={[allPosts, setAllPosts]}>
        <AllUserContext.Provider value={[allUsers, setAllUsers]}>
          {
            !loginDataLoaded ? <WebsiteLoad /> :
              <Router>
                <Header />
                <Switch>
                  <VerifiedUser path="/leaderboard" exact>
                    <LeaderBoard />
                  </VerifiedUser>
                  <VerifiedUser path="/post/create" exact>
                    <CreatePost />
                  </VerifiedUser>
                  <VerifiedUser path="/followers/:id" exact>
                    <Followers />
                  </VerifiedUser>
                  <VerifiedUser path="/profile/edit" exact>
                    <EditProfile />
                  </VerifiedUser>
                  <PrivateRoute path="/profile/:id" exact>
                    <Profile />
                  </PrivateRoute>
                  <VerifiedUser path="/users" exact>
                    <Users />
                  </VerifiedUser>
                  <PrivateRoute path="/verify" exact>
                    <AntiVerify path="/verify" exact>
                      <UserVerification />
                    </AntiVerify>
                  </PrivateRoute>
                  <PrivateLogin path="/register" exact>
                    <Register />
                  </PrivateLogin>
                  <PrivateLogin path="/login" exact>
                    <Login />
                  </PrivateLogin>
                  <Route path="/" exact>
                    <Activity dataLoaded={dataLoaded} />
                  </Route>
                  <Route path="*">
                    <WrongUrl />
                  </Route>
                </Switch>
              </Router>
          }
        </AllUserContext.Provider>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
