import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Checkpoints from "./Checkpoints";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import ProjectDataService from "../services/projects";
import Moment from "react-moment";
import Web3 from "web3";
import objectHash from "object-hash";
import { offerProject, revoke } from "../web3/Web3Client";
import { verifyProject } from "../web3/Web3Client";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillExclamationTriangleFill, BsFillCloudCheckFill } from 'react-icons/bs'
const web3 = new Web3(window.ethereum);

export default function MyProjectDetails({ add }) {
  const { id } = useParams();
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
  const [offerData, setOfferData] = useState({
    cost: "",
    _id: "0x" + id,
    assigneeWallet: "",
    instructions: ""
  });

  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setProject(response.data[0]);
        setOfferData({
          cost: response.data[0].cost, _id: "0x" + id,
          assigneeWallet: "",
          instructions: ''
        })
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


  useEffect(async () => {
    getProject(id);
    await verifyData(id);
  }, [id]);

  const [blockchainData, setBlockchainData] = useState();
  const [assignee, setAssignee] = useState("");

  const verifyData = async (id) => {
    const blockchainData = await verifyProject("0x" + id);
    setBlockchainData(blockchainData);
  };

  console.log("data", blockchainData, dataHash);

  // ALERTS
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  // OFFER FORM
  console.log(project.cost)

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

  // Revoke PROJECT
  const [showDel, setShowDel] = useState(false);
  const handleDelClose = () => setShowDel(false);
  const handleDelShow = () => setShowDel(true);
  const revokeProject = async() => {
    const revokeData = await revoke("0x" + id);
    console.log(revokeData)
  }

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
              <td>
                {(() => {
                  if (
                    blockchainData &&
                    blockchainData[1] !==
                    "0x0000000000000000000000000000000000000000"
                  ) {
                    return blockchainData[1];
                  } else if (
                    assignee &&
                    assignee !== "0x0000000000000000000000000000000000000000"
                  ) {
                    return assignee;
                  } else {
                    return "Unassigned";
                  }
                })()}</td>
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

              {success && <div
                className="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <BsFillCloudCheckFill size={24} />&nbsp;
                <div>Offered successfully!</div>
              </div>}
              {failed && <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <BsFillExclamationTriangleFill size={24} />&nbsp;
                <div>Submission failed!</div>
              </div>}
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
          onClick={handleDelShow}
        >
          Revoke
        </Button>
        <Modal show={showDel} onHide={handleDelClose}>
          {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
          <Modal.Body className="text-warning fs-5">
            Do you really wish to revoke this project?
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" className="m-1" onClick={handleDelClose}>
                Don't Revoke
              </Button>
              <Button variant="warning" className="m-1" onClick={() => revokeProject()}>
                Revoke
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* DELETE PROJECT */}
        {/* <Button
          variant="outline-danger"
          className="ms-3"
          disabled={add !== undefined ? false : true}
          onClick={handleDelShow}
        >
          Delete Project
        </Button> */}

        <div className="container my-5">
          <h4 className="text-light">Milestones:</h4>
          <span>(This will only be visible to parties contracting)</span>
          <Checkpoints milestones={project.checkpoints} rewards={project.rewards} stat={blockchainData} />
        </div>
      </div>
    </div>
  );
}
