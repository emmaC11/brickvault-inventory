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
    
  return (
    <div>
      
    </div>
  )
}
