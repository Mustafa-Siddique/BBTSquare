import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Checkpoints from "./Checkpoints";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import ProjectDataService from "../services/projects";
import Moment from "react-moment";
import Web3 from "web3";
import objectHash from "object-hash";
import { offerProject } from "../web3/Web3Client";
import { verifyProject } from "../web3/Web3Client";
import { FaCheckCircle } from "react-icons/fa";
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
  const [dataHash, setDataHash] = useState();

  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setProject(response.data[0]);
        setDataHash(
          objectHash({
            title: response.data[0].title,
            wallet: response.data[0].wallet,
            contact: response.data[0].contact,
            cost: response.data[0].cost,
            summary: response.data[0].summary,
            about: response.data[0].about,
            checkpoints: response.data[0].checkpoints,
            rewards: response.data[0].rewards,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { id } = useParams();

  useEffect(async () => {
    getProject(id);
    await verifyData(id);
  }, [id]);

  const [blockchainData, setBlockchainData] = useState();

  const verifyData = async (id) => {
    const blockchainData = await verifyProject("0x" + id);
    setBlockchainData(blockchainData);
  };

  console.log("data", blockchainData, dataHash);

  // ALERTS
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  // OFFER FORM
  const [offerData, setOfferData] = useState({
    cost: "",
    _id: "0x"+id,
    assigneeWallet: "",
    instructions: ""
  });
  const { cost, _id, assigneeWallet, instructions } = offerData;
  function handleOfferChange(e) {
    const newData = { ...offerData };
    newData[e.target.id] = e.target.value;
    setOfferData(newData);
  }
  console.log(offerData);

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    const data = await offerProject(
      offerData.cost,
      offerData._id,
      offerData.assigneeWallet,
      offerData.instructions
    );
    if (data.status) {
      setSuccess(true);
    } else {
      setFailed(true);
    }
  };

  // DELETE PROJECT
  const [showDel, setShowDel] = useState(false);

  const handleDelClose = () => setShowDel(false);
  const handleDelShow = () => setShowDel(true);

  return (
    <div className="MyProjectDetailContainer py-5 px-3">
      <h1 className="text-light">{project.title}</h1>
      {blockchainData && dataHash ? (
        <p>
          {" "}
          {"0x" + dataHash === blockchainData[2] ? (
            <span className="text-success">
              <FaCheckCircle size={20} /> 0x{dataHash}
            </span>
          ) : (
            <span className="text-danger">
              Hash does not match.
              <br />
              Data has been possibly tempered with or deleted by someone. Only
              the created by address, assignee addresses, posted on date and
              time, checkpoint rewards and checkpoints completion status are
              secure and trustable. If you posted this project then delete it to
              get any remaining reward held in the smart contract back.
            </span>
          )}
        </p>
      ) : (
        ""
      )}
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
              <td>
                {blockchainData && blockchainData[0] !== undefined
                  ? blockchainData[0]
                  : "Loading..."}
              </td>
            </tr>
            <tr>
              <th>Assigned to:</th>
              <td>Undefined</td>
            </tr>
            <tr>
              <th>About:</th>
              <td>{project.about}</td>
            </tr>
            <tr>
              <th>Posted On:</th>
              <td>
                {blockchainData && blockchainData[5] !== undefined ? (
                  <Moment unix>{blockchainData[5]}</Moment>
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
            <Form onSubmit={(e) => handleOfferSubmit(e)}>
              <Form.Group className="mb-3" controlId="cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Project Total Cost"
                  value={offerData.cost}
                  onChange={(e) => handleOfferChange(e)}
                  required
                />
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="instructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Instructions for Service Provider"
                  value={offerData.instructions}
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

        {/* DELETE PROJECT */}
        <Button
          variant="outline-danger"
          className="ms-3"
          disabled={add !== undefined ? false : true}
          onClick={handleDelShow}
        >
          Delete Project
        </Button>
        <Modal show={showDel} onHide={handleDelClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="text-light">Do you really wish to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
