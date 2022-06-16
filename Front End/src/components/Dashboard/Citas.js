import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.js';



function preventDefault(event) {
  event.preventDefault();
}


export default function Orders(props) {
  
  const cita = props.list;

  return (
    <React.Fragment>
      <Title>Lista de Citas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cita.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.fechaDeCita}</TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apellidos}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.fechaDeNacimiento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Agregar Cita
      </Link>
    </React.Fragment>
  );
}