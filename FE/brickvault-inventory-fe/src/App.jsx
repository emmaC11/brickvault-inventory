import { useState, useEffect } from 'react'
import './App.css'
import InventoryList from './pages/InventoryList' 
import SetIntake from './pages/SetIntake'
import { Tabs,Tab } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState(0)

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
    <BrowserRouter>
    {/* <div className="App">
      <h1>React & Flask connection</h1>
      <p>BE message: {message}</p>
      <p style={{color: 'red'}}>{error}</p>
    </div> */}
    {/* <InventoryList /> */}
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Inventory List" />
        <Tab label="Add Set" />
      </Tabs>
      {tab === 0 && <InventoryList />}
      {tab === 1 && <SetIntake />}

    </BrowserRouter>
  )
}

export default App
