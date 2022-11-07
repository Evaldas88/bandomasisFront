import React from "react";
import {Link} from 'react-router-dom';

class AddTown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            towns: [],
            town_title: "",
            population: "",
         
            country_id: "",
            
        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    create(e) {
        fetch("http://127.0.0.1:8000/api/town/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                town_title: this.state.town_title,
                population: this.state.population,
                country_id: this.state.country_id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                // window.location.href = '/towns';
            })
            .catch((err) => {
                console.log(err);
            });
        e.preventDefault();
    }
    handleChange(changeObject) {
        this.setState(changeObject);
    }
    render() {
        
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form className="d-flex flex-column">
                            <legend className="text-center">Add Town</legend>
                            <label htmlFor="town_title">
                                Title:
                                <input
                                    name="town_title"
                                    id="town_title"
                                    type="text"
                                    className="form-control"
                                    value={this.state.town_title}
                                    onChange={(e) => this.handleChange({ town_title: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="population">
                            Distance km:
                                <input
                                    name="population"
                                    id="population"
                                    type="text"
                                    className="form-control"
                                    value={this.state.population}
                                    onChange={(e) =>
                                        this.handleChange({ population: e.target.value })
                                    }
                                    required
                                />
                            </label>
                             
                             <label htmlFor="country_id">
                            Country id:
                                <input
                                    name="country_id"
                                    id="country_id"
                                    type="text"
                                    className="form-control"
                                    value={this.state.country_id}
                                    onChange={(e) =>
                                        this.handleChange({ country_id: e.target.value })
                                    }
                                    required
                                />
                            </label>
                                <button
                                className="btn btn-dark"
                                type="button"
                                onClick={(e) => this.create(e)}
                            >
                                Add
                                 </button> 
                        </form>
                        <div><Link className="mt-3 btn btn-dark" to="/towns">Go back</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddTown;