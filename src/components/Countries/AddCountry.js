import React from "react";
 import {Link} from 'react-router-dom';

class AddCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            title: "",
            description: "",
            distance: "",

        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  

    create(e) {
        fetch("http://127.0.0.1:8000/api/country", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                distance: this.state.distance,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
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
                            <legend className="text-center">Add Country</legend>
                            <label htmlFor="title">
                                Title:
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={(e) => this.handleChange({ title: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="description">
                            Description:
                                <textarea
                                rows="2" cols="60"
                                    name="description"
                                    id="description"
                                    type="text"
                                    className="form-control  "
                                    value={this.state.description}
                                    onChange={(e) =>
                                        this.handleChange({ description: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label htmlFor="title">
                            distance:
                                <input
                                    name="distance"
                                    id="distance"
                                    type="text"
                                    className="form-control"
                                    value={this.state.distance}
                                    onChange={(e) => this.handleChange({ distance: e.target.value })}
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
                        <div><Link className="mt-3 btn btn-dark" to="/ ">Go back</Link></div>

                    </div>
                </div>
            </div>
        );
    }
}
export default AddCountry;