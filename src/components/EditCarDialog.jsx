import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function EditCarDialog({ open, handleClose, car, handleUpdateCar, cars }) {
    const [editedCar, setEditedCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: 0, 
        price: 0, 
    });

    useEffect(() => {
        if (car) {
            setEditedCar(car);
        }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCar(prevCar => ({
            ...prevCar,
            [name]: value
        }));
    };

    const handleSave = () => {
        
        if (!editedCar || !editedCar.brand || !editedCar.model || !editedCar.color || !editedCar.fuel || !editedCar.modelYear || !editedCar.price) {
            console.error('Car data is invalid');
            return;
        }
    
        const carIndex = cars.findIndex(c => c.brand === car.brand && c.model === car.model && c.color === car.color);

        if (carIndex === -1) {
            console.error('Edited car not found');
            return;
        }

        const updatedCars = [...cars];
        updatedCars[carIndex] = editedCar;

        fetch(`https://carrestservice-carshop.rahtiapp.fi/cars/${carIndex}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedCar)
        })
        .then(response => {
            if (response.ok) {
                
                handleUpdateCar(editedCar);
                handleClose();
            } else {
                console.error('Failed to update car');
            }
        })
        .catch(error => console.error('Error updating car:', error));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    label="Brand"
                    fullWidth
                    value={editedCar.brand || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="model"
                    label="Model"
                    fullWidth
                    value={editedCar.model || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="color"
                    label="Color"
                    fullWidth
                    value={editedCar.color || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="fuel"
                    label="Fuel"
                    fullWidth
                    value={editedCar.fuel || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="modelYear"
                    label="Model Year"
                    type="number"
                    fullWidth
                    value={editedCar.modelYear || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={editedCar.price || ''}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
