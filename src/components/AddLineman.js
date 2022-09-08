import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function AddLineman(props) {

    const [userDetail, setuserDetail] = useState({ firstName: "", lastName: "", mobileno: "" })
    const [role, setrole] = useState("")
    let navigate = useNavigate();



    const handleSubmit = async (e) => {

        //Api Call to create lineman
        e.preventDefault();
        // Api hit
        // const response = await axios({

        //     // Endpoint to send files
        //     url: "http://localhost:8080/api/user/create",
        //     method: "POST",
        //     headers:{'Content-Type':'application/json'},
        //     body: JSON.stringify({
        //         firstName: userDetail.firstName,
        //         lastName: userDetail.lastName,
        //         mobileno: userDetail.mobileNo,
        //         role: userDetail.role

        //     })
        // })


        const response = await axios.post("http://localhost:8080/api/user/create",
            JSON.stringify({
                firstName: userDetail.firstName,
                lastName: userDetail.lastName,
                mobileno: userDetail.mobileno,
                role: role

            }), { headers: { 'Content-Type': 'application/json' } })
        if (response.data.respCode === 1) {
            navigate("/profile")
            props.showAlert("Succesfully Created Lineman ", "success")
        } else {
            props.showAlert(response.data.respMsg, "danger")
        }



    }


    const onChange = (e) => {
        setuserDetail({ ...userDetail, [e.target.id]: e.target.value })
        setrole("Lineman")

    }


    return (
        <>

            {!localStorage.getItem('role') ? <></> : <div className="container">
                <div ><h3>Add Lineman</h3></div>
                <div><hr /></div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="firstName" onChange={onChange} placeholder="First Name" required />
                    </div>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="lastName" onChange={onChange} placeholder="Last Name" required />
                    </div>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="mobileno" onChange={onChange} placeholder="Mobile No" required />
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>

            </div>}

        </>

    )
}

export default AddLineman