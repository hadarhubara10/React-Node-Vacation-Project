import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';
import RotatePhone from './RotatePhone';
import { Outlet } from 'react-router-dom';
import useWindowSize from '../../helper/useWindowSize';

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Nav Bar */}
        <NavbarAdmin
          open={open}
          position="absolute"
          toggleDrawer={toggleDrawer}
        />
        {/* End Nav Bar */}
        {/* Side Nav Bar */}
        <SidebarAdmin open={open} toggleDrawer={toggleDrawer} />
        {/* End Side Nav Bar */}

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Outlet />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  const [width, height] = useWindowSize();
  const [rotate, setRotate] = useState(false);
  useEffect(() => {
    width < height ? setRotate(true) : setRotate(false);
  }, [width]);
  return <>{rotate ? <RotatePhone /> : <DashboardContent />}</>;
}

{
  /* Recent Deposits */
}
//  <Grid item xs={12} md={4} lg={3}>
//  <Paper
//  sx={{
//  p: 2,
//  display: 'flex',
//  flexDirection: 'column',
//  height: 240,
//  }}
//  >
{
  /* { </Paper> */
}
{
  /* </Grid> */
}
{
  /* Recent Orders */
}
{
  /* <Grid item xs={12}> */
}
{
  /* <Paper */
}
{
  /* sx={{ p: 2, display: 'flex', flexDirection: 'column' }} */
}
{
  /* ></Paper> */
}
{
  /* </Grid> } */
}
