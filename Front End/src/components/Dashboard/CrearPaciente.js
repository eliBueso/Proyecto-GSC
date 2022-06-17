import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { countActions } from '../../store/count';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
  const token = useSelector(state => state.auth.token);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setNombres('');
    setApellidos('');
    setDireccion('');
    setTelefono('');
    setError(false);
    setSuccess(false);
    setDisable(false);
  };
  const dispatch = useDispatch();

  const [nombres, setNombres ] = useState('');
  const [apellidos, setApellidos ] = useState('');
  const [direccion, setDireccion ] = useState('');
  const [telefono, setTelefono ] = useState('');

  const [Success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nombres: nombres,
      apellidos: apellidos,
      direccion: direccion,
      telefono: telefono
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios.post('https://localhost:7074/api/pacientes',data,config).then(res =>{
      dispatch(countActions.count())
      setSuccess(true);
      setDisable(true);
    }).catch( err => {
      console.log(err);
      setError(true);
    })

  }

  return (
    <div>
      <Button onClick={handleOpen}>Añadir Paciente</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Container component="main" maxWidth="xs">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Añadir Medico
          </Typography>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombres"
              label="Nombres"
              name="nombres"
              autoFocus
              value={nombres}
              onChange={ e => setNombres(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="apellidos"
              label="Apellidos"
              id="apellidos"
              value={apellidos}
              onChange={ e => setApellidos(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="direccion"
              label="Direccion"
              id="direccion"
              value={direccion}
              onChange={ e => setDireccion(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="telefono"
              label="Telefono"
              id="telefono"
              value={telefono}
              onChange={ e => setTelefono(e.target.value)}
            />
            { !disable ? <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Paciente
            </Button> : null}
          </Box>
        </Box>
        { Success ? <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Accion Realizada correctamente — <strong>Se actualizo</strong>
      </Alert> : null}
      {error ? <Alert severity="error"><AlertTitle>Error</AlertTitle>
          Error al realizar accion — <strong>No se guardo</strong>
        </Alert> : null}
      </Container>
        </Box>
      </Modal>
    </div>
  );
}

