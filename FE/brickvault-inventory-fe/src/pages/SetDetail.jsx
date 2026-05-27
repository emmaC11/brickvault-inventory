import React from 'react'
import { useState, useEffect, useParams } from 'react'

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
    <div>
      
    </div>
  )
}
