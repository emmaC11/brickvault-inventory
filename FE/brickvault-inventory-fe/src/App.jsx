import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // fetch data from flask BE 
  useEffect(() =>
  {
    fetch('http://localhost:5000/about')
    .then(response => response.json())
    .then(data => {
      setMessage(data.message)
    })
    .catch(err => {
      setError('cannot connect to flask BE')
      console.error(err)
    })
  }, [])

  return (
    <>
    <div className="App">
      <h1>React & Flask connection</h1>
      <p>BE message: {message}</p>
      <p style={{color: 'red'}}>{error}</p>
    </div>

    </>
  )
}

export default App
