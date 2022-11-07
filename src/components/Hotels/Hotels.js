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
    const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      };
 

      function deleteHotel(id) {
        fetch("http://127.0.0.1:8000/api/v1/hotel/" + id, { method: "DELETE",
        headers: {

            Accept: "application/json",

            Authorization: `Bearer ${auth.getToken()}`,

          }, })
    
        .then(
            (response) => {
                console.log(response);
                if (response.status === 204) {
                    const remaining = hotels.filter((p) => id !== p.id);
                    setHotels(remaining);
                    alert("Deleted successful.");
                }  
            }
        );
    }
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

   

    const editHotel = id => {
        navigate   ('/editHotel/' + id)
    }

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
                                      <td>{hotel.title}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteHotel(hotel.id)}
                                            className="btn btn-dark">
                                             Delete
                                        </button>
                                        <button onClick={() => editHotel(hotel.id)} 
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