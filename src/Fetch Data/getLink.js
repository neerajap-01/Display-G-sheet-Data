import React, { useState } from "react";
import '../App.css'
import Papa from "papaparse";

const NewForm = () => { 
  const [data, setData] = useState({});
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  console.log(serviceList)

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };
  
  function fetchData() {
    Papa.parse(`${serviceList[0].service}/pub?output=csv`, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results.data)
        setData(results.data);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
    fetchData()
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Assignment</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                placeholder={index === 0 ? "Paste Google Sheet Link" : "Enter a number"} 
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 2 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Fetch data</span>
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="first-division">
          {serviceList.length === 2 && (
            <button
            type="button"
            onClick={fetchData}
            className="sub-btn"
            >
            <span>Submit</span>
          </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default NewForm;


