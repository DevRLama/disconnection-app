import React,{useState} from 'react'


import { useNavigate } from 'react-router-dom';


function Login(props) {
    let navigate = useNavigate();
    const [mobileNumber, setmobileNumber] = useState("");
    const [OTP, setOTP] = useState("");
    const [OTP_VAL, setOTP_VAL] = useState("");
    const [role, setrole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(mobileNumber==="1234567890")
        {
            document.querySelector("#OTPForm").hidden=false
            setOTP_VAL("1234")
            setrole("AE")
            
           
        }else{
            props.showAlert("Not valid User","danger")
            navigate("/")
        }
    }

    const handleSignIn=(e)=>{
        e.preventDefault();
       if(OTP===OTP_VAL ){
        localStorage.setItem('role',role)
       navigate("/profile")       
        props.showAlert("Succesfully logged in","success")
       }else{
        props.showAlert("Not valid OTP","danger")
       }
    }
    
    const onChange=()=>{
        setmobileNumber(document.querySelector("#mobileNumber").value)
        setOTP(document.querySelector("#OTP").value)
        

    }


    return (
        <>
            <div className="container">
                <div><h2>Sign In</h2></div>
                <div><hr /></div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="mobileNumber" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile Number" required  />
                    </div>
                    <button type="submit" className="btn btn-primary" >Send OTP</button>
                </form>
                <div id="OTPForm" hidden={true}>
                <form onSubmit={handleSignIn} className='my-3'  >
                    <div>
                    <input type="text" className="form-control" id="OTP" aria-describedby="emailHelp" onChange={onChange} placeholder="OTP" required />
                    </div>
                    <div className='my-2'><button type="submit" className="btn btn-primary" >Sign In</button></div>
                    
                </form></div>
            </div>
        </>
    );
}

export default Login