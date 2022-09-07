import React from 'react'



function WorkAssign() {

    let data=[{
        name:"abc",
        pno:"123"
    },{
        name:"xyz",
        pno:"123"
    },{
        name:"lmz",
        pno:"123"
    },{
        name:"lmz",
        pno:"123"
    }]
    
    return (
        <>
       
       {!localStorage.getItem('role') ? <></> :<><h2>Assign Work to Lineman</h2>
        <hr/>


            <div className='container'>
                <table className="table table-striped" style={{ border: "1px solid black" }}>
                    <thead>
                        <tr>

                            <th scope="col">#</th>
                            <th scope='col'>Assign</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            
                        </tr>
                    </thead>
                    <tbody>                  
                    {
                        data.map((data, i) => {
                            return (
                         <tr>
                            <th scope="row">{i}</th>
                            <td>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">

                                </label>
                            </td>
                            <td>{data.name}</td>
                            <td>{data.pno}</td>
                        </tr>

                            )
                        })
                    }
                    </tbody>
                </table>

                <form style={{ border: "1px solid black",padding:"5px"}}>


                    <div className="row">
                        <div className="col-4 text-center"> <label>Assign To</label></div>
                        <div className="col-6"><select className="form-select" aria-label="Default select example">
                            <option selected>Select Lineman</option>
                            <option value="1">Lineman 1</option>
                            <option value="2">Lineman 2</option>
                            <option value="3">Lineman 3</option>
                        </select></div>
                        <div className='col-2'><button type="button" className="btn btn-primary">Submit</button></div>
                        
                    </div>
                   




                </form>


            </div></>}




        </>

    )
}

export default WorkAssign