import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function UpdateLineman(props) {
  let navigate = useNavigate()
  const [mobileNumber, setmobileNumber] = useState("");
  const [userDetails, setuserDetails] = useState({ firstName: "", lastName: "", mobileno: "" });


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios({

      // Endpoint to send files
      url: "http://localhost:8080/api/user/getotp",
      method: "GET",
      params: {
        mobileno: mobileNumber
      }
    })
    console.log(response)
    if (response.data.respCode === 1) {

      setuserDetails({ firstName: response.data.user.firstName, lastName: response.data.user.lastName,mobileno: response.data.user.userId })
      console.log(userDetails) 
      document.querySelector("#updateForm").hidden = false
       document.querySelector("#firstName").value=response.data.user.firstName
       document.querySelector("#lastName").value=response.data.user.lastName
       document.querySelector("#mobilenou").value=response.data.user.userId

    } else {
      props.showAlert(response.data.respMsg, "danger")
      navigate("/updateLineman")



    }

  }

    const onChange = (e) => {
      setmobileNumber(document.querySelector("#mobileNumber").value)
      setuserDetails({ ...userDetails, [e.target.id]: e.target.value })
      console.log(userDetails)

  }

  const handleUpdate=async (e)=>{
    e.preventDefault()
    console.log(userDetails)
    const response = await axios.post("http://localhost:8080/api/user/update",
        JSON.stringify({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileno: userDetails.mobileno,
        }), {headers:{'Content-Type':'application/json'}})
        if (response.data.respCode === 1) {
            navigate("/profile")
            props.showAlert(response.data.respMsg, "success")
        } else {
            props.showAlert(response.data.respMsg, "danger")
        }


  }



  return (
    <>


{!localStorage.getItem('role') ? <></> : <> <div className="container">
        <div><h3>Update Lineman</h3></div>
        <div><hr /></div>

        <form onSubmit={handleSubmit}>
          <div className="form-group my-4">

            <input type="text" className="form-control" id="mobileNumber" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile Number" required />
          </div>

          <button type="submit" className="btn btn-primary" >Find</button>
        </form>

      </div>
      <div className="container my-3" id="updateForm" hidden={true} >
        <div><h2>Lineman Data</h2></div>
        <div><hr /></div>

        <form onSubmit={handleUpdate}  >
          <div className="form-group my-4">

            <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" onChange={onChange} placeholder="First Name" required />
          </div>
          <div className="form-group my-4">

            <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp" onChange={onChange} placeholder="Last Name" required />
          </div>
          <div className="form-group my-4">

            <input type="number" className="form-control" id="mobilenou" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile No" required />
          </div>
         
          <button type="submit" className="btn btn-primary" >Update</button>
        </form>

      </div></>}





    </>

  )
}

export default UpdateLineman