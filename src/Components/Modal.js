import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import ProjectDataService from "../services/projects";
import {BsFillExclamationTriangleFill, BsFillCloudCheckFill} from "react-icons/bs"

export default function AssignedModal(props) {
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [disable, setDisable] = useState(false)

  const [interestData, setInterestData] = useState({
    name: "",
    experience: "",
    portfolio: "",
    wallet: "",
    project_id: id,
  });
  function handleChange(e) {
    const newData = { ...interestData };
    newData[e.target.id] = e.target.value;
    setInterestData(newData);
  }
  console.log(interestData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    ProjectDataService.createInterest(JSON.stringify(interestData))
      .then(async (response) => {
        setIsSuccess(true)
        console.log(
          `Inserted Document ID is: ${response.data.insertedId.$oid}`
        );
      })
      .catch((err) => {
        setIsFailed(true)
        console.log(err);
      });
  };

  return (
    <div className="assignedModal">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Show Your Interest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={interestData.name}
                onChange={(e) => handleChange(e)}
                placeholder="Your Name (as Registered on BoobyTrap)"
                required
              />
              {/* <Form.Text className="text-muted">
                <Link style={{ color: "#ffcc00" }} to="/register">
                  Register Yourself
                </Link>
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="number"
                value={interestData.experience}
                onChange={(e) => handleChange(e)}
                placeholder="Experience (in Months)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="portfolio">
              <Form.Label>Portfolio Link/Previous Work</Form.Label>
              <Form.Control
                type="url"
                placeholder="Link to Your Portfolio/Previous Work"
                required
                value={interestData.portfolio}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wallet">
              <Form.Label>Wallet Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wallet Address"
                required
                value={interestData.wallet}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            {isSuccess && <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <BsFillCloudCheckFill size={24}/>&nbsp;
              <div>Submitted successfully!</div>
            </div>}
            {isFailed && <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <BsFillExclamationTriangleFill size={24}/>&nbsp;
              <div>Submission failed!</div>
            </div>}
            <Button variant="warning" disabled={disable} type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
