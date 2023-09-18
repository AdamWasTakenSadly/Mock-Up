import React from 'react';
import { Link } from 'react-router-dom';
import "./AdminHome.scss"; 

function AdminHome() {
  return (

    <div className="admin-home">
    <div class="CenterWithin">
  <br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/adminCreate">Create Product</Link>
          </li>
          <li>
            <Link to="/adminProducts">Edit Products</Link>
          </li>
          <li>
            <Link to="/adminOrders">Modify Order Status</Link>
          </li>
          <li>
            <Link to="/adminLogs">Acess Logs</Link>
          </li>
          <li>
            <Link to="/adminEmail">Report Bug</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminHome;