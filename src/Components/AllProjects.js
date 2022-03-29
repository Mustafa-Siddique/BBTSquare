import React from 'react'
import { Link } from 'react-router-dom'

export default function AllProjects() {

  const arr = [
    {
      name: "Project Name1",
      creator: "Creator",
      creatorWallet: "0x00000000000000000000",
      summary: "lorem ipsum",
      amount: "5",
    },
    {
      name: "Project Name2",
      creator: "Creator",
      creatorWallet: "0x00000000000000000000",
      summary: "lorem ipsum",
      amount: "5",
    },
    {
      name: "Project Name3",
      creator: "Creator",
      creatorWallet: "0x00000000000000000000",
      summary: "lorem ipsum",
      amount: "5",
    },
    {
      name: "Project Name4",
      creator: "Creator",
      creatorWallet: "0x00000000000000000000",
      summary: "lorem ipsum",
      amount: "5",
    },
  ]

  const renderProjects = (arr, index) => {
    return(
    <div className="col-md-6 my-2" key={index}>
      <div className="card" style={{minWidth: "18rem", borderRadius: "5px"}}>
        <div className="card-body">
          <h5 className="card-title" style={{maxWidth:"calc(100% - 100px)"}}>{arr.name}</h5>
          <h5 style={{position:"absolute", right:"25px", top:"15px"}}>10 BNB</h5>
          <h6 className="card-subtitle mb-2 text-light">Posted by: {arr.creator}</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to="detail" className="btnYellow">Details</Link>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className='allProjects py-5'>
      <h2>All Projects</h2>
      <div className="row my-5">
        {arr.map(renderProjects)}
      </div>
    </div>
  )
}
