import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({handleNombre}) {
    const token = useSelector(state => state.auth.token);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [paciente, setPaciente] = useState([]);
 

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  axios.get('https://localhost:7074/api/pacientes', config).then( res => {
      setPaciente(res.data.result);
    }).catch( error =>{
      console.log(error);
    })

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ mt:2 , m: 1, width: 350 }}>
        <InputLabel id="demo-multiple-name-label">Pacientes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        > 
          { paciente.map((name) => (
            <MenuItem
              key={name.id}
              value={name.nombres}
              style={getStyles(name.nombres, personName, theme)}
            >
              {name.nombres}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
