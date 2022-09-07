import React from 'react'
//import axios from 'axios'
//import { useEffect } from 'react'
//import ProfileData from './ProfileData'



function WorkAssigned() {

    return (


        <>
            {!localStorage.getItem('role') ? <></> : <><h2>{localStorage.getItem('role')} Work Assigned</h2>
                <table className="table table-striped table-hover">
                    <tr>
                        <td>{localStorage.getItem('role')} </td>
                        <td></td>
                    </tr>
                </table></>}
        </>

    )
}

export default WorkAssigned