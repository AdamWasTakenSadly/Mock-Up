
import React from 'react'
import { useState,useEffect } from 'react';
import "./AdminLogs.scss";
import Table from 'react-bootstrap/Table';



const AdminLogs =()=>{
    
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
      }, []);
    
    const fetchLogs = async () => {
        try {
            const response = await fetch("/log/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const logData = await response.json();
            logData.reverse();
            setLogs(logData);
            
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

 



    return (
        <div class="CenterWithin">
             <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
             <h2 >Logs</h2> <br></br>
        <Table striped bordered hover style={{color:"#006DA3"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>CreatedAt</th>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Action</th>
            <th>Role</th>
            <th>Old Amount</th>
            <th>New Amount</th>
          </tr>
        </thead>
        <tbody>
        {logs.map((log, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{log.createdAt}</td>
              <td>{log.productName}</td>
              <td>{log.productID}</td>
              <td>{log.action}</td>
              <td>{log.role}</td>
              <td>{log.oldAmount}</td>
              <td>{log.newAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      );

}

export default AdminLogs