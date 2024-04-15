import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from 'ag-grid-react';

export default function Carlist(){
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    };


 const columnDefs = [
        { headerName: 'Brand', field: 'brand', width: 200 },
        { headerName: 'Model', field: 'model', width: 200 },
        { headerName: 'Color', field: 'color', width: 200 },
        { headerName: 'Fuel', field: 'fuel', width: 150 },
        { headerName: 'Year', field: 'modelYear', width: 150 },
        { headerName: 'Price', field: 'price', width: 150 }
    ];

    return (
        <div>
            <div className="ag-theme-material" style={{ height: '500px', width: '1100px' }}>
            <AgGridReact
                rowSelection="single"
                animateRows={true}
                rowData={cars}
                columnDefs={columnDefs}
                pagination={true}
            />
            </div>
            
        </div>
    );
}