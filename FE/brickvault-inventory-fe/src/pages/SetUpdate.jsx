import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
    <div>
      
    </div>
  )
}
