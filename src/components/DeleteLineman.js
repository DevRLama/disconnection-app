import React, { useState } from 'react'


function DeleteLineman() {

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
                <div><h2>Delete Lineman</h2></div>
                <div><hr /></div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">

                        <input type="text" className="form-control" id="mobileNo" aria-describedby="emailHelp" onChange={onChange} placeholder="Mobile Number" required />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
                
            </div>



        </>

    )
}


export default DeleteLineman