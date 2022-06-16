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
  
  const medico = props.list;

  return (
    <React.Fragment>
      <Title>Lista de Medicos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Especialidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medico.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apellidos}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.especialidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Agregar Medico
      </Link>
    </React.Fragment>
  );
}