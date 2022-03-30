import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
import Sidebar from "./Sidebar";

export default function Navbar() {

  const [lg, setlg] = useState(false)
  
  const [wallet, setWallet] = useState(false)

  return (
      <>
      <nav style={{zIndex:"1"}} className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link> */}
        <button className="navbar-toggler" onClick={() => {setlg(!lg)}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">All Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/assigned">Assigned to Me</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/post">Post New Project</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link active" onClick={() => setWallet(!wallet)}>{wallet === false ? "Account" : "0x000...000"}</span>
            </li>
          </ul>
          {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
      <Sidebar lg={lg}/>
      </>
  );
}
