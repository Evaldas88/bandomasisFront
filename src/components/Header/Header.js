import { Link } from "react-router-dom";
 import React, { useContext } from "react";
import { AuthContext } from "../Admin/AuthContext";
  

const Header = () => { 
    const auth = useContext(AuthContext);
    return (
      <header className="navbar-dark bg-dark">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand text-light nav-link">
            <span className="fs-4">Hotels</span>
          </Link>
  
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Country
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link text-light">
              Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hotels" className="nav-link text-light">
              Hotels
              </Link>
            </li>
            
            {auth.isLoggedin() ? (
              <li className="nav-item ms-3">
                <Link onClick={()=> auth.logout()} className="nav-link text-light">
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-light">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-light">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    );}
  
  export default Header;
 
