import React from "react";
import logo from '../assets/images/logo.png'

export default function Navbar() {
  return (
      <nav style={{zIndex:"100"}} className="navbar navbar-expand-lg navbar-dark shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img src={logo} alt="" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">All Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Assigned to Me</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active">Post New Project</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active">Account</a>
            </li>
          </ul>
          {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
  );
}
