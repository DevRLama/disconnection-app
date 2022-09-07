import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom";


export default function Navbar(props) {
  let navigate = useNavigate()

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('role')
    navigate("/")
  }




  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          {localStorage.getItem('role')==="JE" ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-item nav-link" aria-current="page" to="/profile">Profile Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item nav-link" aria-current="page" to="/workAssign">Work Assign</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Manage Lineman
                </Link>
                <div class="dropdown-menu " aria-labelledby="navbarDropdown">
                  <Link className="nav-item nav-link bg-dark " aria-current="page" to="/addLineman">Add Lineman</Link>
                  <Link className="nav-item nav-link bg-dark " aria-current="page" to="/deleteLineman">Delete Lineman</Link>
                  <Link className="nav-item nav-link bg-dark " aria-current="page" to="/updateLineman">Update Lineman</Link>
                </div>
              </li>
            </ul>
            : <>{localStorage.getItem('role')=="Lineman"? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-item nav-link" aria-current="page" to="/profile">Profile Page</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-item nav-link" aria-current="page" to="/workAssigned">Work Assigned</Link>
            </li>
            {/* <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Manage Lineman
              </Link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="nav-item nav-link" aria-current="page" to="/addLineman">Add Lineman</Link>
                <Link className="nav-item nav-link" aria-current="page" to="/deleteLineman">Delete Lineman</Link>
                <Link className="nav-item nav-link" aria-current="page" to="/updateLineman">Update Lineman</Link>
              </div>
            </li> */}
          </ul>:<></>}</>}






          {!localStorage.getItem('role') ? <form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link className="nav-item nav-link" aria-current="page" to="/">Sign In</Link>
            </ul></form>
            :
            <form>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                {/* <h6 className="nav-item nav-link">Welcome : {localStorage.getItem('role')}</h6> */}

                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome : {localStorage.getItem('role')}
                </Link>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="nav-item nav-link bg-dark " aria-current="page" to="/"onClick={handleLogOut}>Log Out</Link>
                  
                </div>
              </li>               
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