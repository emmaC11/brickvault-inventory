import { useState, useEffect } from 'react'
import './App.css'
import InventoryList from './pages/InventoryList' 
import SetIntake from './pages/SetIntake'
import SetDetail from './pages/SetDetail'
import SetUpdate from './pages/SetUpdate'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

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
    {/* referenced from https://mui.com/material-ui/react-app-bar/ for the app bar and navigation */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BRICKVAULT
            </Typography>

            <Button component={Link} to="/inventory" sx={{ color: 'white' }}>
              Inventory List
            </Button>
            <Button component={Link} to="/add-set" sx={{ color: 'white' }}>
              Add Set
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/add-set" element={<SetIntake />} />
        <Route path="/sets/:setId" element={<SetDetail />} />
        <Route path="/sets/edit/:setId/" element={<SetUpdate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
