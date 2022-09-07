import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function DeleteLineman(props) {

   let navigate=useNavigate()
    const [mobileNumber, setmobileNumber] = useState("");


    const handleSubmit=async(e)=>{

        //Api Call to create lineman
        e.preventDefault();
        // Api hit

        const response = await axios({

            // Endpoint to send files
            url: "http://localhost:8080/api/user/deleteuser",
            method: "GET",
            params: {
                mobileno: mobileNumber
            }
        })
        if (response.data.respCode === 1) {
             navigate("/profile")
             props.showAlert("Succesfully"+ mobileNumber +" Deleted Lineman ", "success")
         } else if (response.data.respCode === 3){
             props.showAlert(response.data.respMsg, "danger")
         }else{
           props.showAlert(response.data.respMsg, "danger")}



    }



    const onChange = (e) => {
        
        setmobileNumber(document.querySelector("#mobileNumber").value)
    
    }


    return (
        <>
            {!localStorage.getItem('role') ? <></> : <div className="container">
                <div><h2>Delete Lineman</h2></div>
                <div><hr /></div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="mobileNumber" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile Number" required />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
                
            </div>}



        </>

    )
}


export default DeleteLineman