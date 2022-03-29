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
              <img style={{ height:"32px" }} src={home} alt="" />
              <br />
              All Projects
            </Link>
          </button>
          <button className="btn">
            <Link
              id="mob-link"
              to="/safehaven"
            >
              <img src={safedefi} style={{ filter:"invert(1)", height:"32px"}} alt="" />
              <br />
              Assigned to me
            </Link>
          </button>
          <button className="btn">
            <Link id="mob-link" to="/boobytrap">
              <img src={stop} style={{ filter:"invert(1)", height:"32px" }} alt="" />
              <br />
              Post New Project
            </Link>
          </button>
          <button className="btn">
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
          </button>
        </div>
      </nav>
    </div>
  );
}