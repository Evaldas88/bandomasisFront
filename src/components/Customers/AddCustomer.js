import React from "react";
import {Link} from 'react-router-dom';

class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            name: "",
            surname: "",
            email: "",
            phone: "",
            country_id: "",
        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
    create(e) {
        fetch("http://127.0.0.1:8000/api/customers", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                country_id: this.state.country_id,
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
                            <legend className="text-center">Add Customer</legend>
                            <label htmlFor="name">
                                Name:
                                <input
                                    name="name"
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={(e) => this.handleChange({ name: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="surname">
                            Surname:
                                <input
                                    name="surname"
                                    id="surname"
                                    type="text"
                                    className="form-control"
                                    value={this.state.surname}
                                    onChange={(e) =>
                                        this.handleChange({ surname: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label htmlFor="email">
                            Email:
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) =>
                                        this.handleChange({ email: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label htmlFor="phone">
                            Phone:
                                <input
                                    name="phone"
                                    id="phone"
                                    type="number"
                                    className="form-control"
                                    value={this.state.phone}
                                    onChange={(e) =>
                                        this.handleChange({ phone: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label htmlFor="country_id">
                            Town id:
                                <input
                                    name="country_id"
                                    id="country_id"
                                    type="number"
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
                        <div><Link className="mt-3 btn btn-dark" to="/customers">Go back</Link></div>

                    </div>
                </div>
            </div>
        );
    }
}
export default AddCustomer;