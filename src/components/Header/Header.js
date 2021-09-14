import './Header.css';
import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Avatar, Tooltip } from '@material-ui/core';
import { RiCopperCoinLine } from "react-icons/ri"
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const signOut = () => {
    setLoggedInUser({})
    Cookies.remove('sid')
  }

  return (
    <div className="Header">
      <Navbar expand="lg">
        <a href="/" style={{ textDecoration: 'none' }}>
          <Navbar.Brand className="text-white">MediaLab</Navbar.Brand>
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center">
            {
              loggedInUser.email && loggedInUser.verified &&
              <NavLink to={`/profile/${loggedInUser._id}`} className="d-flex align-items-center link_text">
                <Tooltip title="my profile">
                  <Avatar
                    alt={loggedInUser.fullname}
                    src={loggedInUser.profileImg}
                  />
                </Tooltip>
                <div className="ml-2 text-white">
                  <p className="profile_short_info">{loggedInUser.fullname}</p>
                  <Tooltip title="chips"><p className="profile_short_info"><RiCopperCoinLine /> {loggedInUser.chips}</p></Tooltip>
                </div>
              </NavLink>
            }
            {loggedInUser.email && loggedInUser.verified && <NavLink to="/" className="link_text">Activity</NavLink>}
            {loggedInUser.email && loggedInUser.verified && <NavLink to="/users" className="link_text">Users</NavLink>}
            {loggedInUser.email && loggedInUser.verified && <NavLink to="/leaderboard" className="link_text">LeaderBoard</NavLink>}
            {!loggedInUser.email && <NavLink to="/login" className="link_text">Login/Registration</NavLink>}
            {loggedInUser.email && <p style={{ cursor: 'pointer' }} className="link_text text-danger mb-0" onClick={signOut}>Signout</p>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;