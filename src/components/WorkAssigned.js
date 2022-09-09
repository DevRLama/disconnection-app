import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';





function WorkAssigned(props) {
    let navigate=useNavigate()
    const [linemandcdata, setlinemandcdata] = useState([]);
    // const [linemandata, setlinemandata] = useState([])
    const [checked, setChecked] = useState([]);
    // const [selected, setselected] = useState({lineman:""});
   
    


    useEffect(() => {
        // call api for disconnection data
        async function fetchlinemanDC() {
            // You can await here
            const response = await axios({

                // Endpoint to send files
                url: "http://localhost:8080/api/dc/getlinemandc",
                method: "GET",
                params: {
                    count: 100,
                    linemanId:localStorage.getItem('userId')
                }

            })
            setlinemandcdata(response.data.disconnectionData)
         
           
        } fetchlinemanDC()
    }, []);





    const handleCheck = (event) => {
        var updatedList = [...checked];
      
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
          
            
       
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
    
        }
     
        setChecked(updatedList);
       
    };

    const handleClick=async(e)=>{

        //e.preventDefault(); 
        const response = await axios.post("http://localhost:8080/api/dc/setdcDate",
            JSON.stringify({
                accountIds: checked
            }), { headers: { 'Content-Type': 'application/json' } })
        if (response.data.respCode === 1) {
            props.showAlert(response.data.respMsg, "success")
            navigate("/workAssigned")
        } else {
            props.showAlert(response.data.respMsg, "danger")
        }

    }




   




    return (
        <>


            {!localStorage.getItem('role') ? <></> : <><h3>Assigned Work</h3>
                <hr />
                
                 <div className='container'>
                    <table className="table table-hover  " style={{ border: "1px solid black" }}>
                        <thead>
                            <tr className=''>

                                <th scope="col">S.No.</th>
                                <th scope='col'>Disconnected</th>
                                <th scope="col">AccountId</th>
                                <th scope='col'>Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Dues</th>
                                {/* <th scope="col">Division</th>
                                <th scope='col'>Sub-Division</th>*/}
                                <th scope="col">Sub-Station</th> 
                                <th scope="col">Billing-Status</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Billing-Basis</th>
                                <th scope="col">Contract-Load</th>
                                <th scope="col">Feeder-Name</th>
                                <th scope="col">Remarkss-By-Lineman</th>
                                {/* <th scope="col">Assign</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                linemandcdata.map((data, i) => {
                                    return (
                                        <tr >
                                            <th scope="row">{i+1}</th>
                                            <td>
                                                <input className="form-check-input" type="checkbox" value={data.accountId} id="flexCheckDefault" onChange={handleCheck} />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">

                                                </label>
                                            </td>
                                            <td>{data.accountId}</td>
                                            <td>{data.name}</td>
                                            <td>{data.address}</td>
                                            <td>{data.dues}</td>
                                            {/* <td>{data.division}</td>
                                            <td>{data.subDivision}</td> */}
                                            <td>{data.subStation}</td>
                                            <td>{data.billingStatus}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.billBasis}</td>
                                            <td>{data.contractLoad}</td>
                                            <td>{data.feederCode}</td>
                                            <td></td>
                                            {/* <td><input id="remark" type="text" class="form-control" placeholder="Remark" onChange={onChange} /></td> */}

                                            {/* <td><select name="Lineman" id="Lineman">
                                                <option value="Lineman1">Lineman 1</option>
                                                <option value="Lineman2">Lineman 2</option>
                                                <option value="Lineman3">Lineman 3</option>
                                                <option value="Lineman4">Lineman 4</option>
                                            </select></td> */}
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className='container'><button type='button' className='btn btn-primary' onClick={handleClick}>Submit Response</button></div>

                    {/* <form style={{ border: "1px solid black", padding: "5px" }}>


                        <div className="row" >
                            <div className="col-4 text-center "> <label><h5>Assign To</h5></label></div>
                            <div className="col-6">
                                <select className="form-select" aria-label="Default select example" onChange={handleChange} id="lineman">
                                    <option selected>Select Lineman</option>
                                    {
                                        linemandata.map((data, i) => {
                                            return (

                                                <option value={data.firstName + " " + data.lastName}>{data.firstName + " " + data.lastName}</option>
                                            )
                                        })
                                    }

                                </select></div>
                            <div className='col'><button type="button" className="btn btn-primary ">Submit</button></div>

                        </div>





                    </form> */}
                    <div>
                        {console.log(checked)}
                        {console.log(localStorage.getItem('userId'))}
                      
                       
                    </div>


                </div></>}




        </>

    )
}

export default WorkAssigned