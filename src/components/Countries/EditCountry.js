import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

 
function EditCountry() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/country/` + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setTitle(result.title)
                    setDescription(result.description)
                    setDistance(result.distance)

                }
            )
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'title': title,
            'description': description,
            'distance': distance,
        }
        fetch(`http://localhost:8000/api/country/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                navigate('/');
            })
        })
    }

    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">

                    <legend className="text-center">Update section</legend>
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input value={title}
                            onChange={(e) => { setTitle(e.target.value) }} /> <br />
                        <label>description:</label>
                        <input value={description}
                            onChange={(e) => { setDescription(e.target.value) }} /> <br />
                            <label>distance:</label>
                        <input value={distance}
                            onChange={(e) => { setDistance(e.target.value) }} /> <br />
                        <button type="submit" className="upaddbtn btn btn-dark">Update Country</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EditCountry;