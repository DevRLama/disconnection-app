import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom';
import axios from 'axios';
import {Parser} from 'json2csv';


function WorkAssignedReport(props) {

    const [data, setdata] = useState([]);

    

    function handleClick() {
        const fields = [
            {
                label:"Account_ID",
                value:`accountId`
            },
            {
                label:"Name",
                value:`name`
            },
            {
                label:"Address",
                value:`address`
            },
            {
                label:"Mobile_No",
                value:`phone`
            },
            {
                label:"Sub_Station",
                value:`subStation`
            },
            {
                label:"Feeder_Code",
                value:`feederCode`
            },
            {
                label:"Dues",
                value:`dues`
            },
            {
                label:"Assigned_To",
                value:`AssignedTo`
            },
            {
                label:"Assigned_By",
                value:`AssignedBy`
            },
            {
                label:"Assigned_Date",
                value:`AssignedDate`
            },
            {
                label:"CompletionDate",
                value:`CompletionDate`
            }
        ];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(data);

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "Report.csv";
    
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    }




    useEffect(() => {
        // call api for data
        async function fetchData() {
            const role = localStorage.getItem('role');
            const userId = localStorage.getItem('userId')
            console.log()
            // You can await here
            const response = await axios({

                // Endpoint to send files
                url: "http://localhost:8080/api/dc/getreport",
                method: "GET",
                params: {
                    role: role,
                    userId: userId
                }

            })
            if (role === "JE") {
                setdata(response.data.JEdata);
            }
            else {
                setdata(response.data.linemanData);
            }
        }

        fetchData()
    }, []);


    return (
        <>
            {!localStorage.getItem('role') ? <></> : <><h3>Report</h3>
                <hr />
                
                <div className='container'>
                <button className="btn btn-primary" type="button" onClick={handleClick} style={{marginBottom:"10px"}}>Download Report</button>
                    <table className="table table-hover table-striped " style={{ border: "1px solid black" }} id="reportTable">
                        <thead>
                            <tr className=''>
                                <th scope="col">S.No.</th>
                                <th scope="col">Account Id</th>
                                <th scope='col'>Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Sub-Station</th>
                                <th scope="col">Feeder Code</th>
                                <th scope="col">Dues</th>
                                <th scope='col'>Assigned To</th>
                                <th scope='col'>Assigned By</th>
                                <th scope='col'>Assigned Date</th>
                                <th scope='col'>Completion Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data, i) => {
                                    return (
                                        <tr >
                                            <th scope="row">{i + 1}</th>
                                            <td>{data.accountId}</td>
                                            <td>{data.name}</td>
                                            <td>{data.address}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.subStation}</td>
                                            <td>{data.feederCode}</td>
                                            <td>{data.dues}</td>
                                            <td>{data.AssignedTo}</td>
                                            <td>{data.AssignedBy}</td>
                                            <td>{data.AssignedDate}</td>
                                            <td>{data.CompletionDate}</td>
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