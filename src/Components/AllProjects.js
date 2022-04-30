import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import ProjectDataService from '../services/projects'

export default function AllProjects() {

  const [projects, setProjects] = useState([])

  useEffect( () => {
    retrieveProjects();
  }, [])

  const retrieveProjects = () => {
    ProjectDataService.getAll()
    .then(response => {
      setProjects(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  console.log(projects)
  // const refreshList = () => {
  //   retrieveProjects();
  // }
  
  const renderProjects = (projects, index) => {
    return(
      <div className="col-md-6 my-2" key={index}>
      <div className="card" style={{minWidth: "18rem", borderRadius: "5px"}}>
        <div className="card-body">
          <h5 className="card-title" style={{maxWidth:"calc(100% - 100px)"}}>{projects.title}</h5>
          <h5 style={{position:"absolute", right:"25px", top:"15px"}}>{projects.cost} BNB</h5>
          <h6 className="card-subtitle mb-2 text-light">Posted by: {projects.owner}</h6>
          <p className="card-text">{projects.summary}</p>
          <Link to={{pathname: `/project/${projects._id.$oid.toString()}`, state:{id:projects._id.$oid.toString()}}} className="btnYellow">Details</Link>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className='allProjects py-5 px-3'>
      
      <h2>All Projects</h2>
      <div className="row my-5">
        {projects.map(renderProjects)}
      </div>
    </div>
  )
}
