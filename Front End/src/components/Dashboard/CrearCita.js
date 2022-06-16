import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SelectMedico from './SelectMedico';
import SelectPaciente from './SelectPaciente';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack  from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { countActions } from '../../store/count';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CrearPaciente(props) {
  const token = useSelector( state => state.auth.token);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('');
  const [nombre, setNombre] = useState([]);
  const [medico, setMedico]  = useState([]);
  

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };
  const handleSubmit  = (e) => {
    e.preventDefault();
    const data = {
      fechaDeCita: date,
      horaDeCita: time,
      nombres: nombre,
      medico: medico
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios.post('https://localhost:7074/api/citas',data,config).then(res =>{
      dispatch(countActions.count())
    }).catch( err => {
      console.log(err);
    })
  }


  return (
    <div>
      <Button onClick={handleOpen}>Añadir Cita</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Container component="main" maxWidth="xs">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Añadir Cita
          </Typography>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
            <DesktopDatePicker
              label="Fecha Cita"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
            </Stack>
            </LocalizationProvider>
            <Box sx={{ minWidth: 120, mt: 1, mb: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hora</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Hora"
          onChange={handleChangeTime}
        >
          <MenuItem value={'9 AM'}>9 AM</MenuItem>
          <MenuItem value={'9 30 PM'}>9 30 AM</MenuItem>
          <MenuItem value={'10 AM'}> 10 AM</MenuItem>
          <MenuItem value={'10 30 AM'}>10 30 AM</MenuItem>
          <MenuItem value={'11 AM'}>11 AM</MenuItem>
          <MenuItem value={'11 30 AM'}>11 30 AM</MenuItem>
          <MenuItem value={'12 00 PM'}>12 PM</MenuItem>
          <MenuItem value={'2 PM'}>2 PM</MenuItem>
          <MenuItem value={'2 30 PM'}>2 30 PM</MenuItem>
          <MenuItem value={'3 PM'}>3 PM</MenuItem>
          <MenuItem value={'3 30 PM'}>3 30 PM</MenuItem>
          <MenuItem value={'4 PM'}>4 PM</MenuItem>
          </Select>
          </FormControl>
        </Box>

            <SelectPaciente/>
            <SelectMedico />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Cita
            </Button>
          </Box>
        </Box>
      </Container>
        </Box>
      </Modal>
    </div>
  );
}