import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Admin/AuthContext";

 
function EditCountry() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
     const [season_weather, setSeason_weather] = useState('');
     const auth = useContext(AuthContext);
     const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      };
    useEffect(() => {
        
        fetch(`http://127.0.0.1:8000/api/v1/country/` + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setTitle(result.title)
                    setSeason_weather(result.season_weather)

                }
            )
    }, [id])

    const handleSubmit = event => {
        event.preventDefault();
        var data = {
            'id': id,
            'title': title,
            'season_weather': season_weather,
        }
        fetch(`http://localhost:8000/api/v1/country/${id}`, {
            method: 'PUT',
            headers: hs,
      body: JSON.stringify(data),
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
                <label>Season weather:</label>
                <input value={season_weather}
                   onChange={(e) => { setSeason_weather(e.target.value) }} /> <br />
                <button type="submit" className="upaddbtn btn btn-dark">Update Country</button>
            </form>
            </div>
            </div>
        </div>
);
}
export default EditCountry;