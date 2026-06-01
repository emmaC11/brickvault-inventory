import React from 'react'
import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Button
} from '@mui/material'

export default function CustomerList() {

  const [customers, setCustomers] = React.useState([])
  const [error, setError] = React.useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/customers')
      const data = await res.json()
      setCustomers(data)
    } catch (err) {
      setError(err.message)
      console.error('error fetching customers:', err)
    }
  }


  return (
    <Box p={3}>
      <Typography variant="h6" sx={{ mt: 3, color: 'black', textAlign: 'left', ml: 1 }}>
        Customers
      </Typography>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Available Wishlist Sets</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} hover>
                <TableCell>
                  <Typography variant="body1">
                    {customer.f_name} {customer.l_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {customer.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  {(customer.available_sets || []).length === 0
                    ? <Typography variant="body2" color="text.secondary">None available</Typography>
                    : (customer.available_sets || []).map((set) => (
                        <Chip
                          key={set.id}
                          label={`${set.set_number} — ${set.name}`}
                          color="success"
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))
                  }
                </TableCell>
                <TableCell>
                  <Button size="small" variant="text" color="primary" sx={{ ml: 1 }}>
                    Edit
                  </Button>
                  <Button size="small" variant="text" color="error" sx={{ ml: 1 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {error && (
        <Typography color="error" mt={2}>
          Error: {error}
        </Typography>
      )}
    </Box>
  )
}
