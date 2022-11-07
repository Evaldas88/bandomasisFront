// READ, DELETE Towns

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
 
function Towns() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [towns, setTowns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/town")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result); // <--- check this out in the console
                    setTowns(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            );
    }, []);

    function deleteTown(id) {
        fetch("http://127.0.0.1:8000/api/town/" + id, { method: "DELETE" })
        .then(
            (response) => {
                console.log(response);
                if (response.status === 204) {
                    const remaining = towns.filter((p) => id !== p.id);
                    setTowns(remaining);
                    alert("Deleted successful.");
                } else {
                    alert("Delete not successful, because this town has asigned customers. Please delete customers first.");
                }
            }
        );
    }

    const editTown = id => {
        navigate   ('/editTown/' + id)
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <button className="btn btn-dark addbtn">
                    <Link className="link" to="/addTown">
                         Add Town
                    </Link>
                </button>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Town ID</th>
                                <th>Town</th>
                                <th>population</th>
                                 <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {towns.map((town) => (
                                <tr key={town.id}>
                                    <td>{town.id}</td>
                                    <td>{town.town_title}</td>
                                    <td>{town.population}</td>
                                      <td>{town.title}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteTown(town.id)}
                                            className="btn btn-dark">
                                             Delete
                                        </button>
                                        <button onClick={() => editTown(town.id)} 
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

export default Towns;