import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.js';
import CrearCita from './CrearCita';


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
            <TableCell>Hora</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Medico</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cita.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.fechaDeCita}</TableCell>
              <TableCell>{row.horaDeCita}</TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.medico}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CrearCita/>
    </React.Fragment>
  );
}