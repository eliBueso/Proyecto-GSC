import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.js';
import ModalPaciente from './ModalPaciente';



export default function Orders(props) {
  
  const paciente = props.list;

  return (
    <React.Fragment>
      <Title>Lista de Pacientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Telefono</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paciente.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apellidos}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.telefono}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        <ModalPaciente/>
      </Link>
    </React.Fragment>
  );
}