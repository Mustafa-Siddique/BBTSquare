import React, { Fragment, useEffect, useState } from "react";
import ProjectDataService from "../services/projects";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import objectHash from "object-hash";
import { getBBTContract, getAddress, AddProject } from "../web3/Web3Client";
import Web3 from "web3";
const web3 = new Web3(window.ethereum);

export default function PostNew({ add }) {
  // ALERT
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  // FORM POST
  const [formData, setFormData] = useState({
    title: "",
    cost: "",
    contact: "",
    wallet: add,
    summary: "",
    about: "",
    checkpoints: [""],
    rewards: [""],
  });

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { title, cost, summary, about, contact, checkpoints, rewards } =
    formData;

  function handleChange(e) {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    ProjectDataService.createProject(JSON.stringify(formData))
      .then(async (response) => {
        setSubmitDisabled(true);
        const dataHash = objectHash(formData);
        console.log(
          `Inserted Document ID: ${response.data.insertedId.$oid} & Generated Object Hash is: ${dataHash}`
        );
        const data = await AddProject(
          "0x" + response.data.insertedId.$oid,
          "0x" + dataHash,
          rewards.map((reward) => web3.utils.toWei("" + reward, "ether"))
        );
        if (data.status) {
          setSuccess(true);
          setSubmitDisabled(true);
        } else {
          setFailed(true);
        }
        //   .once("transactionHash", (hash) => {
        //     setSuccess(true);
        //     console.log(hash);
        // })
        // .once("receipt", (receipt) => {
        //     console.log(receipt);
        //     setSubmitDisabled(true);
        // }).catch((error)=>{
        //     console.log(error.message)
        //     setSubmitDisabled(false);
        // });
      })
      .catch((err) => {
        console.log(err);
        setFailed(true);
      });
  };
  console.log(success, failed);
  const editCheckpoint = (e, ind) => {
    let newCheckpoints = [...checkpoints];
    newCheckpoints[ind] = e.target.value;
    setFormData({ ...formData, checkpoints: newCheckpoints });
  };
  const editReward = (e, ind) => {
    let newRewards = [...rewards];
    newRewards[ind] = e.target.value;
    setFormData({ ...formData, rewards: newRewards });
  };
  const addCheckpoint = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      checkpoints: [...checkpoints, ""],
      rewards: [...rewards, ""],
    });
  };
  const removeCheckpoint = (e, ind) => {
    e.preventDefault();
    setFormData({
      ...formData,
      checkpoints: checkpoints.filter((_, i) => i !== ind),
      rewards: rewards.filter((_, i) => i !== ind),
    });
  };

  return (
    <div className="postContainer py-5 px-3">
      {/* SUCCESS ALERT */}
      {success && (
        <div
          className="toast-container"
          style={{ position: "absolute", top: "100px", right: "25px" }}
        >
          <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header alert-success">
              <FaCheck color="green" />
              &nbsp;&nbsp;
              <strong className="me-auto text-success">SUCCESS</strong>
              <small className="text-muted"></small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setSuccess(!success)}
              ></button>
            </div>
            <div className="toast-body text-success">
              Project posted successfully!
            </div>
          </div>
        </div>
      )}
      {/* FAILED ALERT */}
      {failed && (
        <div
          className="toast-container"
          style={{ position: "absolute", top: "100px", right: "25px" }}
        >
          <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header alert-success">
              <FaExclamationTriangle color="red" />
              &nbsp;&nbsp;
              <strong className="me-auto text-danger">FAILED</strong>
              <small className="text-muted"></small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={setFailed(!failed)}
              ></button>
            </div>
            <div className="toast-body text-danger">
              Project failed to submit!
            </div>
          </div>
        </div>
      )}

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
            <label htmlFor="inputCost" className="form-label">
              Total cost:
            </label>
            <input
              type="number"
              className="form-control"
              id="cost"
              value={formData.cost}
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
          {checkpoints.map((item, ind) => (
            <div className="row g-3" key={ind}>
              <div className="col-md-7">
                <label htmlFor="checkpoints" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={item}
                  required
                  id="checkpoints"
                  onChange={(e) => {
                    editCheckpoint(e, ind);
                  }}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="rewards" className="form-label">
                  BNB
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rewards"
                  value={rewards[ind]}
                  min="0"
                  step="0.000000000000000001"
                  required
                  onChange={(e) => editReward(e, ind)}
                />
              </div>
              {ind !== 0 && (
                <div className="col-md-1 align-items-end justify-content-center d-flex">
                  <button
                    className="btn btn-outline-danger"
                    value="Delete"
                    onClick={(e) => {
                      removeCheckpoint(e, ind);
                    }}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            className="btn btn-outline-warning ms-2"
            style={{ maxWidth: "250px" }}
            onClick={(e) => addCheckpoint(e)}
          >
            Add Checkpoints
          </button>
          <div className="col-12">
            {add !== undefined ? (
              <button
                type="submit"
                className="btnYellow mt-3"
                disabled={submitDisabled}
              >
                {submitDisabled ? "Submitting..." : "Submit"}
              </button>
            ) : (
              <button className="btnYellow mt-3">Wallet not connected</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
