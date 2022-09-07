import '../App.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function SignIn(props) {
    let navigate = useNavigate();
    const [profile, setprofile] = useState({ userId: "", firstName: "", lastName: "", role: "" })
    const [mobileNumber, setmobileNumber] = useState("");
    const [OTP, setOTP] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Api hit

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

            setprofile({ userId: response.data.user.userID, firstName: response.data.user.firstName, lastName: response.data.user.lastName, role: response.data.user.role })
            document.querySelector("#OTPForm").hidden = false
            console.log("hi")
        } else {
            props.showAlert(response.data.respMsg, "danger")
            navigate("/")



        }


    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        const response = await axios({

            // Endpoint to send files
            url: "http://localhost:8080/api/user/verifyotp",
            method: "GET",
            params: {
                otp: OTP, mobileno: mobileNumber
            }
        })

        console.log(response);

        if (response.data.respCode === 1) {
            localStorage.setItem('role', profile.role)
            localStorage.setItem('userId', profile.userId)
            navigate("/profile")
            props.showAlert("Succesfully logged in", "success")
        } else {
            localStorage.removeItem('role')
            props.showAlert("Not valid OTP", "danger")
        }
    }

    const onChange = () => {
        setmobileNumber(document.querySelector("#mobileNumber").value)
        setOTP(document.querySelector("#OTP").value)


    }


    return (
        <>
            {!localStorage.getItem('role') ? <></> : <div className="container">
                <div className="card login-form mx-auto">
                    <div className="card-body">
                        <div className="card-title text-center"><h2>Sign In</h2></div>
                        
                        <div className='card-text'>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group my-4">

                                    <input type="number" className="form-control" id="mobileNumber" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile Number" required />
                                </div>
                                <button type="submit" className="btn btn-primary" >Send OTP</button>
                            </form>
                            <div id="OTPForm" hidden={true}>
                                <form onSubmit={handleSignIn} className='my-3'  >
                                    <div>
                                        <input type="text" className="form-control" id="OTP" aria-describedby="emailHelp" onChange={onChange} placeholder="OTP" required />
                                    </div>
                                    <div className='my-2'><button type="submit" className="btn btn-primary" >Sign In</button></div>

                                </form></div></div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default SignIn