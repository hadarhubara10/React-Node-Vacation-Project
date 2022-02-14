import React, { useEffect, useRef, useState } from 'react';
import LinkMUI from '@mui/material/Link';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { checkGoogleToken, checkToken } from '../services/signIn.service';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authenticationAction';
import { setVacations } from '../redux/actions/vacationAction';
import { getVacations } from '../services/vacations.service';
import Footer from './Footer';
import socketIOClient from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';

const Home = ({ executeVacationScroll, executeVacationOnFollowScroll }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('loading');
  const navigate = useNavigate();
  const tokenFromLocalStorage = localStorage.getItem('token');
  // const idFromLocalStorage = localStorage.getItem('_id');
  const onUpdateVacationSocket = () => {
    toast.info('The admin change details from one of the vacations!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  useEffect(() => {
    const googleToken = localStorage.getItem('googleToken');
    if (googleToken) {
      checkGoogleToken(googleToken)
        .then((res) => {
          // console.log(res);
          if (res.data) {
            // console.log(res);
            dispatch(setUser(res.data));
            res.data && setToken(true);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.error(err.response.data);
            setToken(false);
          }
        });
    } else if (tokenFromLocalStorage) {
      checkToken(tokenFromLocalStorage)
        .then((res) => {
          if (res.data) {
            // console.log(res);
            dispatch(setUser(res.data));
            if (res.data.email === 'test@test.com') navigate('/admin');
            res.data && setToken(true);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.error(err.response.data);
            setToken(false);
          }
        });
    } else if (!tokenFromLocalStorage && !googleToken) {
      setToken(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getVacationsFromServer();
  }, []);
  const getVacationsFromServer = () => {
    getVacations().then((res) => {
      res.data && dispatch(setVacations(res.data));
    });
  };

  useEffect(() => {
    // const socket = socketIOClient('http://localhost:3002/');
    const socket = socketIOClient('https://vacation-node-react.herokuapp.com/');
    socket.on('VacationsUpdate', () => {
      // If i'm want a message of the update.
      getVacationsFromServer();
      onUpdateVacationSocket();
    });
  }, []);

  if (token === 'loading') {
    return <Loader />;
  } else if (!token) {
    return (
      <div>
        <div>not token - you need to login</div>
        <LinkMUI component={Link} to="/signin">
          signin
        </LinkMUI>
      </div>
    );
  } else if (token)
    return (
      <div style={{ minHeight: '100VH', position: 'relative' }}>
        <Navbar
          executeVacationScroll={executeVacationScroll}
          executeVacationOnFollowScroll={executeVacationOnFollowScroll}
        />
        <Outlet />
        <ToastContainer />
        <footer>
          <Footer />
        </footer>
      </div>
    );
};

export default Home;
