import React, {useState} from 'react'
import { Box, Typography, Button, TextField, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'
export default function SetIntake() {

const [setNumber, setSetNumber] = useState('');
const [summary, setSummary] = useState('')
const [success, setSuccess] = useState('');
const [error, setError] = useState('');
const [formData, setFormData] = useState({
  set_number: '',
  name: '',
  year: '',
  num_parts: '',
  price: '',
  notes: '',
  stock:'',
  description: '',
  condition: ''
});

// fetch data from rebrickabke api
const fetchSetData = async () =>
{
  setError('');
  setSuccess('');

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

const generateAISummary = async () => {
    try {
      const res = await fetch('http://localhost:5000/sets/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          set_number: setNumber,
          name: formData.name,
          year: formData.year
        })
      });
      if(!res.ok) {
        throw new Error('error generating AI summary')
      }
      const data = await res.json()
      setSummary(data.summary)
      // update description field with AI summary
      setFormData({...formData, description: data.summary})
    } catch (err) {
      setError(err.message)
      console.error('error generating summary:', err)
    }
  }

// handle form submissions - send form data to our post endpoint
const onSubmit = async (e) => {
  e.preventDefault(); // prevent default reload
  setError('');
  setSuccess('');

  try
  {
    const res = await fetch('http://localhost:5000/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      name: formData.name,
      set_number: formData.set_number,
      year: formData.year,
      num_parts: formData.num_parts,
      price: formData.price,
      notes: formData.notes,
      stock: formData.stock,
      description: formData.description,
      condition: formData.condition
    })
});

    if (!res.ok) {
      throw new Error('Failed to add set to inventory');
    }

    setSuccess('set added successfully');
    
    setFormData({
      name: '',
      set_number: '',
      year: '',
      num_parts: '',
      price: '',
      notes: '',
      stock:'',
      description: '',
      condition: ''
    });
  }
    catch (err) {
      setError(err.message);
      console.error('error submitting form data from SetIntake.jsx', err);
    }
}


return (
    <Box p={3} sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'black', mt: 3 }}>
        Add New Lego Set
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {/* fetch set details from rebrickable */}
        <Box mb={3}>
          
          <Box display="flex" gap={3} mt={1}>
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
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 1 }}
          />
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Condition</InputLabel>
            <Select
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              label="Condition"
            >
              <MenuItem value="New">Unused - New</MenuItem>
              <MenuItem value="Like New">Used - Like New</MenuItem>
              <MenuItem value="Very Good"> Used - Very Good</MenuItem>
              <MenuItem value="Good">Used - Good</MenuItem>
              <MenuItem value="Fair">Used - Fair</MenuItem>
              <MenuItem value="Poor">Used - Poor</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            fullWidth
            margin="normal"
            multiline
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            fullWidth
            margin="normal"
            multiline
          />

          <Button
            variant="outlined"
            onClick={generateAISummary}
            disabled={!formData.name || !formData.set_number}
            sx={{ mt: 2, mb: 2, mr: 2 }}>
            Generate AI Summary 
          </Button>

          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2, mb: 2, mr: 1 }}
          >
            Save Set
          </Button>
          <Button component={Link} to="/inventory" variant="outlined" sx={{ mt: 2, mb: 2 }}> Cancel </Button>
        </form>
    </Box> 
)
}
