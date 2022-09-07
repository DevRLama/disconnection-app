import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import ProfileData from './ProfileData'



function HomePage() {

    return (


        <>
             {!localStorage.getItem('role') ? <></> :<><h2>{localStorage.getItem('role')} Home page</h2>
            <table className="table table-striped table-hover">
                <tr>
                    <td>First Name</td>
                    <td></td>
                </tr>
            </table></>}
        </>

    )
}

export default HomePage