import React, { useState } from "react";

export default function PostNew() {

  // const [checkpointCount, setCheckpointCount] = useState(1)

  // [...Array(checkpointCount)].map((elementInArray, index) => ( 
  //   <div className="" key={i}> Whatever needs to be rendered repeatedly </div> 
  //   ) 
// )

  return (
    <div className="postContainer py-5 px-3">
      <h2>Post New Project</h2>
      <div className="container">
        <form className="row g-3">
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
            />
          </div>
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">
              Wallet Address:
            </label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">
              Contact Info:
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="col-12">
            <label for="inputAddress2" className="form-label">
              Short summary:
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
            />
          </div>

          <div className="col-12">
            <label for="inputAddress2" className="form-label">
              Description:
            </label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress2"
              rows={5}
            />
          </div>
          <h4 className="mt-5 mb-0">Checkpoints</h4>
          <div className="col-md-8">
            <label for="inputCity" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label for="inputZip" className="form-label">
              BNB
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
          <button className="btn btn-outline-warning ms-2" style={{maxWidth:"250px"}}>Add Checkpoints</button>
          <div className="col-12">
            <button type="submit" className="btnYellow mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
