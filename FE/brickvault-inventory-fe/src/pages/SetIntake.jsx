import React from 'react'

const [setNumber, setSetNumber] = useState('');
const [error, setError] = useState('');
const [formData, setFormData] = useState({
  setNumber: '',
  name: '',
  year: '',
  numParts: '',
  price: '',
  notes: '',
  stock:''
});

// fetch data from rebrickabke api
const fetchSetData = async () =>
{
  if (!setNumber) {
    setError('Please enter a set number');
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/rebrickable/sets/${setNumber}`);

    if (!res.ok) {
      throw new Error('Set not found');
    }

    const data = await res.json(); 
  }

    catch (err) {
      setError(err.message);
      console.error('error fetching from rebrickable api from SetIntake.jsx', err);
    }
}

export default function SetIntake() {
  return (
    <div>
      
    </div>
  )
}
