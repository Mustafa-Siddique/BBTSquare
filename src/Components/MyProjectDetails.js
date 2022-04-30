import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Checkpoints from "./Checkpoints";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import ProjectDataService from "../services/projects";
import Moment from "react-moment";
import Web3 from "web3";
import { offerProject } from "../web3/Web3Client";
const web3 = new Web3(window.ethereum);

export default function MyProjectDetails({ add }) {
  const [modalOffer, setModalOffer] = useState(false);
  const [modalRevoke, setModalRevoke] = useState(false);

  const initialProjectState = {
    id: null,
    title: "",
    about: "",
    interests: [],
    date: undefined,
  };
  const [project, setProject] = useState(initialProjectState);

  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setProject(response.data[0]);
        console.log(project);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { id } = useParams();

  useEffect(() => {
    getProject(id);
  }, [id]);

  // ALERTS
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  // OFFER FORM
  const _cost = project.cost
  console.log(_cost)
  const [offerData, setOfferData] = useState({
    cost: _cost,
    _id: id,
    assigneeWallet: "",
    instruction: "",
  });
  const { cost, _id, assigneeWallet, instruction } = offerData;
  function handleOfferChange(e) {
    const newData = { ...offerData };
    newData[e.target.id] = e.target.value;
    setOfferData(newData);
  }
  console.log(offerData)
  
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    const data = await offerProject(
      offerData.cost,
      "0x" + id,
      offerData.wallet,
      offerData.instruction
    );
    if (data.status) {
      setSuccess(true);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="MyProjectDetailContainer py-5 px-3">
      <h1 className="text-light">{project.title}</h1>
      <p>ID: {"0x" + id}</p>

      <div className="container">
        <table className="table" id="skills">
          <tbody>
            <tr>
              <th>Total Reward:</th>
              <td>{project.cost} BNB</td>
            </tr>
            <tr>
              <th>Creator:</th>
              <td>{project.wallet}</td>
            </tr>
            <tr>
              <th>Assigned to:</th>
              <td>Unassigned</td>
            </tr>
            <tr>
              <th>About:</th>
              <td>{project.about}</td>
            </tr>
            <tr>
              <th>Posted On:</th>
              <td>
                {project.date !== undefined ? (
                  <Moment unix>{project.date.$date.$numberLong / 1000}</Moment>
                ) : (
                  "Loading..."
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          variant="warning"
          disabled={add !== undefined ? false : true}
          onClick={() => setModalOffer(true)}
        >
          Offer Project
        </Button>
        {/* OFFER MODAL */}
        <Modal
          show={modalOffer}
          onHide={() => setModalOffer(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Offer Project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="assigneeWallet">
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wallet Address"
                  value={offerData.assigneeWallet}
                  onChange={(e) => handleOfferChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="instruction">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Instructions for Service Provider"
                  value={offerData.instruction}
                  onChange={(e) => handleOfferChange(e)}
                  required
                />
              </Form.Group>

              <Button variant="warning" type="submit">
                Send Offer
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setModalOffer(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          variant="warning"
          className="ms-3"
          disabled={add !== undefined ? false : true}
          onClick={() => setModalRevoke(true)}
        >
          Revoke
        </Button>
        <Button
          variant="outline-danger"
          className="ms-3"
          disabled={add !== undefined ? false : true}
          onClick={() => setModalRevoke(true)}
        >
          Delete Project
        </Button>
        {/* REVOKE PROJECT */}
        {/* <Modal
          show={modalRevoke}
          onHide={() => setModalRevoke(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Revoke Project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicWA">
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wallet Address"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicInstruction">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Instructions for Service Provider"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 text-secondary" controlId="formBasicConfirm">
                <Form.Check
                  type="checkbox"
                  label="I agree to revoke the rights of this project from assigned service provider"
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                Revoke
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setModalRevoke(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}

        <div className="container my-5">
          <h4 className="text-light">Milestones:</h4>
          <span>(This will only be visible to parties contracting)</span>
          <Checkpoints />
        </div>
      </div>
    </div>
  );
}
