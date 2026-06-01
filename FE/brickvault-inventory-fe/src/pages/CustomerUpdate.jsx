import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Box,
  TextField,
  Typography,
  Button,
  Alert, 
  Select, FormControl, InputLabel, MenuItem
} from '@mui/material'

export default function CustomerUpdate() {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [sets, setSets] = useState([])
  const [selectedSetIds, setSelectedSetIds] = useState([])
  const [formData, setFormData] = useState({
      f_name: '',
      l_name: '',
      email: ''
  })

  useEffect(() => {
    fetchCustomerDetails()
    fetchSets()
  }, [customerId])

  const fetchCustomerDetails = async () => {
    try {
      const res = await fetch('http://localhost:5000/customers')
      if (!res.ok) {
        throw new Error('Error fetching customer details')
      }
      const data = await res.json()
      const customer = data.find(c => c.id === parseInt(customerId))
      if (!customer) {
        throw new Error('Customer not found')
      }
      setFormData({
        f_name: customer.f_name || '',
        l_name: customer.l_name || '',
        email: customer.email || ''
      })
    } catch (err) {
      setError(err.message)
      console.error('error fetching customer details:', err)
    }
  }

  const fetchSets = async () => {
    try {
      const res = await fetch('http://localhost:5000/sets')
      const data = await res.json()
      setSets(data)
    } catch (err) {
      setError(err.message)
      console.error('error fetching sets:', err)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`http://localhost:5000/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          f_name: formData.f_name,
          l_name: formData.l_name,
          email: formData.email,
          wishlist_set_ids: selectedSetIds
        })
      })
      if (!res.ok) {
        throw new Error('error updating customer details')
      }
      setSuccess('customer details updated successfully')
      navigate('/customers')
    } catch (err) {
      setError(err.message)
      console.error('error updating customer details:', err)
    }
  }

  return (
    <Box p={3} sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mt: 3, mb: 4, color: 'black', textAlign: 'left', ml: 1 }}>
        Update Customer Details
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={onSubmit}>
        <TextField
          label="First Name"
          value={formData.f_name}
          onChange={(e) => setFormData({...formData, f_name: e.target.value})}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={formData.l_name}
          onChange={(e) => setFormData({...formData, l_name: e.target.value})}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Add Wishlist Sets</InputLabel>
          <Select
            multiple
            value={selectedSetIds}
            onChange={(e) => setSelectedSetIds(e.target.value)}
            label="Add Wishlist Sets"
            renderValue={(selected) =>
              selected.map(id => {
                const s = sets.find(set => set.id === id)
                return s ? s.name : id
              }).join(', ')
            }
          >
            {sets.map((set) => (
              <MenuItem key={set.id} value={set.id}>
                {set.set_number} | {set.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mb: 2, mr: 1 }}>Update Customer</Button>
        <Button component={Link} to="/customers" variant="outlined" sx={{ mb: 2 }}>Cancel</Button>
      </form>
    </Box>
  )
}
