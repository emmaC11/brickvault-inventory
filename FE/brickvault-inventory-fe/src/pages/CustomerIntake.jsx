import React, {useState, useEffect} from 'react'
import { Box, Typography, Button, TextField, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function CustomerIntake() {
    const [sets, setSets] = useState([])
    const [selectedSetIds, setSelectedSetIds] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
    })

    useEffect(() => {
        fetchSets()
    }, [])
    
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
        
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            f_name: formData.f_name,
            l_name: formData.l_name,
            email: formData.email,
            wishlist_set_ids: selectedSetIds
        })
        });

        if (!res.ok) {
        throw new Error('error adding customer');
        }

        setSuccess('customer added successfully');

        // reset post submission
        setFormData({
        f_name: '',
        l_name: '',
        email: ''
        });
        setSelectedSetIds([]);
        navigate('/customers');
    } catch (err) {
        setError(err.message);
        console.error('error submitting form data from CustomerIntake.jsx', err);
    }
}
    
  return (
    <Box p={3} sx={{ maxWidth: 700, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'black', mt: 3 }}>
        Add New Customer
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
                <InputLabel>Wishlist Sets</InputLabel>
                <Select
                    multiple
                    value={selectedSetIds}
                    onChange={(e) => setSelectedSetIds(e.target.value)}
                    label="Wishlist Sets"

                    // render set number & name instead of IDs
                    renderValue={(selected) =>
                        selected.map(id => {
                        const s = sets.find(set => set.id === id);
                        return s ? s.name : id;
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

            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2, mr: 1 }}>
                Save Customer
            </Button>
            <Button component={Link} to="/customers" variant="outlined" sx={{ mt: 2, mb: 2 }}>
                Cancel
            </Button>
        </form>
    </Box>
  )
}
