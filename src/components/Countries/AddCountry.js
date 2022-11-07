import React, { useContext, useEffect, useState } from "react";
 import { useNavigate} from 'react-router-dom';
 import { AuthContext } from "../../components/Admin/AuthContext";

 const  AddCountry  =()=> {

    const auth = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({ title: undefined, season_weather: undefined });
    const [status, setStatus] = useState(null);
    const [initialLoadError, setInitialLoadError] = useState(null);
    const navigate = useNavigate();
    const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      };

      useEffect(() => {
           fetch(`http://127.0.0.1:8000/api/v1/country`)
            .then((res) => res.json())
            .then(
              (res) => {
                setItem(res);
                setIsLoaded(true);
              },
              (err) => {
                 setIsLoaded(true);
              }
            );

        }, []);

        const handleSubmit = (e)  =>{
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/v1/country", {
            method: "POST",
      headers: hs,
      body: JSON.stringify(item),
    }).then(
    (res) => {
        if (res.status === 200 || res.status === 201) {
            navigate('/');

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
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (initialLoadError) {
    return <div>Error: {initialLoadError.message}</div>;
  } else {
    return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <legend className="text-center">Add Country</legend>
                            <label htmlFor="title">
                                Title:
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    value={item.title}
                                    onChange={(e) => setItem({ ...item, title: e.target.value})}
                                    required
                                />
                            </label>
                            <label htmlFor="description">
                                Season weather:
                                <textarea
                                rows="2" cols="60"
                                    name="description"
                                    id="description"
                                    type="text"
                                    className="form-control weather"
                                    value={item.season_weather}
                                    onChange={(e) =>
                                        setItem({ ...item, season_weather: e.target.value })
                                    }
                                    required
                                />
                            </label>
                       
                            <button
                                className="upaddbtn btn btn-dark"
                              >
                                Add
                            </button>
                        </form>
                      

                    </div>
                </div>
            </div>
        );
    }
}
export default AddCountry;