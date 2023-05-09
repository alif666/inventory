import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';






// ###################### Rest Service Calling #############################
function submitDevice(req) {
  // alert('Calling Insert Service with id' + req.device_id);

  return fetch('http://localhost:3000/device', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
    .then(response => response.json())
    .catch(error => console.error(error.message));
}






function updateDeviceById(device) {
  // alert('Calling Update Service with id' + device.device_id);

  return fetch('http://localhost:3000/device', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(device)
  })
    .then(response => response.json())
    .catch(error => console.error(error.message));
}



function deleteDeviceById(id) {
  // alert('Calling Delete Service with id' + id);

  return fetch('http://localhost:3000/device', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ device_id: id })
  })
    .then(response => response.json())
    .catch(error => console.error(error.message));
}



function fetchDeviceById(id) {
  // alert('Calling Service with id' + id);

  return fetch('http://localhost:3000/device/id', {
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


// ###################### Main Render Template #############################
function DeviceList() {


  //Default List Generate
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState([]);
  const [showDiv, setShowDiv] = useState(false);

  const [value, setValue] = useState('');
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


  // ###################### Form Submission #############################
  function onSubmit(sDevice) {
    // alert('submit performed with id' + sDevice.device_id + ' with serial num ' + sDevice.device_sl);


    if (sDevice.device_id) {
      // alert('Device has id number UPDATE OPERATION')
      updateDeviceById(sDevice).then(
        data=>{
          // alert(data);
        }
      );

    } else {
      // alert('Device has NO id number INSERT OPERATION - '+sDevice.device_id+'    '+sDevice.device_sl);

      submitDevice(sDevice).then(
          data=>{
            // alert(data);
          }
      );

    }
    // window.location.reload();
  }





  // ###################### Handle Action Buttons #############################
  
  //form input field handler
  function handleInputChange(event) {
    const { name, value } = event.target;
    setDevice((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const [startDate, setStartDate] = useState(new Date());

  

  //Delete Button handler
  function handleOnDelete(id) {
    // alert('ID requested for delete '+id);
    deleteDeviceById(id).then(
      data=>{
        // alert(data);
      }
    );
    window.location.reload();
  }

  //Edit Button handler
  function handleOnEdit(id) {
    fetchDeviceById(id).then(
      data => {
        if (data) {
          setDevice(data);
        } else {
          setDevice('');
        }
      }
    );
    setShowDiv(!showDiv);
  }


  //Reset Button handler
  const handleButtonClick = () => {
    setShowDiv(showDiv); // toggle the value of showDiv
    window.location.reload();
  };

  

  return (
    <div className='container'>
      <h2>Entry</h2>


      <div className ='row'>
      <form action='onSubmit'>
        <table className='table'>
          <tr>
            <td><label htmlFor="device_sl">Device SL:</label></td>
            <td>

              <input
                type="text"
                name="device_sl"
                value={device.device_sl}
                onChange={handleInputChange}
                required
              />
            </td>
            <td><label htmlFor="device_name">Device Name:</label></td>
            <td>
              <input
                type="text"
                name="device_name"
                value={device.device_name}
                onChange={handleInputChange}
                required
              />
            </td>
            <td><label htmlFor="device_category">Device Category:</label></td>
            <td>
              <input
                type="text"
                name="device_category"
                value={device.device_category}
                onChange={handleInputChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="device_req_date">Req Date</label></td>
            <td>
              <DatePicker
                name="device_req_date"
                value={device.device_req_date}
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                required
              />
            </td>
            <td><label htmlFor="remark">Remark:</label></td>
            <td>
              <input name="remark" value={device.remark} onChange={handleInputChange} />
            </td>
            <td><label htmlFor="created_by">Created By:</label></td>
            <td>
              <input
                type="text"
                name="created_by"
                value={device.created_by}
                onChange={handleInputChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan={6}>
              {!showDiv &&
                <div>
                  <button className='btn btn-info' onClick={() => onSubmit(device)}>Submit</button>

                </div>}
              {showDiv &&
                <div>
                  <button className='btn btn-info' onClick={() => onSubmit(device)}>Update</button>

                </div>}
            </td>
          </tr>
        </table>
      </form>
      </div>
      <div className='row'><button className='btn btn-danger' onClick={handleButtonClick}>Reset</button></div>
                
      <h2>List</h2>
      <div className='row'>
      <table className='table'>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>SL</th>
            <th>Name</th>
            <th>Category</th>
            <th>Req Date</th>
            <th>Remark</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
          {devices && devices.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.device_id}</td>
              <td>{row.device_sl}</td>
              <td>{row.device_name}</td>
              <td>{row.device_category}</td>
              <td>{new Date(row.device_req_date).toLocaleDateString('en-CA')}</td>
              <td>{row.remark}</td>
              <td>{row.status}</td>
              <td>
                <button onClick={() => handleOnEdit(row.device_id)}><i className='fa fa-edit'></i></button>
              </td>
              <td>
                <button onClick={() => handleOnDelete(row.device_id)}><i className='fa fa-trash'></i></button>
              </td>
            </tr>
          ))}
      </table>
      </div>
    </div>

  );
};

export default DeviceList;