import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Box,
  TextField,
  Typography
} from '@mui/material'

export default function SetUpdate() {
    const { setId } = useParams()
    const [error, setError] = useState('')
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
    
  return (
    <Box p={3}>
      <Typography variant="h4">
        Update Set Details
      </Typography>
      <form>
          <TextField
            label="Name"
            value={formData.name}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Set Number"
            value={formData.set_number}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Year"
            type="number"
            value={formData.year}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Number of Parts"
            type="number"
            value={formData.num_parts}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price (€)"
            type="number"
            step="0.01"
            value={formData.price}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Stock"
            type="number"
            value={formData.stock}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Notes"
            value={formData.notes}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
      </form>
      {error && (
        <Typography color="error" mt={2}>
          Error: {error}
        </Typography>
      )}
    </Box>
  )
}
