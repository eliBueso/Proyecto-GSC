import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { useSelector } from 'react-redux';

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



function getStyles(name, med, theme) {
  return {
    fontWeight:
    med.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({med, Setmed}) {
  const token = useSelector(state => state.auth.token);
  const theme = useTheme();
  const [medicos, setMedicos] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  axios.get('https://localhost:7074/api/medicos', config).then( res => {
      setMedicos(res.data.result);
    }).catch( error =>{
      console.log(error);
    })

  return (
    <div>
      <FormControl sx={{ m: 1, width: 350 }}>
        <InputLabel id="demo-multiple-name-label">Medico</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={med}
          onChange={Setmed}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        > 
          { medicos.map((name) => (
            <MenuItem
              key={name.id}
              value={name.nombres}
              style={getStyles(name.nombres, med, theme)}
            >
              {name.nombres}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
