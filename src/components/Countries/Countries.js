// READ, DELETE Countries

import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";


 function Countries() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [countries, setCountries] = useState([]);
	const navigate = useNavigate();
    useEffect(() => {
        getCountries();
    }, [])
    function getCountries() {
        fetch("http://127.0.0.1:8000/api/country")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result); // <--- check this out in the console
                    setCountries(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            );
    }

    function deleteCountry(id) {
        fetch("http://127.0.0.1:8000/api/country/" + id, { method: "DELETE" })
            .then((response) => {
                if (response.status === 204) {
                    const remaining = countries.filter((p) => id !== p.id);
                    setCountries(remaining);
                    alert("Deleted successful.");
                }
            }
        );
    }
 
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <button className="btn btn-dark addbtn">
                    <Link className="link" to="/AddCountry">
                         Add Country
                    </Link>
                </button>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Country ID</th>
                                <th>Country</th>
                                <th>Description</th>
                                <th>Distance Km</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.map((country) => (
                                <tr key={country.id}>
                                    <td>{country.id}</td>
                                    <td>{country.title}</td>
                                    <td>{country.description}</td>
                                    <td>{country.distance}</td>
                                    <td>
                                        <button onClick={() => deleteCountry(country.id)}
                                            className="btn btn-dark">
                                             Delete
                                        </button>
                                        <button onClick={() => navigate(`/EditCountry/${country.id}`)} 
                                            className="btn btn-dark">
                                             Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Countries;