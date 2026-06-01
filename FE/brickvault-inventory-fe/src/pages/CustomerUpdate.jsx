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

  return (
    <div>
      
    </div>
  )
}
