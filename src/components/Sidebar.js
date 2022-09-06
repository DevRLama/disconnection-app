import React from 'react'
import { Link } from 'react-router-dom'
import {SidebarData} from './SidebarData'

function Sidebar() {



    return (
        <>
            
            <div class="sidebar">
                <ul>{SidebarData.map((val,key)=>{
                return( <li key={key} onClick={()=>{window.location.pathname=val.link}}>
                    {" "}
                    <div>{val.icon}</div>{" "}
                    <div>{val.title}</div>
                </li>

                );
            })}</ul>
                            
            </div>

           
        </>
    )
}

export default Sidebar