import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function EditTown() {
    const navigate = useNavigate();

    const [hotel_title, setHotel_title] = useState('');
    const [distance, setDistance] = useState('');
    const [days, setDays] = useState('');
    const [price, setPrice] = useState('');
     const [country_id, setCountry_id] = useState('');
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/hotel/` + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setHotel_title(result.hotel_title)
                    setDistance(result.distance)
                    setDays(result.days)
                    setPrice(result.price)
                    setCountry_id(result.country_id)
                }
            )
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'hotel_title': hotel_title,
            'distance': distance,
            'days': days,
            'price': price,
            'country_id': country_id,
        }
        fetch(`http://localhost:8000/api/hotel/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                navigate('/hotels');

            })
        })
    }

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, [])
    function getCountries() {
        fetch("http://127.0.0.1:8000/api/country")
            .then((res) => res.json())
            .then(
                (result) => {
                    setCountries(result);
                }
            );
    }
 ;

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <legend className="text-center">Update section</legend>
                    <label >Town:</label>
                    <input type="text" value={hotel_title} onChange={(e) => { setHotel_title(e.target.value) }} /> <br />
                    <label>Distance:</label>
                    <input type="text" value={distance} onChange={(e) => { setDistance(e.target.value) }} /> <br />
                    <label>Days:</label>
                    <input type="text" value={days} onChange={(e) => { setDays(e.target.value) }} /> <br />
                    <label>Price:</label>
                    <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} /> <br />
                    <label>Country:</label>
                    <select value={country_id}
                        onChange={(e) => setCountry_id(e.target.value)}>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.title}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="upaddbtn btn btn-dark">Update Town</button>
                </form>
            </div>
        </div>
    </div>
);
}
export default EditTown;