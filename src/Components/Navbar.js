import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [lg, setlg] = useState(false);

  const [wallet, setWallet] = useState(false);

  return (
    <>
      <nav
        style={{ zIndex: "1" }}
        className="navbar navbar-nav-scroll navbar-expand-lg navbar-dark"
      >
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link> */}
          <button
            className="navbar-toggler"
            onClick={() => {
              setlg(!lg);
            }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  All Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/register">
                  Register Yourself
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/createpost">
                  Post New Project
                </Link>
              </li>

              <li className="nav-item">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-warning" onClick={() => setWallet(!wallet)}>
                    {wallet === false ? "Account" : "0x000...000"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/myprojects">
                        Posted by me
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myassignments">
                        Assigned to me
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* <span className="nav-link active" onClick={() => setWallet(!wallet)}>{wallet === false ? "Account" : "0x000...000"}</span> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Sidebar lg={lg} />
    </>
  );
}
