import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../components/Admin/AuthContext";

function Customers() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState([]);
    const auth = useContext(AuthContext);
    const [status, setStatus] = useState(null);

  


    function deleteCustomer(id) {

        fetch("http://localhost:8000/api/v1/customers/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${auth.getToken()}`,
            },
        }).then(
            (res) => {
              if (res.status === 200 || res.status === 201) {
                const remaining = customers.filter((p) => id !== p.id);
                setCustomers(remaining);
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
            fetch("http://localhost:8000/api/v1/customers")
                .then(res => res.json())
                .then(
                    (result) => {
                         console.log(result); // <--- check this out in the console
                        setCustomers(result);
                        setIsLoaded(true);
                    },
                    (error) => {
                        setError(error);
                        console.log(error)
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
                <button className="btn btn-dark addbtn"><Link className="link" to="/addCustomer"> Add Customer</Link></button>
                <div className="container">
                    <table className="table">
                    <div className="my-2 text-danger">
                {status === null ? "" : status.message}
              </div>
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Chosen hotel</th>
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
                                    <td>{customer.hotel.hotel_title}</td>
                                    
                                    <td>
                                        <button onClick={(e) => deleteCustomer(customer.id, e)}
                                            className="btn btn-dark">
                                            Delete</button>
                                            <Link to={'/editCustomer/' + customer.id} className="btn btn-primary   me-3">Edit</Link>
                                
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