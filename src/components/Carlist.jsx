import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import EditCarDialog from './EditCarDialog';

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.error('Error fetching data:', error));
    };

    const columnDefs = [
        { headerName: 'Brand', field: 'brand', width: 200 },
        { headerName: 'Model', field: 'model', width: 200 },
        { headerName: 'Color', field: 'color', width: 200 },
        { headerName: 'Fuel', field: 'fuel', width: 150 },
        { headerName: 'Year', field: 'modelYear', width: 150 },
        { headerName: 'Price', field: 'price', width: 150 },
        {
            headerName: 'Actions',
            field: 'actions',
            width: 200,
            cellRenderer: (params) => (
                <div>
                    <button onClick={() => handleEditRow(params.data)} style={{color: 'white', backgroundColor: 'rgb(144, 238, 144)'}}>Edit</button>
                    <button onClick={() => handleDeleteRow(params.data)} style={{color: 'white', backgroundColor: 'red'}}>Delete</button>

                </div>
            )
        }
    ];

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const handleDeleteRow = (rowData) => {
        const carId = rowData._links.self.href.split('/').pop();
        fetch(`https://carrestservice-carshop.rahtiapp.fi/cars/${carId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                const updatedCars = cars.filter(car => car._links.self.href.split('/').pop() !== carId);
                setCars(updatedCars);
                setSnackbarMessage('Car deleted successfully');
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage('Failed to delete car');
                setSnackbarOpen(true);
            }
        })
        .catch(error => console.error('Error deleting car:', error));
    };

    const handleEditRow = (rowData) => {
        setSelectedCar(rowData);
        setEditDialogOpen(true);
    };

    const handleUpdateCar = (updatedCar) => {
        const updatedCars = cars.map(car => {
            if (car.id === updatedCar.id) {
                return updatedCar;
            }
            return car;
        });
        setCars(updatedCars);
        setSnackbarMessage('Car updated successfully');
        setSnackbarOpen(true);
        window.location.reload();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="ag-theme-material" style={{ height: '700px', width: '1250px' }}>
            <AgGridReact
                rowSelection="single"
                animateRows={true}
                rowData={cars}
                columnDefs={columnDefs}
                pagination={true}
                onGridReady={onGridReady}
            />
            <EditCarDialog
    open={editDialogOpen}
    handleClose={() => setEditDialogOpen(false)}
    car={selectedCar}
    handleUpdateCar={handleUpdateCar}
    cars={cars} 
/>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
