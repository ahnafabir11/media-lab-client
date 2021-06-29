import './Header.css';
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {Avatar, Tooltip} from '@material-ui/core';
import { RiCopperCoinLine } from "react-icons/ri"
import taslimImg from '../../images/taslim.png';

const Header = () => {
  return (
    <div className="Header">
      <Navbar expand="lg">
        <Navbar.Brand className="text-white">MediaLab</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center">
            <NavLink to="/" className="d-flex align-items-center link_text">
              <Tooltip title="my profile"><Avatar alt="Taslim Khaled" src={taslimImg} /></Tooltip>
              <div className="ml-2 text-white">
                <p className="profile_short_info">Taslim Khaled</p>
                <Tooltip title="chips"><p className="profile_short_info"><RiCopperCoinLine /> 1035503</p></Tooltip>
              </div>
            </NavLink>
            <NavLink to="/" className="link_text">Activity</NavLink>
            <NavLink to="/users" className="link_text">Users</NavLink>
            <NavLink to="/" className="link_text">Chats</NavLink>
            <NavLink to="/login" className="link_text">Login</NavLink>
            <NavLink to="/" className="link_text text-danger">Signout</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;