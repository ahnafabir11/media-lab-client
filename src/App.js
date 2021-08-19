import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Activity from "./pages/Activity/Activity";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/post/create">
          <CreatePost />
        </Route>
        <Route path="/profile/edit/:id">
          <EditProfile />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Activity />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
