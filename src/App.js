
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
 import Header from "./components/Header/Header";
import Countries from "./components/Countries/Countries";
import AddCountry from "./components/Countries/AddCountry";
import EditCountry from "./components/Countries/EditCountry";
import Towns from "./components/Towns/Towns";
import AddTown from "./components/Towns/AddTown";
import EditTown from "./components/Towns/EditTown";
import Customers from "./components/Customers/Customers";
import AddCustomer from "./components/Customers/AddCustomer";
import EditCustomer from "./components/Customers/EditCustomer";
 


function App() {
  return (
      <BrowserRouter>
          < Header />
          <Routes>
              <Route path="/" element={<Countries />} />
              <Route path="/addCountry" element={<AddCountry />} />
              <Route path="/editCountry/:id" element={<EditCountry />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/addCustomer" element={<AddCustomer />} />
              <Route path="/editCustomer/:id" element={<EditCustomer />} />
              <Route path="/towns" element={<Towns />} />
              <Route path="/addTown" element={<AddTown />} />
              {/* <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
              <Route path="/editTown/:id" element={<EditTown />} />
          </Routes>
       
      </BrowserRouter>
  );
}

export default App;
