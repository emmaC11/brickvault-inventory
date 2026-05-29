import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Box,
  TextField,
  Typography,
  Button,
  Alert
} from '@mui/material'

export default function SetUpdate() {
    const { setId } = useParams()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    // initiaise form data with empty values, will update with set details on load
    const [formData, setFormData] = useState({
        name: '',
        set_number: '',
        year: '',
        num_parts: '',
        price: '',
        stock: '',
        notes: ''
    })

    useEffect(() => {
        fetchSetDetails()
    },[setId])

  const fetchSetDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/sets/${setId}`)
      if(!res.ok) {
        throw new Error('Error fetching set details')
      }
      const data = await res.json()
      // assign set details to form data
      setFormData({
        name: data.name || '',
        set_number: data.set_number || '',
        year: data.year || '',
        num_parts: data.num_parts || '',
        price: data.price || '',
        notes: data.notes || '',
        stock: data.stock || ''
      })
    } catch (err) {
      setError(err.message)
      console.error('error fetching set details:', err)
    }
  }

  // handle form submissions - send form data to our post endpoint
  const onSubmit = async (e) => {
    e.preventDefault(); // prevent default reload
    setError('');
    setSuccess('');

    // call PUT endpoint 
    try {
      const res = await fetch(`http://localhost:5000/sets/${setId}`, {
        method: 'PUT',
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
            stock: formData.stock
          })
      })
      if(!res.ok) {
        throw new Error('error updating set details')
      }
      setSuccess('set details updated successfully')
      navigate('/inventory')
    } catch (err) {
      setError(err.message)
      console.error('error updating set details:', err)
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h4">
        Update Set Details
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
            required
          />

          <TextField
            label="Year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            fullWidth
            margin="normal"
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
          />
          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Button type="submit" variant='contained'> Update Set </Button>
          <Button component={Link} to="/inventory" variant="outlined"> Cancel </Button>
      </form>
    </Box>
  )
}
