import React from "react";

function DynamicTable({ tableData }){
// get table column
 const column = Object.keys(tableData[0]);

 // get table heading data
 const ThData =()=>{
    
     return column.map((data)=>{
         return <th key={data}>{data}</th>
     })
 }

// get table row data
const tdData =() =>{
   
     return tableData.map((data)=>{
       return(
           <tr>
                {
                   column.map((v)=>{
                       return <td>{data[v]}</td>
                   })
                }
           </tr>
       )
     })
}


  return (
      <table className="table">
        <thead>
         <tr>{ThData()}</tr>
        </thead>
        <tbody>
        {tdData()}
        </tbody>
       </table>
  )
}
export default DynamicTable;