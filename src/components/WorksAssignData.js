import React, { useEffect } from 'react'
 
 const WorksAssignData=()=>{
    // Api hit
    let data=[{
        name:"abc",
        pno:"123"
    },{
        name:"xyz",
        pno:"123"
    },{
        name:"lmz",
        pno:"123"
    }]

  const DATA= data.map((data,index)=>
  <tr key={index}>
  <th scope="row">{index}</th>
  <td>
      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
      <label className="form-check-label" for="flexCheckDefault">

      </label>
  </td>
  <td>{data.name}</td>
  <td>{data.pno}</td>
  <td>@mdo</td>
</tr>




  
  
  
  
     
             
    )
   
    return(
        <div>
            {DATA}
        </div>
    )
 }

 export default WorksAssignData;