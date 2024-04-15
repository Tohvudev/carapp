import React, { useEffect, useState } from 'react';



export default function Carlist(){
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }
    return (
        <div></div>
    );
}