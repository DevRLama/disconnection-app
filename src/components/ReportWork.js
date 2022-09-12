import React, { useState } from 'react'
// import Data from './Data.js';
import axios from 'axios';
import { useEffect } from 'react'
//import { ExportJsonCsv } from 'react-export-json-csv';
import { Parser } from 'json2csv';



function ReportWork(props) {
    // let navigate = useNavigate()
    const val=localStorage.getItem('role')
    const [dcdata, setdcdata] = useState([]);
    function handleClick() {
        const fields = [
            {
                label: "Account_ID",
                value: `accountId`
            },
            {
                label: "Name",
                value: `name`
            },
            {
                label: "Address",
                value: `address`
            },
            {
                label: "Mobile_No",
                value: `phone`
            },
            {
                label: "Sub_Station",
                value: `subStation`
            },
            {
                label: "Feeder_Code",
                value: `feederCode`
            },
            {
                label: "Dues",
                value: `dues`
            },
            {
                label: "Assigned_To",
                value: `AssignedTo`
            },
            {
                label: "Assigned_By",
                value: `AssignedBy`
            },
            {
                label: "Assigned_Date",
                value: `AssignedDate`
            },
            {
                label: "CompletionDate",
                value: `CompletionDate`
            }
        ];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(dcdata);

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "Report"+val+".csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    }



    useEffect(() => {
        // call api for disconnection data
        async function fetchData() {
            // You can await here
            const response = await axios({

                // Endpoint to send files
                url: "http://localhost:8080/api/dc/getreport",
                method: "GET",
                params: {
                    userId: localStorage.getItem('userId'),
                    role: localStorage.getItem('role')
                }

            })
            if (response.data.respCode === 1 && localStorage.getItem('role') === "JE") {
                setdcdata(response.data.jeData)
            }
            if (response.data.respCode === 2 && localStorage.getItem('role') === "Lineman") {
                setdcdata(response.data.linemanData)
            }
            if (response.data.respCode === 3) {
                alert("Unable to fetch data at the moment!")
            }


        }
        fetchData()
    }, []);


    return (
        <>


            {!localStorage.getItem('role') ? <></> : <><h3>Report Work Assigned</h3>
                <div className='text-right'><button type="button" class="btn btn-primary" onClick={handleClick}>Export CSV</button></div>
                <hr />
                <div className='container'>
                    <table className="table table-hover " style={{ border: "1px solid black" }}>
                        <thead>
                            <tr >
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
                                dcdata.map((data, i) => {
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
                </div></>
            }

        </>

    )
}

export default ReportWork