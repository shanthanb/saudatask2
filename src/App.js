import React, { useState } from "react";
import './App.css';
import * as XLSX from "xlsx";

function App() {

  const [items,setItems]= useState([])

  const readExcel=(file)=>{

    const promise=new Promise((resolve,reject)=>{

      const fileReader=new FileReader();
      fileReader.readAsArrayBuffer(file);
    
      fileReader.onload=(e)=>{
        const bufferArray=e.target.result;

        const wb=XLSX.read(bufferArray,{type:'buffer'});
        const wsname=wb.SheetNames[0];
      
        const ws=wb.Sheets[wsname];
        const data=XLSX.utils.sheet_to_json(ws);
        
        resolve(data);
};

fileReader.onerror=(error) => {

  reject(error);
};
  });
  promise.then((d) => {
  
    setItems(d)

  });
};
  return (


<div>

<h1 align="center">Import Data from Excel,CSV</h1>

<label class="custom-file-upload">
<input type="file" onChange={(e)=>{

  const file=e.target.files[0];

readExcel(file);
}}
  />
Browse
</label>


<div className="design">
<table id="t01">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Status</th>
      <th scope="col">Buyer</th>
      <th scope="col">Seller</th>
      <th scope="col">Variety</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  
 <tbody>
{

  items.map((d) => (
   <tr key={d.Type}>
      <td>{d.Type}</td>
      <td>{d.Status}</td>
      <td>{d.Buyer}</td>
      <td>{d.Seller}</td>
      <td>{d.Variety}</td>
      <td>{d.Quantity}</td>
  
    </tr>
  ))}

  </tbody>
</table>
</div>
    </div>
  );
}

export default App;
