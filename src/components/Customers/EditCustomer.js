import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
 import { AuthContext } from "../../components/Admin/AuthContext";

function EditCustomer() {

    const [fname, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [hotel_id, setHotel_id] = useState('');
    const auth = useContext(AuthContext);
    const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      };
        const navigate = useNavigate();


    const { id } = useParams();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/customers/` + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setName(result.name)
                    setLname(result.surname)
                    setEmail(result.email)
                    setPhone(result.phone)
                    setHotel_id(result.hotel_id)
                }
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
            'hotel_id': hotel_id,
                }

        fetch(`http://localhost:8000/api/v1/customers/${id}`, {
            method: 'PUT',
            headers: hs,
      body: JSON.stringify(data),
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                navigate("/customers"); 
            })
        })
    }

  
                const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/hotel")
            .then((res) => res.json())
            .then(
                (result) => {
                    setHotels(result);
                    console.log(result)
                    
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
                        <label>Hotel id:</label>
                        <select value={hotel_id}
                            onChange={(e) => setHotel_id(e.target.value)}>
                            {hotels.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                {hotel.hotel_title}
                            </option>
                            ))}
                        </select>
                         <button type="submit" className="upaddbtn btn btn-dark">Update Customer</button>
                </form>
                </div>
                </div>
            </div>
    );
}
export default EditCustomer;