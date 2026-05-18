import React from 'react'

const [setNumber, setSetNumber] = useState('');
const [success, setSuccess] = useState('');
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

// handle form submissions - send form data to our post endpoint
const onSubmit = async (e) => {
  e.preventDefault(); // prevent default reload

  try
  {
    const res = await fetch('http://localhost:5000/api/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      name: formData.name,
      set_number: formData.setNumber,
      year: formData.year,
      num_parts: formData.numParts,
      price: formData.price,
      notes: formData.notes,
      stock: formData.stock
    })
});

    if (!res.ok) {
      throw new Error('Failed to add set to inventory');
    }

    setSuccess('set added successfully');
  }
    catch (err) {
      setError(err.message);
      console.error('error submitting form data from SetIntake.jsx', err);
    }
}

export default function SetIntake() {
  return (
    <div>
      
    </div>
  )
}
