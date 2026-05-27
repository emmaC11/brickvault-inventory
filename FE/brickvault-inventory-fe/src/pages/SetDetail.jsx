import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SetDetail() {
  // setId passed from InventoryList.jsx (view button)
  const { setId } = useParams()
  const [setInfo, setSetInfo] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSetDetails()
  }, [setId])

  const fetchSetDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/sets/${setId}`)
      if(!res.ok) {
        throw new Error('Error fetching set details')
      }
      const data = await res.json()
      setSetInfo(data)
    } catch (err) {
      setError(err.message)
      console.error('error fetching set details:', err)
    }
  }
  return (
    // ADD STYLING HERE
    // checj why set_number is showing as NA each time
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        <h1>{setInfo.name}</h1>
        <p><strong>Set Number:</strong> {setInfo.set_number}</p>
        <p><strong>Price:</strong> ${setInfo.price}</p>
        <p><strong>Year:</strong> {setInfo.year || 'NA'}</p>
        <p><strong>Number of Parts:</strong> {setInfo.num_parts || 'NA'}</p>
        <p><strong>Stock:</strong> {setInfo.stock}</p>
        <p><strong>Notes:</strong> {setInfo.notes || 'NA'}</p>
        <p><strong>ID:</strong> {setInfo.id}</p>
      </div>
</div>
  )
}
