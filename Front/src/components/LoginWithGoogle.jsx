import React from 'react';
import GoogleButton from 'react-google-button';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router';
const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const onSuccess = (response) => {
    // console.log(response);
    let token = response.tokenId;
    localStorage.setItem('googleToken', token);
    localStorage.removeItem('token');
    navigate('/home');
  };
  const onFailure = (err) => {
    // console.log(err);
    // console.log('Error fail Google');
  };
  return (
    <>
      <GoogleLogin
        clientId="141177001233-v632d4e1s304k9fd1gk77t910g9vr56q.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        render={(renderProps) => (
          <GoogleButton
            style={{ width: '100%' }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          ></GoogleButton>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

export default LoginWithGoogle;
