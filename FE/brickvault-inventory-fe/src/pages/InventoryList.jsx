import React from 'react'

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
    <div>
      
    </div>
  )
}
