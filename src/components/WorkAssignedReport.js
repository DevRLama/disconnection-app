import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WorkAssignedReport(props) {

    const [data, setdata] = useState([]);

    // const dataArrary = [{
    //     accountId: "12121212",
    //     name: "Amit Yadav",
    //     address: "omaxe city lucknow",
    //     dues: "1212",
    //     subStation: "omaxe",
    //     billingStatus: "live",
    //     phone: "23323232121",
    //     billBasis: "MU",
    //     contractLoad: "3",
    //     feederCode: "town"
    // }];

    useEffect(() => {
        // call api for data
        async function fetchData() {
            // You can await here
            const response = await axios({

                // Endpoint to send files
                url: "http://localhost:8080/api/dc/getdc",
                method: "GET",
                params: {
                    count: 10
                }

            })
            setdata(response.data.disconnectionData)


        }

        fetchData()
    }, []);

    let navigate = useNavigate()

    return (
        <>
            {!localStorage.getItem('role') ? <></> : <><h3>Assigned Work Report</h3>
                <hr />

                <div className='container'>
                    <table className="table table-hover table-striped " style={{ border: "1px solid black" }}>
                        <thead>
                            <tr className=''>

                                <th scope="col">S.No.</th>
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
                                data.map((data, i) => {
                                    return (
                                        <tr >
                                            <th scope="row">{i+1}</th>
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

                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>



                </div></>}




        </>

    )
}

export default WorkAssignedReport