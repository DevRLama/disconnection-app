import React, { useState } from 'react'


function AddLineman() {

    const[userDetail,setuserDetail]=useState({firstName:"",lastName:"",mobileNo:""})


    const handleSubmit=()=>{

        //Api Call to create lineman

    }



    const onChange = (e) => {
        setuserDetail({ ...userDetail, [e.target.id]: e.target.value })
    
    }


    return (
        <>
            <div className="container">
                <div><h2>Add Lineman</h2></div>
                <div><hr /></div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" onChange={onChange} placeholder="First Name" required />
                    </div>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp" onChange={onChange} placeholder="Last Name" required />
                    </div>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="mobileno" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile No" required />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
                
            </div>



        </>

    )
}

export default AddLineman