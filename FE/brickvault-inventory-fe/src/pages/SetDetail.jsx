import React from 'react'
import { useState, useEffect, useParams } from 'react'

export default function SetDetail() {
  // setId passed from InventoryList.jsx (view button)
  const { setId } = useParams()
  const [setInfo, setSetInfo] = useState('')
  const [error, setError] = useState('')
  return (
    <div>
      
    </div>
  )
}
