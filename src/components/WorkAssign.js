import React, { useState } from 'react'
// import Data from './Data.js';
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';




function WorkAssign(props) {
    let navigate = useNavigate()
    const [data, setdata] = useState([]);
    const [linemandata, setlinemandata] = useState([])
    const [checked, setChecked] = useState([]);
    const [selected, setselected] = useState();


    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const handleChange = (event) => {

        setselected({ ...selected, [event.target.id]: event.target.value });
    };


    const handleworkSubmit = async (e) => {
        // e.preventDefault();




        const response = await axios.post("http://localhost:8080/api/dc/assigndc",
            JSON.stringify({
                accountIds: checked,
                jeId: localStorage.getItem('userId'),
                linemanId: selected.lineman


            }), { headers: { 'Content-Type': 'application/json' } })
        if (response.data.respCode === 1) {
            props.showAlert(response.data.respMsg, "success")
            navigate("/workAssign")
        } else {
            props.showAlert(response.data.respMsg, "danger")
        }








    }





    // // Generate string of checked items
    // const checkedItems = checked.length ? checked.reduce((total, item) => {
    //     return total + ", " + item;
    // })
    //     : "";




    useEffect(() => {
        // call api for disconnection data
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
            if (response.data.respCode === 1) {
                setdata(response.data.disconnectionData)
            } else {
               alert("Unable to fetch the data at this moment")
            }


        }

        //API call to populate lineman details
        async function fetchLineman() {
            // You can await here
            const response = await axios({

                // Endpoint to send files
                url: "http://localhost:8080/api/user/getlineman",
                method: "GET",
                params: {
                    userId: localStorage.getItem('userId')
                }

            })
            if (response.data.respCode === 1) {
                setlinemandata(response.data.linemans)
            } else {
                alert("Unable to fetch the linman at this moment")
            }
            
        }
        fetchData()
        fetchLineman()
    }, []);


    return (
        <>


            {!localStorage.getItem('role') ? <></> : <><h3>Assign Work to Lineman</h3>
                <hr />
                {console.log(linemandata)}

                <div className='container'>
                    <table className="table table-hover " style={{ border: "1px solid black" }}>
                        <thead>
                            <tr >

                                <th scope="col">S.No.</th>
                                <th scope='col'>  Assign</th>
                                <th scope="col">AccountId</th>
                                <th scope='col'>Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Dues</th>
                                <th scope="col">Division</th>
                                <th scope='col'>Sub-Division</th>
                                <th scope="col">Sub-Station</th>
                                <th scope="col">Billing-Status</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Billing-Basis</th>
                                <th scope="col">Contract-Load</th>
                                <th scope="col">Feeder-Name</th>
                                {/* <th scope="col">Assign</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data, i) => {
                                    return (
                                        <tr >
                                            <th scope="row">{i + 1}</th>
                                            <td>
                                                <input className="form-check-input" type="checkbox" value={data.accountId} id="flexCheckDefault" onChange={handleCheck} />
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
                                            <td>{data.feederCode}</td>
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

                    <form style={{ border: "1px solid black", padding: "5px" }} onSubmit={handleworkSubmit}>


                        <div className="row" >
                            <div className="col-4 text-center "> <label><h5>Assign To</h5></label></div>
                            <div className="col-6">
                                <select className="form-select" aria-label="Default select example" onChange={handleChange} id="lineman">
                                    <option selected>Select Lineman</option>
                                    {
                                        linemandata.map((data, i) => {
                                            return (

                                                <option value={data.userId}>{data.firstName + " " + data.lastName}</option>
                                            )
                                        })
                                    }

                                </select></div>
                            <div className='col'><button type="submit" className="btn btn-primary " >Submit</button></div>

                        </div>





                    </form>
                    <div>
                        {console.log(checked)}
                        {console.log(localStorage.getItem('userId'))}
                        {console.log(selected)}

                    </div>


                </div></>}




        </>

    )
}

export default WorkAssign