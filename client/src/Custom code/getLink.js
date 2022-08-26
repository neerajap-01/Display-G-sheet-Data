import React, { useState } from "react";
import DynamicTable from "./table";
import Papa from "papaparse"
import '../App.css'

const NewForm = () => { 
  const [documentId, setDocumentId] = useState(undefined)
  const [isDisplay, setIsDisplay] = useState(false)
  const [apiData, setApiData] = useState(undefined)
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const addData = async(data) => {
    const myData = {
      sheetLink: serviceList[0].service,
      data: data
    }
    const result = await fetch('http://localhost:3001/addData',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    })

    const resData = await result.json()
    setDocumentId(resData.data._id)
  }

  const fetchTable = async () => {
    const myData = {
      number: serviceList[1].service
    }

    const result = await fetch(`http://localhost:3001/multiply/${documentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    })

    const resData = await result.json()
    setApiData(resData)
    setIsDisplay(true)
  }

  function fetchData(url) {
    Papa.parse(`${url}/pub?output=csv`, {
       download: true,
       header: true,
       complete: (results) => {
        addData(results.data)
       },
       error: (err) => {
          console.log(err.message)
       }
     });
   }

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
    fetchData(serviceList[0].service)
  };

  return (
    <div className = "Table">
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
                    className="add-btn">
                    <span>Fetch data</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isDisplay === false ? <div className="first-division">
            {serviceList.length === 2 && (
              <button
              type="button"
              onClick={fetchTable}
              className="sub-btn"
              >
              <span>Submit</span>
            </button>
            )}
          </div> :
          <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => window.location.reload(false)}
                  className="remove-btn"
                >
                  <span>Reset</span>
                </button>
              )}
          </div>}
        </div>
      </form>
      {isDisplay === true && <div className="tableData">
            <DynamicTable tableData={apiData.data.data}/>
      </div>}
    </div>
  );
}

export default NewForm;


