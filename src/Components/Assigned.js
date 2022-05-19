import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAssigneeProjects } from "../web3/Web3Client"
import ProjectDataService from "../services/projects";

export default function Assigned({ add }) {

  const [assignee, setAssignee] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(async() => {
    // _assigneeProjects();
    // retrieveProjects();
    let _assignee = await getAssigneeProjects(add);
    setAssignee(_assignee)

    ProjectDataService.getAll()
      .then(response => {
        setProjects(response.data);
        // console.log(projects)
      })
      .catch(err => {
        console.log(err);
      });
  }, [add])

  // FETCH ASSIGNED PROJECT IDs
  // const _assigneeProjects = async () => {
  //   console.log("Address: " + add)
  //   let _assignee = await getAssigneeProjects(add);
  //   setAssignee(_assignee)
  // }
  // console.log(assignee)
  // const retrieveProjects = () => {
  //   ProjectDataService.getAll()
  //     .then(response => {
  //       setProjects(response.data);
  //       // console.log(projects)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  const filterProject = () => {

  }

  const renderProjects = (projects, index) => {
    return (
      <div className="col-md-6 my-2" key={index}>
        <div className="card" style={{ minWidth: "18rem", borderRadius: "5px" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ maxWidth: "calc(100% - 100px)" }}>{projects.name}</h5>
            <h5 style={{ position: "absolute", right: "25px", top: "15px" }}>{projects.cost} BNB</h5>
            <h6 className="card-subtitle mb-2 text-light">Posted by: {projects.wallet ? projects.wallet.slice(0, 10) + "..." + projects.wallet.slice(-8) : ""}</h6>
            <p className="card-text">{projects.summary}</p>
            <Link to={{ pathname: `/project/${projects._id.$oid.toString()}`, state: { id: projects._id.$oid.toString() } }} className="btnYellow">Details</Link>
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
          {projects.map(renderProjects)}
        </div>
      }
    </div>
  )
}
