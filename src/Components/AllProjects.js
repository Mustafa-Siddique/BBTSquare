import React from 'react'

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
    <div className="col-md-4" key={index}>
      <div className="card" style="width: 18rem;">
        <div className="card-body">
          <h5 className="card-title text-danger">{console.log(arr.name)}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    </div>
  }

  return (
    <div className='allProjects'>
      <h2>All Projects</h2>
      <div className="row">
        {arr.map(renderProjects)}
      </div>
    </div>
  )
}
