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

export default function InventoryList() {

  const [sets, setSets] = React.useState([])
  const [error, setError] = React.useState('')

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
    <Box p={3}>
      <Typography variant="h4">
        BrickVault Inventory
      </Typography>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Set #</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              <TableCell><strong>In Stock</strong></TableCell> 
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sets.map((set) => (
              <TableRow key={set.id} hover>
                <TableCell>
                  <Chip 
                    label={set.set_number} 
                    size="small" 
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {set.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    €{set.price.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {set.notes || 'No notes available.'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {set.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button size="small" variant="text" color="primary">
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