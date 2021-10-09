import './Header.css';
import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MdMoreVert } from "react-icons/md";
import { MdEqualizer } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { RiCopperCoinLine } from "react-icons/ri";
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: 64,
  },
  appbar: {
    background: "#323E59",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = () => {
  const classes = useStyles()
  const history = useHistory()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const navigatePage = (pageName) => {
    history.push(pageName)
    setMobileMoreAnchorEl(null)
  }

  const signOut = () => {
    setMobileMoreAnchorEl(null)
    setLoggedInUser({})
    Cookies.remove('sid')
  }

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget)

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigatePage("/")}>
        <IconButton color="inherit">
          <MdPhotoLibrary />
        </IconButton>
        <p className="mb-0">Activity</p>
      </MenuItem>

      <MenuItem onClick={() => navigatePage(`/users`)}>
        <IconButton color="inherit">
          <MdPeople />
        </IconButton>
        <p className="mb-0">Users</p>
      </MenuItem>

      <MenuItem onClick={() => navigatePage(`/leaderboard`)}>
        <IconButton color="inherit">
          <MdEqualizer />
        </IconButton>
        <p className="mb-0">Leaderboard</p>
      </MenuItem>

      <MenuItem onClick={signOut}>
        <IconButton color="inherit">
          <MdExitToApp className="text-danger" />
        </IconButton>
        <p className="mb-0 text-danger">Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Typography
            noWrap
            variant="h6"
            style={{ cursor: "pointer" }}
            onClick={() => navigatePage("/")}
          > MediaLab
          </Typography>

          <div className={classes.grow} />

          {
            loggedInUser.email &&
            <>
              <div
                className="d-flex align-items-center mr-2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigatePage(`/profile/${loggedInUser._id}`)}
              >
                <Tooltip title="my profile">
                  <Avatar
                    alt={loggedInUser.fullname}
                    src={loggedInUser.profileImg}
                  />
                </Tooltip>
                <div className="ml-2 text-white" style={{ maxWidth: "115px" }}>
                  <Typography noWrap>{loggedInUser.fullname}</Typography>
                  <Tooltip title="chips"><p className="profile_short_info"><RiCopperCoinLine /> {loggedInUser.chips}</p></Tooltip>
                </div>
              </div>

              <div className={classes.sectionDesktop}>
                <Tooltip title="activity">
                  <IconButton
                    size="medium"
                    color="inherit"
                    onClick={() => navigatePage("/")}
                  >
                    <MdPhotoLibrary size="30px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="users">
                  <IconButton
                    size="medium"
                    color="inherit"
                    onClick={() => navigatePage("/users")}
                  >
                    <MdPeople size="30px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="leaderboard">
                  <IconButton
                    size="medium"
                    color="inherit"
                    onClick={() => navigatePage("/leaderboard")}
                  >
                    <MdEqualizer size="30px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="sign out">
                  <IconButton
                    size="medium"
                    color="inherit"
                    onClick={signOut}
                  >
                    <MdExitToApp size="30px" className="text-danger" />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label={mobileMenuId}
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MdMoreVert />
                </IconButton>
              </div>
            </>
          }

          {
            !loggedInUser.email &&
            <Button
              color="inherit"
              onClick={() => navigatePage("/register")}
            >
              Register
            </Button>
          }

        </Toolbar>
      </AppBar>
      {loggedInUser.email && renderMobileMenu}
    </div>
  )
};

export default Header;