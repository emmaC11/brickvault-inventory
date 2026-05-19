import React, {useState} from 'react'
import { Box, Typography, Button, TextField } from '@mui/material'
export default function SetIntake() {

const [setNumber, setSetNumber] = useState('');
const [success, setSuccess] = useState('');
const [error, setError] = useState('');
const [formData, setFormData] = useState({
  setNumber: '',
  name: '',
  year: '',
  numParts: '',
  price: '',
  notes: '',
  stock:''
});

// fetch data from rebrickabke api
const fetchSetData = async () =>
{
  if (!setNumber) {
    setError('Please enter a set number');
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/rebrickable/sets/${setNumber}`);

    if (!res.ok) {
      throw new Error('Set not found');
    }

    const data = await res.json(); 

    setFormData({
      name: data.name,
      set_number: data.set_number,
      num_parts: data.num_parts,
      year: data.year,
    });
  }

    catch (err) {
      setError(err.message);
      console.error('error fetching from rebrickable api from SetIntake.jsx', err);
    }
}

// handle form submissions - send form data to our post endpoint
const onSubmit = async (e) => {
  e.preventDefault(); // prevent default reload

  try
  {
    const res = await fetch('http://localhost:5000/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      name: formData.name,
      set_number: formData.setNumber,
      year: formData.year,
      num_parts: formData.numParts,
      price: formData.price,
      notes: formData.notes,
      stock: formData.stock
    })
});

    if (!res.ok) {
      throw new Error('Failed to add set to inventory');
    }

    setSuccess('set added successfully');
  }
    catch (err) {
      setError(err.message);
      console.error('error submitting form data from SetIntake.jsx', err);
    }
}


return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Add New Lego Set
      </Typography>
        {/* fetch set details from rebrickable */}
        <Box mb={3}>
          <Typography variant="h6">
            Fetch Set Details
          </Typography>
          <Box display="flex" gap={2}>
            <TextField
              label="Enter Set Number"
              value={setNumber}
              onChange={(e) => setSetNumber(e.target.value)}
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              size="small"
              sx={{ ml: 2 }}
              onClick={fetchSetData}>
              Fetch Details from Rebrickable
            </Button>
          </Box>
        </Box>

        {/* add set form*/}
        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Set Number"
            value={formData.set_number}
            onChange={(e) => setFormData({...formData, set_number: e.target.value})}
            fullWidth
            margin="normal"

          />

          <TextField
            label="Year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            fullWidth
          />

          <TextField
            label="Number of Parts"
            type="number"
            value={formData.num_parts}
            onChange={(e) => setFormData({...formData, num_parts: e.target.value})}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price (€)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            fullWidth
            margin="normal"
            multiline
          />

          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2 }}
          >
            Save Set
          </Button>
        </form>
    </Box> 
)
}
