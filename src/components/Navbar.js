import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom";


export default function Navbar(props) {
  let navigate=useNavigate()

  const handleLogOut=(e)=>{
    e.preventDefault();
    localStorage.removeItem('role')
    navigate("/")
  }




  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
            
          {localStorage.getItem('role') ? 
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-item nav-link" aria-current="page" to="/profile">Profile Page</Link>
                </li>
                 <li className="nav-item">
                 <Link className="nav-item nav-link" aria-current="page" to="/workAssign">Work Assign</Link>
               </li>
               </ul>
           
            
         :<></>}

        

          


          {!localStorage.getItem('role') ? <form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-item nav-link" aria-current="page" to="/">Sign In</Link>
              </li>
            </ul></form>
          :
          <form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <h6 className="nav-item nav-link">Welcome : {localStorage.getItem('role')}</h6>
            <Link className="nav-item nav-link" aria-current="page" to="/" onClick={handleLogOut}>Log Out</Link>
            </ul></form>
          }
        </div>
      </div>
    </nav >
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: 'Set Title here',
  aboutText: "About Us"
}