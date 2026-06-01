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

  return (
    <div>
      
    </div>
  )
}
