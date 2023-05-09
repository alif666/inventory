import React, { useState, useEffect } from 'react';





function handleOnDelete(id) {

  alert(id);


}


function submitDevice(device) {
  alert('Calling Update Service with id'+device.device_id);

  return fetch('http://localhost:3000/device',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(device)
  })
    .then(response => response.json())
    .catch(error => console.error(error.message));
}






function updateDeviceById(device) {
  alert('Calling Update Service with id'+device.device_id);

  return fetch('http://localhost:3000/device',{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(device)
  })
    .then(response => response.json())
    .catch(error => console.error(error.message));
}



function fetchDeviceById(id) {
  alert('Calling Service with id'+id);

  return fetch('http://localhost:3000/device/id',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ device_id: id })
  })
    .then(response => response.json())
    .catch(error => console.error(error.message));
}


function fetchDeviceList() {
  return fetch('http://localhost:3000/device/')
    .then(response => response.json())
    .catch(error => console.error(error.message));
}



function DeviceList() {
   
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState([]);
  const [showDiv, setShowDiv] = useState(false);

  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    fetchDeviceList().then(
      data => {
        if (data) {
          setDevices(data);
        } else {
          setDevices('');
        }
      });
  }, []);

  function handleOnEdit(id) {
    fetchDeviceById(id).then(
      data=>{
        if(data){
          setDevice(data);
        }else{
          setDevice('');
        }
      }
    );
    setShowDiv(!showDiv);
  }

  const handleButtonClick = () => {
    setShowDiv(showDiv); // toggle the value of showDiv
  };

  function onSubmit(sDevice){
    alert('submit performed'+sDevice.device_id);


    if(sDevice.device_id){
      updateDeviceById(sDevice).then(
        data=>{
          if(data){
            setDevice(data);
          }else{
            setDevice('');
          }
        }
      );

    }else{
      submitDevice(sDevice).then(
        data=>{
          if(data){
            setDevice(data);
          }else{
            setDevice('');
          }
        }
      );

    }
    window.location.reload();
  }

  return (
    <div className='container'>
      <h2>Entry</h2>
 


      <form action='onSubmit'>
      <table className='table table-responsive'>
        <th>
          <td>
            <label>SL</label>
            <input className='form-control' type='text' onChange={handleChange} value={device.device_id && device.device_sl||value}/>
          </td>
          <td>
            <label>Name</label>
            <input className='form-control' type='text' value={device.device_id && device.device_name||value}/>
          </td>
          <td>
            <label>Cat</label>
            <input className='form-control' type='text' value={device.device_id && device.device_category||value}/>
          </td>
          <td>
            <label>Req</label>
            <input className='form-control' type='text' value={device.device_id && device.device_req_date||value}/>
          </td>
          <td>
            <label>Remark</label>
            <input className='form-control' type='text' value={device.device_id && device.remark||value}/>
          </td>
          <td>
            <label>Creator</label>
            <input className='form-control' type='text' value={device.device_id && device.created_by||value}/>
          </td>
        </th>
        <tr>
          <td colSpan={6}>
          {!showDiv && 
            <div>
              <button className = 'btn btn-info' onClick={() => onSubmit(device)}>Submit</button>
              <button className = 'btn btn-danger' disabled>Reset</button>
        
            </div>}
            {showDiv && 
            <div>
              <button onClick={() => onSubmit(device)}>Update</button>
              <button onClick={handleButtonClick}>Reset</button>
            </div>}
            



          </td>
        </tr>
        </table>
        </form>

      <h2>List</h2>
      <table className='table table-responsive'>
        <thead className='transaction-form-table-header'>
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
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody className='transaction-form-table'>
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
                <button onClick={() => handleOnEdit(row.device_id)}><i className='fa fa-edit'></i></button>
              </td>
              <td>
                <button onClick={() => handleOnDelete(row.device_id)}><i className='fa fa-trash'></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default DeviceList;