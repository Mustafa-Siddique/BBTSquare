import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAssigneeProjects } from "../web3/Web3Client"
import ProjectDataService from "../services/projects";

export default function Assigned({ add }) {

  const [assignee, setAssignee] = useState(undefined)
  const [projects, setProjects] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(async () => {
    let _assignee = await getAssigneeProjects(add);
    setAssignee(_assignee);

    ProjectDataService.getAll()
      .then(response => {
        setProjects(response.data);
        // console.log(projects)
      })
      .catch(err => {
        console.log(err);
      });

    if (assignee) {
      // Looping the array of assignee  project IDs
      for (let index = 0; index < assignee.length; index++) {

        // Looping the array of All Projects
        for (let i = 0; i < projects.length; i++) {
          if (assignee[index].slice(2) === projects[i]._id) {
            filtered[index] = projects[i]
          }
        }
      }
    }
  }, [add])
  console.log(assignee);

  const renderProjects = (filtered, index) => {
    return (
      <div className="col-md-6 my-2" key={index}>
        <div className="card" style={{ minWidth: "18rem", borderRadius: "5px" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ maxWidth: "calc(100% - 100px)" }}>{filtered.title}</h5>
            <h5 style={{ position: "absolute", right: "25px", top: "15px" }}>{filtered.cost} BNB</h5>
            <h6 className="card-subtitle mb-2 text-light">Posted by: {filtered.wallet ? filtered.wallet.slice(0, 10) + "..." + filtered.wallet.slice(-8) : ""}</h6>
            <p className="card-text">{filtered.summary}</p>
            <Link to={{ pathname: `/project/${filtered._id.toString()}`, state: { id: filtered._id.toString() } }} className="btnYellow">Details</Link>
            {/* <Link to="/" className="btnYellow ms-3">Accept Offer</Link> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='assignedContainer py-5 px-3'>
      <h2>Assigned to me</h2>
      {assignee && assignee.length === 0 ?
        <h3 className='mt-5'>No data available to show</h3>
        :
        <div className="row my-5">
          {filtered.map(renderProjects)}
        </div>
      }
    </div>
  )
}
