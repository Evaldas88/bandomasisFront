import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
function Customers() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomer] = useState([]);

    useEffect(() => {
        getCustomers();
    }, [])
    function getCustomers() {
        fetch("http://127.0.0.1:8000/api/customers")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result); // <--- check this out in the console
                    setCustomer(result); 
                    setIsLoaded(true);
                },
                (error) => { 
                    setError(error); 
                    setIsLoaded(true); })
    }

    function deleteCustomer(id) {
        fetch("http://localhost:8000/api/customers/" + id, { method: 'DELETE' })
            .then((response) => {
                // console.log(response);
                if (response.status === 204) {
                    const remaining = customers.filter(p => id !== p.id)
                    setCustomer(remaining)
                    alert("Deleted successful.");
                }
            });
    }
    const editCustomer = id => {
        window.location = '/editCustomer/' + id
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <button className="btn btn-dark addbtn"><Link className="link" to="/addCustomer"> Add Customer</Link></button>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Chosen town</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.surname}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.town_title}</td>
                                    <td>
                                        <button onClick={(e) => deleteCustomer(customer.id, e)} 
                                            className="btn btn-dark">
                                            
                                            Delete</button>
                                        <button onClick={() => editCustomer(customer.id)} 
                                            className="btn btn-dark">
                                             
                                            Edit
                                        </button>                                    
                                        </td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Customers;