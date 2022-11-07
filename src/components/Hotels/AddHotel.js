import React from "react";
import {Link} from 'react-router-dom';
//  import { AuthContext } from "../../components/Admin/AuthContext";

class AddTown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            towns: [],
            town_title: "",
            distance: "",
            days: "",
            price: "",
            country_id: "",
            
        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    create(e) {
        fetch("http://127.0.0.1:8000/api/v1/hotel/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                hotel_title: this.state.hotel_title,
                distance: this.state.distance,
                days: this.state.days,
                price: this.state.price,
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
                        <legend className="text-center">Add Hotel</legend>
                        <label htmlFor="town_title">
                            Title:
                            <input
                                name="hotel_title"
                                id="hotel_title"
                                type="text"
                                className="form-control"
                                value={this.state.hotel_title}
                                onChange={(e) => this.handleChange({ hotel_title: e.target.value })}
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
                                value={this.state.distance}
                                onChange={(e) =>
                                    this.handleChange({ distance: e.target.value })
                                }
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
                                value={this.state.days}
                                onChange={(e) =>
                                    this.handleChange({ days: e.target.value })
                                }
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
                                value={this.state.price}
                                onChange={(e) =>
                                    this.handleChange({ price: e.target.value })
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
                            className="upaddbtn btn btn-dark"
                            type="button"
                            onClick={(e) => this.create(e)}
                        >
                            Add
                        </button>
                        </form>
                        <div><Link className="mt-3 btn btn-dark" to="/hotels">Go back</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddTown;