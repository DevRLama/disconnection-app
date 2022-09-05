import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


export default function Navbar(props) {

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
        <form className="d-flex nav-item">
              
                <li className="nav-item">
                  <Link className="nav-item nav-link" aria-current="page" to="/profile">Profile Page</Link>
                </li>
              
           
            
          </form>  

        

          </ul>


          {!localStorage.getItem('token') ? <form className="d-flex nav-item">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-item nav-link" aria-current="page" to="/signIn">Sign In</Link>
              </li>
            </ul>
          </form> :
            <h6 className="nav-item nav-link">Welcome ERP ID: {localStorage.getItem('user')}</h6>

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