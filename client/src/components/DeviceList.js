import React, { useState, useEffect } from 'react';

    function handleOnEdit(event){
      alert('edit button clicked');

    }

    function fetchDeviceList(){
      return fetch('http://localhost:3000/device/')
      .then(response =>response.json())
      .catch(error => console.error(error.message));
    }

    function DeviceList(){

      const [devices, setDevices] = useState([]);
      useEffect(()=>{
        fetchDeviceList().then(
          data=>{
            if(data){
              setDevices(data);
            }else {
              setDevices('');
            }
          });
        }, []);

    const columns = Object.keys(devices[0] || {});

    return (
      <div className='container'>
        <h1>Device List</h1>
        <table className='table table-responsive'>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>SL</th>
              <th>Name</th>
              <th>Category</th>
              <th>Req Date</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {devices && devices.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.device_id}</td>
                <td>{row.device_sl}</td>
                <td>{row.device_name}</td>
                <td>{row.device_category}</td>
                <td>{row.device_req_date}</td>
                <td>{row.remark}</td>
                <td>{row.status}</td>
                <td>{row.created_at}</td>
                <td>{row.updated_at}</td>
                <td>
                  <button onClick = {handleOnEdit}><i className = 'fa fa-edit'></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    );
  };

export default DeviceList;