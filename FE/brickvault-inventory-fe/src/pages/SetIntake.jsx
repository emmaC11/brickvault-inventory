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
    const res = await fetch('http://localhost:5000/api/sets', {
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
              fullWidth
            />
            <Button 
              variant="contained" 
              onClick={fetchSetData}>
              Fetch Details from Rebrickable
            </Button>
          </Box>
        </Box>
    </Box>
)
}
