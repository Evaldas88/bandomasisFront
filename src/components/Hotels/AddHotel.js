
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../components/Admin/AuthContext";


const AddTown = () => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState({
        town_title: "",
        distance: "",
        days: "",
        price: "",
        country_id: "",

    });
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        fetch("http://127.0.0.1:8000/api/v1/hotel", {
            method: "POST",
            headers: hs,
            body: JSON.stringify(data),
        }).then(
            (res) => {
                if (res.status === 200 || res.status === 201) {
                    navigate('/hotels');
                    setStatus({ message: res.statusText });
                } else if (res.status === 401) {
                    setStatus({ message: res.statusText });
                } else if (res.status === 422) {
                    setStatus({ message: res.statusText });
                }
            },
            (err) => {
                setStatus(err);
            }
        );
    }
    const [country, setCountry] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/country")
            .then((res) => res.json())
            .then(
                (result) => {
                    setCountry(result);
                    console.log(result)
                }
            );
    }, []);



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <legend className="text-center">Add Hotel</legend>
                        <label htmlFor="town_title">
                            Title:
                            <input
                                name="hotel_title"
                                id="hotel_title"
                                type="text"
                                className="form-control"
                                onChange={(e) => setData({ ...data, hotel_title: e.target.value })}
                                required
                            />
                        </label>
                        <label htmlFor="distance">
                            Distance km:
                            <input
                                name="distance"
                                id="distance"
                                type="text"
                                className="form-control"
                                onChange={(e) => setData({ ...data, distance: e.target.value })}
                                required
                            />
                        </label>
                        <label htmlFor="days">
                            Days:
                            <input
                                name="days"
                                id="days"
                                type="number"
                                className="form-control"
                                onChange={(e) => setData({ ...data, days: e.target.value })}

                                required
                            />
                        </label>
                        <label htmlFor="price">
                            Price EUR:
                            <input
                                name="price"
                                id="price"
                                type="number"
                                className="form-control"
                                onChange={(e) => setData({ ...data, price: e.target.value })}

                                required
                            />
                        </label>
                        <label htmlFor="country_id">
                            Country
                            <select
                                onChange={(e) => setData({ ...data, country_id: e.target.value })}>
                                {country.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button className="upaddbtn btn btn-dark"> Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTown;