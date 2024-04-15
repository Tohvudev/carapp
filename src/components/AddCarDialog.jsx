import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function AddCarDialog({ open, handleClose }) {
  const [carInfo, setCarInfo] = useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(carInfo)
    })
      .then(response => {
        if (response.ok) {
          console.log('Car added successfully');
          handleClose();
        } else {
          console.error('Failed to add car');
        }
      })
      .catch(error => console.error('Error adding car:', error));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Car</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="brand"
          label="Brand"
          fullWidth
          value={carInfo.brand}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="model"
          label="Model"
          fullWidth
          value={carInfo.model}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          fullWidth
          value={carInfo.color}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="fuel"
          label="Fuel"
          fullWidth
          value={carInfo.fuel}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="year"
          label="Year"
          type="number"
          fullWidth
          value={carInfo.year}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={carInfo.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
