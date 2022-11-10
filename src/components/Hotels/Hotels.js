// READ, DELETE Towns

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Admin/AuthContext";

function Towns() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [status, setStatus] = useState(null);



    function deleteHotel(id) {
        fetch("http://127.0.0.1:8000/api/v1/hotel/" + id, {
            method: "DELETE",
            headers: {

                Accept: "application/json",

                Authorization: `Bearer ${auth.getToken()}`,

            },
        }).then(
            (res) => {
                if (res.status === 200 || res.status === 201) {
                    const remaining = hotels.filter((p) => id !== p.id);
                    setHotels(remaining);
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
    };


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/hotel")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result); // <--- check this out in the console
                    setHotels(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            );
    }, []);
 

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <button className="btn btn-dark addbtn">
                    <Link className="link" to="/addHotel">
                        Add Hotel
                    </Link>
                </button>
                <div className="container">
                    <table className="table">
                        <div className="my-2 text-danger">
                            {status === null ? "" : status.message}
                        </div>
                        <thead>
                            <tr>
                                <th>Hotel ID</th>
                                <th>Hotel</th>
                                <th>Distance km</th>
                                <th>Days</th>
                                <th>Price EUR</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel) => (
                                <tr key={hotel.id}>
                                    <td>{hotel.id}</td>
                                    <td>{hotel.hotel_title}</td>
                                    <td>{hotel.distance}</td>
                                    <td>{hotel.days}</td>
                                    <td>{hotel.price}</td>
                                    <td>{hotel.country.title}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteHotel(hotel.id)}
                                            className="btn btn-dark">
                                            Delete
                                        </button>
                                        <Link to={'/editHotel/' + hotel.id} className="btn btn-primary   me-3">Edit</Link>
                                        {/* <button onClick={() => editHotel(hotel.id)}
                                            className="btn btn-dark">
                                            Edit
                                        </button> */}
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