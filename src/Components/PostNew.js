import React, { useState } from "react";
import ProjectDataService from "../services/projects";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

export default function PostNew() {
  // ALERT
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  // FORM POST
  const [formData, setFormData] = useState({
    title: "",
    wallet: "",
    contact: "",
    summary: "",
    about: "",
  });

  function handleChange(e) {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }
  console.log(formData)

  function handleSubmit(e) {
    e.preventDefault();
    ProjectDataService.createProject(JSON.stringify(formData))
      .then((response) => {
        console.log(response);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setFailed(true);
      });
  }


  return (
    <div className="postContainer py-5 px-3">
      {/* SUCCESS ALERT */}
      {success && <div className="toast-container" style={{position: "absolute", top: "100px", right: "25px"}}>
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header alert-success">
            <FaCheck color="green" />&nbsp;&nbsp;
            <strong className="me-auto text-success">SUCCESS</strong>
            <small className="text-muted"></small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body text-success">Project posted successfully!</div>
        </div>
      </div>}
      {/* FAILED ALERT */}
      {failed && <div className="toast-container" style={{position: "absolute", top: "100px", right: "25px"}}>
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header alert-success">
            <FaExclamationTriangle color="red" />&nbsp;&nbsp;
            <strong className="me-auto text-danger">FAILED</strong>
            <small className="text-muted"></small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body text-danger">Project failed to submit!</div>
        </div>
      </div>}

      <h2>Post New Project</h2>
      <div className="container">
        <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputWallet" className="form-label">
              Wallet Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="wallet"
              value={formData.wallet}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputContact" className="form-label">
              Contact Info:
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={formData.contact}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSummary" className="form-label">
              Short summary:
            </label>
            <input
              type="text"
              className="form-control"
              id="summary"
              value={formData.summary}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Description:
            </label>
            <textarea
              type="text"
              className="form-control"
              id="about"
              value={formData.about}
              onChange={(e) => handleChange(e)}
              rows={5}
              required
            />
          </div>
          <h4 className="mt-5 mb-0">Checkpoints</h4>
          <div className="col-md-8">
            <label htmlFor="inputCity" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputZip" className="form-label">
              BNB
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
          <button
            className="btn btn-outline-warning ms-2"
            style={{ maxWidth: "250px" }}
          >
            Add Checkpoints
          </button>
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
