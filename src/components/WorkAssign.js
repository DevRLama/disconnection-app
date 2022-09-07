import React, { useState } from 'react'
// import Data from './Data.js';
import axios from 'axios';
import {useEffect} from 'react'




function WorkAssign() {
    const[data,setdata]=useState([]);

    

    
        
    
    
   
    // let data=[{
    //     name:"abc",
    //     pno:"123"
    // },{
    //     name:"xyz",
    //     pno:"123"
    // },{
    //     name:"lmz",
    //     pno:"123"
    // },{
    //     name:"lmz",
    //     pno:"123"
    // }]

      //let data=Data()
 
     
        useEffect( () => {
           // call api or anything
           async function fetchData() {
            // You can await here
            const response = await axios({
    
                // Endpoint to send files
                url: "http://localhost:8080/api/dc/getdc",
                method: "GET",
                params: {
                    count: 50
                }
               
            })
           setdata(response.data.disconnectionData)
            // ...
          }
          fetchData()         

        //    const response = await axios({
    
        //     // Endpoint to send files
        //     url: "http://localhost:8080/api/dc/getdc",
        //     method: "GET",
        //     params: {
        //         count: 50
        //     }
        // })
        //    Data=response.data.disconnectionData
        //    console.log(response.data.disconnectionData);
          
        },[]);

    
    return (
        <>
        
       
       {!localStorage.getItem('role') ? <></> :<><h2>Assign Work to Lineman</h2>
        <hr/>

    
            <div className='container'>
                <table className="table table-striped" style={{ border: "1px solid black" }}>
                    <thead>
                        <tr>

                            <th scope="col">#</th>
                            <th scope='col'>Assign</th>
                            <th scope="col">accountId</th>
                            <th scope='col'>Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Dues</th>
                            <th scope="col">Division</th>
                            <th scope='col'>SubDivision</th>
                            <th scope="col">SubStation</th>
                            <th scope="col">Billing Status</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Billing Basis</th>
                            <th scope="col">Contrct Load</th>
                            
                        </tr>
                    </thead>
                    <tbody>                  
                    {
                        data.map((data, i) => {
                            return (
                         <tr>
                            <th scope="row">{i}</th>
                            <td>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">

                                </label>
                            </td>
                            <td>{data.accountId}</td>
                            <td>{data.name}</td>
                            <td>{data.address}</td>
                            <td>{data.dues}</td>
                            <td>{data.division}</td>
                            <td>{data.subDivision}</td>
                            <td>{data.subStation}</td>
                            <td>{data.billingStatus}</td>
                            <td>{data.phone}</td>
                            <td>{data.billBasis}</td>
                            <td>{data.contractLoad}</td>
                        </tr>

                            )
                        })
                    }
                    </tbody>
                </table>

                <form style={{ border: "1px solid black",padding:"5px"}}>


                    <div className="row">
                        <div className="col-4 text-center"> <label>Assign To</label></div>
                        <div className="col-6"><select className="form-select" aria-label="Default select example">
                            <option selected>Select Lineman</option>
                            <option value="1">Lineman 1</option>
                            <option value="2">Lineman 2</option>
                            <option value="3">Lineman 3</option>
                        </select></div>
                        <div className='col-2'><button type="button" className="btn btn-primary">Submit</button></div>
                        
                    </div>
                   




                </form>


            </div></>}




        </>

    )
}

export default WorkAssign