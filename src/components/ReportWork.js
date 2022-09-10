import React, { useState } from 'react'
// import Data from './Data.js';
import axios from 'axios';
import { useEffect } from 'react'
import { ExportJsonCsv } from 'react-export-json-csv';



function ReportWork(props) {
    // let navigate = useNavigate()
    const [dcdata, setdcdata] = useState([]);
    const headers = [
        {
          key: 'accountId',
          name: 'AccountID',
        },
        {
          key: 'name',
          name: 'Name',
        },
        {
            key: 'address',
            name: 'Address',
          },
          {
            key: 'dues',
            name: 'Dues',
          },
          {
            key: 'division',
            name: 'Division',
          },
          {
            key: 'subDivision',
            name: 'Sub Division',
          },
          {
            key: 'feederCode',
            name: 'Feeder Code',
          },
          {
            key: 'Remark',
            name: 'Remark',
          }
      ]
      
      const handleExport=()=>{
        
        <ExportJsonCsv headers={headers} items={dcdata}>Export</ExportJsonCsv>
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
            if(response.data.respCode===3){
                alert("Unable to fetch data at the moment!")
            }


        }
        fetchData()
    }, []);


    return (
        <>


            {!localStorage.getItem('role') ? <></> : <><h3>Disconnected Consumer</h3>
            <div className='text-right'><button type="button" class="btn btn-primary" onClick={handleExport}>Export CSV</button></div>
                <hr />
                <div className='container'>
                    <table className="table table-hover " style={{ border: "1px solid black" }}>
                        <thead>
                            <tr >

                                <th scope="col">S.No.</th>
                                {/* <th scope='col'> Assign</th> */}
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
                                <th scope="col">Remark</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                dcdata.map((data, i) => {
                                    return (
                                        <tr >
                                            <th scope="row">{i + 1}</th>
                                            {/* <td>
                                                <input className="form-check-input" type="checkbox" value={data.accountId} id="flexCheckDefault" onChange={handleCheck} />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">

                                                </label>
                                            </td> */}
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
                                            <td>{data.Remark}</td>
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
                </div></>
            }

        </>

    )
}

export default ReportWork