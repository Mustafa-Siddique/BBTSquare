import React, { useEffect, useState } from "react";
import home from "../assets/images/projects.png";
import trapsheet from "../assets/images/assigned.png";
import safedefi from "../assets/images/new.png";
import stop from "../assets/images/user.png";
import { Link } from "react-router-dom";

export default function Bottomnav() {
  return (
    <div className="d-lg-none bottomNav container-fluid">
      <nav>
        <div className="bottomBtn d-flex justify-content-around">
          <button className="btn">
            <Link id="mob-link" to="/">
              <img style={{ height: "32px" }} src={home} alt="" />
              <br />
              All Projects
            </Link>
          </button>
          <button className="btn">
            <Link id="mob-link" to="/register">
              <img
                src={safedefi}
                style={{ filter: "invert(1)", height: "32px" }}
                alt=""
              />
              <br />
              Register Yourself
            </Link>
          </button>
          <button className="btn">
            <Link id="mob-link" to="/createpost">
              <img
                src={stop}
                style={{ filter: "invert(1)", height: "32px" }}
                alt=""
              />
              <br />
              Post New Project
            </Link>
          </button>
          <div className="btn-group dropup">
            <button className="btn">
              <img style={{ height: "38px" }} src={trapsheet} alt="" />
              <br />
              Account
            </button>
            <button
              type="button"
              className="btn dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/">
                  Posted by me
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/assigned">
                  Assigned to me
                </Link>
              </li>
            </ul>
          </div>
          {/* <button className="btn">
            <a
              href="https://drive.google.com/uc?id=1PbT6ef7QUcQM6IA3yfFga9hdTDpf7hua"
              id="mob-link"
              target="_blank"
              rel="noreferrer"
            >
              <img style={{height:"38px"}} src={trapsheet} alt="" />
              <br />
              Account
            </a>
          </button> */}
        </div>
      </nav>
    </div>
  );
}
