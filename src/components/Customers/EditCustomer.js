import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';

function EditCustomer() {

    const [fname, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [towns, setTowns] = useState([]);
    const [town_id, setTown_id] = useState('');
        const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/customers/` + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setName(result.name)
                    setLname(result.surname)
                    setEmail(result.email)
                    setPhone(result.phone)
                    setTown_id(result.town_id)                }
            )
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'name': fname,
            'surname': lname,
            'email': email,
            'phone': phone,
            'town_id': town_id,
                }
        fetch(`http://localhost:8000/api/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                navigate("/customers"); 
            })
        })
    }

  

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/town")
            .then((res) => res.json())
            .then(
                (result) => {
                    setTowns(result);
                    
                }
            );
    }, []);
 
    return (
            <div className="container">
                            <div className="row justify-content-center">
                    <div className="col-md-4">
                <legend className="text-center">Update section</legend>
                <form  className="d-flex flex-column" onSubmit={handleSubmit}>
                <label>Name:</label>
                        <input type="text" value={fname} onChange={(e) => { setName(e.target.value) }} /> <br />
                        <label>Surname:</label>
                        <input type="text" value={lname} onChange={(e) => { setLname(e.target.value) }} /> <br />
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br />
                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} /> <br />
                        <label>Town id:</label>
                        <select value={town_id}
                            onChange={(e) => setTown_id(e.target.value)}>
                            {towns.map((town) => (
                                <option key={town.id} value={town.id}>
                                {town.town_title}
                            </option>
                            ))}
                        </select>
                        {/* <input type="text" value={town_id} onChange={(e) => { setTown_id(e.target.value) }} /> <br /> */}
                        <button type="submit" className="upaddbtn btn btn-dark">Update Customer</button>
                </form>
                </div>
                </div>
            </div>
    );
}
export default EditCustomer;