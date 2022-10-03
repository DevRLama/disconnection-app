import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';

function Lineman() {
    const [linemen, setlinemen] = useState([]);

    useEffect(() => {
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
                setlinemen(response.data.linemans)
            } else {
                alert("Unable to fetch the linman at this moment")
            }
        }
        fetchLineman();
    }, [])

    return (
        <div>
            <h2>List of Linemen</h2>
            <table className="table table-hover " style={{ border: "1px solid black" }}>
                <thead>
                    <th>S.No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                </thead>
                <tbody>
                    {linemen.map((lineman, i) => {
                        return(
                            <tr>
                                <td>{i+1}</td>
                                <td>{lineman.firstName}</td>
                                <td>{lineman.lastName}</td>
                                <td>{lineman.userId}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default Lineman