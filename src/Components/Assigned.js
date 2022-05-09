import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAssignee } from "../web3/Web3Client"
import ProjectDataService from "../services/projects";

export default function Assigned({ add }) {

  const [arr, setArr] = useState([])
  const [assignee, setAssignee] = useState("")

  useEffect( () => {
    retrieveProjects();
  }, [])
  console.log(arr)
  const retrieveProjects = () => {
    ProjectDataService.getAll()
    .then(response => {
      setArr(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // useEffect(() => {
  //   Assignee()
  // }, [])
  
  // const Assignee = async() => {
  //   const _assignee = await getAssignee("0x" + id);
  //   setAssignee(_assignee)
  // }

  const renderProjects = (arr, index) => {
    return (
      <div className="col-md-6 my-2" key={index}>
        <div className="card" style={{ minWidth: "18rem", borderRadius: "5px" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ maxWidth: "calc(100% - 100px)" }}>{arr.name}</h5>
            <h5 style={{ position: "absolute", right: "25px", top: "15px" }}>10 BNB</h5>
            <h6 className="card-subtitle mb-2 text-light">Posted by: {arr.creatorWallet}</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to="/myassignments/assigned" className="btnYellow">Details</Link>
            <Link to="/" className="btnYellow ms-3">Accept Offer</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='assignedContainer py-5 px-3'>
      <h2>Assigned to me</h2>
      <div className="row my-5">
        {arr.map(renderProjects)}
      </div>
    </div>
  )
}
