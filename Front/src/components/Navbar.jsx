import React, { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Avatar from 'react-avatar';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import vacationImg from '../images/vacations.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useGoogleLogout } from 'react-google-login';
const pages = ['Home', 'Vacation', 'On Follow'];
const settings = ['Profile', 'Logout'];

const Navbar = ({ executeVacationScroll, executeVacationOnFollowScroll }) => {
  let navigate = useNavigate();

  const userData = useSelector((state) => state.userData);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // Test Scroll
  //
  const handleClickSetting = /* async */ (event) => {
    if (event.target.innerHTML === 'Profile') {
      /* await */ navigate('profile');
      scrollTop();
    } else {
      if (localStorage.getItem('token')) localStorage.removeItem('token');
      else {
        localStorage.removeItem('googleToken');
        signOut();
      }
      navigate('/signin');
    }
  };
  // const pages = ['Home', 'Vacation', 'On Follow', 'Blog'];

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClickPages = async (e) => {
    // On mobile - innerHTML, on Laptop value
    const page = e.target.value || e.target.innerHTML;
    // console.log(page);
    switch (page) {
      case 'Home':
        await navigate('/home');
        scrollTop();
        break;
      case 'Vacation':
        await navigate('/home');
        executeVacationScroll();
        break;
      case 'On Follow':
        await navigate('/home');
        executeVacationOnFollowScroll();
        break;
      case 'Blog':
        break;
      default:
        break;
    }
  };

  const onLogoutSuccess = () => {
    // console.log('logout');
  };
  const onFailure = () => {
    // console.log('logout fail');
  };
  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID,
    onLogoutSuccess: onLogoutSuccess,
    onFailure: onFailure,
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={vacationImg} alt="vacation" />
          &nbsp;&nbsp;&nbsp;
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* On Mobile */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography onClick={handleClickPages} textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          {/* On Computer */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                value={page}
                key={page}
                style={{ border: '1px solid #' }}
                onClick={(e) => {
                  handleCloseNavMenu();
                  handleClickPages(e);
                }}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  marginLeft: '40px',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userData.googleId ? (
                  <Avatar round={true} size="60" googleId={userData.googleId} />
                ) : (
                  <Avatar round={true} size="60" name={userData.firstName} />
                )}{' '}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography
                    value={setting}
                    onClick={handleClickSetting}
                    textAlign="center"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
