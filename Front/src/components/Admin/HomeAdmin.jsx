import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { checkToken } from '../../services/signIn.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/authenticationAction';
import Loading from '../Loader';
import LinkMUI from '@mui/material/Link';
import { Link } from 'react-router-dom';

// import NavbarAdmin from './NavbarAdmin';

const HomeAdmin = () => {
  const [token, setToken] = useState('loading');
  const dispatch = useDispatch();
  const tokenFromLocalStorage = localStorage.getItem('token');
  useEffect(() => {
    checkToken(tokenFromLocalStorage)
      .then((res) => {
        if (res.data) {
          // console.log(res);
          dispatch(setUser(res.data));
          res.data.email === 'test@test.com' ? setToken(true) : setToken(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response.data);
          setToken(false);
        }
      });
  }, []);

  if (token === 'loading') return <Loading />;
  else if (!token) {
    return (
      <div>
        <div>You're Not Authorized.</div>
        <LinkMUI component={Link} to="/signin">
          signin
        </LinkMUI>
      </div>
    );
  } else {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
};

export default HomeAdmin;
