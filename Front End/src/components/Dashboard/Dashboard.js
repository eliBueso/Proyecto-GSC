import React, { useEffect, useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useSelector } from 'react-redux';
import Medicos from './Medicos';
import Pacientes from './Pacientes';
import Citas from './Citas';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
       Hospital Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.username);
  const count = useSelector(state => state.count.count);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [ pacientes , setPacientes] = useState([]);
  const [ medicos , setMedicos] = useState([]);
  const [ citas , setCitas] = useState([]);


  const [ esPaciente, setEsPaciente] = useState(false);
  const [ esMedico, setEsMedico] = useState(false);
  const [ esCita, setEsCita ] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(()=>{
    axios.get('https://localhost:7074/api/pacientes', config).then( res => {
      setPacientes(res.data.result);
    }).catch( error =>{
      if(error.response.status  === 401 ){
        dispatch(authActions.logout())
      }
    })
  }, [count])

  useEffect(()=>{
    axios.get('https://localhost:7074/api/medicos', config).then( res => {
      setMedicos(res.data.result);
    }).catch( error =>{
      if(error.response.status  === 401 ){
        dispatch(authActions.logout())
      }
    })
  }, [count])

  
  useEffect(()=>{
    axios.get('https://localhost:7074/api/citas', config).then( res => {
      setCitas(res.data.result);
    }).catch( error =>{
      if(error.response.status  === 401 ){
        dispatch(authActions.logout())
      }
    })
  }, [count])

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login", { replace: true })
  } 

  const handleCitas =  () =>{
    setEsCita(true);
    setEsMedico(false);
    setEsPaciente(false);
  }
  const handleMedicos =  () =>{
    setEsMedico(true);
    setEsPaciente(false);
    setEsCita(false);
  }
  const handlePacientes =  () =>{
    setEsCita(false);
    setEsPaciente(true);
    setEsMedico(false);
  }

  const handleDashboard =  () =>{
    setEsCita(false);
    setEsPaciente(false);
    setEsMedico(false);
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            {user}
            <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={handleDashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={handleCitas}>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Citas" />
            </ListItemButton>
            <ListItemButton onClick={handleMedicos}>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Medicos" />
            </ListItemButton>
            <ListItemButton onClick={handlePacientes}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes" />
            </ListItemButton>
          </List>
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
               { esMedico ? <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}><Medicos list={medicos} /> </Paper> : null } 
                { esPaciente ? <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}><Pacientes list={pacientes}/> </Paper> : null }
               {esCita ? <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}><Citas list={citas}/> </Paper> : null } 
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}