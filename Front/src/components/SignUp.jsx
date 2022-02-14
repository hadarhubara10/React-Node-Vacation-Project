import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signupService } from '../services/signIn.service';

const theme = createTheme();

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const signUpToServer = (data) => {
    // console.log(data);
    const { firstName, lastName, email, password } = data;
    signupService(firstName, lastName, email, password)
      .then((res) => {
        alert('signup work!');
      })
      .then(() => navigate('/signin'))
      .catch((err) => {
        console.error(err.response.data);
      });
  };
  // console.log(errors);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(signUpToServer)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', {
                    required: true,
                  })}
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name *"
                  autoFocus
                />
                {errors.firstName?.type === 'required' && (
                  <span style={{ color: 'red' }}>* firstName is required</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', {
                    required: true,
                  })}
                  fullWidth
                  id="lastName"
                  label="Last Name *"
                  name="lastName"
                  autoComplete="family-name"
                />
                {errors.lastName?.type === 'required' && (
                  <span style={{ color: 'red' }}>* lastName is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email', {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  })}
                  // required
                  fullWidth
                  id="email"
                  label="Email Address *"
                  name="email"
                  autoComplete="email"
                />
                {errors.email?.type === 'required' && (
                  <span style={{ color: 'red' }}>* Email is required</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span style={{ color: 'red' }}>* Email is not valid</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', { required: true, minLength: 6 })}
                  // required
                  fullWidth
                  name="password"
                  label="Password *"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />

                {errors.password?.type === 'required' && (
                  <span style={{ color: 'red' }}>* Password is required</span>
                )}
                {errors.password?.type === 'minLength' && (
                  <span style={{ color: 'red' }}>
                    * The password must be at least 6 characters long
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, height: '50px' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkMUI component={Link} to="/signin">
                  Already have an account? Sign in
                </LinkMUI>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
