import React, {useState, useEffect} from 'react'
import { Box, Typography, Button, TextField, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CustomerIntake() {
    const [sets, setSets] = useState([])
    const [selectedSetIds, setSelectedSetIds] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
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
    } catch (err) {
        setError(err.message);
        console.error('error submitting form data from CustomerIntake.jsx', err);
    }
}
    
  return (
    <div>
      
    </div>
  )
}
