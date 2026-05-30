import React, {useState} from 'react'
import { Box, Typography, Button, TextField, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CustomerIntake() {
    const [sets, setSets] = useState([])
    const [selectedSetIds, setSelectedSetIds] = useState([])
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        phone_number: ''
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
    
  return (
    <div>
      
    </div>
  )
}
