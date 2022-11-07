import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function EditTown() {
    const navigate = useNavigate();

    const [town_title, setTown_title] = useState('');
    const [population, setPopulation] = useState('');
      const [country_id, setCountry_id] = useState('');
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/town/` + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setTown_title(result.town_title)
                    setPopulation(result.population)
               
                    setCountry_id(result.country_id)
                }
            )
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'town_title': town_title,
            'population': population,
 
            'country_id': country_id,
        }
        fetch(`http://localhost:8000/api/town/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                navigate('/towns');

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
                        <input type="text" value={town_title} onChange={(e) => { setTown_title(e.target.value) }} /> <br />
                        <label>population:</label>
                        <input type="text" value={population} onChange={(e) => { setPopulation(e.target.value) }} /> <br />
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