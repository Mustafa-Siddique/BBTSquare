import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Checkpoints from "./Checkpoints";
import DummyInterest from "./DummyInterest";
import AssignedModal from "./Modal";
import OfferModal from "./OfferModal";
import ProjectDataService from "../services/projects";
import { useParams } from "react-router-dom";
import objectHash from "object-hash";
import Moment from "react-moment";
import { verifyProject } from "../web3/Web3Client";
// Moment.globalFormat = 'DD MMM YYYY';

export default function ProjectDetail(props) {
  const initialProjectState = {
    id: null,
    title: "",
    about: "",
    interests: [],
    date: undefined,
  };

  const [project, setProject] = useState(initialProjectState);
  const [dataHash, setDataHash] = useState({});
  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setProject(response.data[0]);
        setDataHash(objectHash({ "title": project.title,  "wallet": project.wallet,  "contact": project.contact,  "cost": project.cost,  "summary": project.summary,  "about": project.about,  "checkpoints": project.checkpoints,  "rewards": project.rewards}))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { id } = useParams();

  useEffect(() => {
    getProject(id);
    verifyData(id);
  }, [id]);

  const [blockchainData, setBlockchainData] = useState({})
  const verifyData = async (id) => {
    const blockchainData = await verifyProject("0x" + id);
    setBlockchainData(blockchainData)
  }
  console.log(blockchainData)

  const [modalShow, setModalShow] = useState(false);
  const [offer, setOffer] = useState(false);
  return (
    <div className="projectDetails py-5 px-3">
      <h1 className="text-light">{project.title}</h1>
      <p>0x{dataHash}</p>
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
              <td>{blockchainData[0] !== undefined ?
                blockchainData[0] : (
                "Loading..."
              )}</td>
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
                {blockchainData[5] !== undefined ? (
                  <Moment unix>{blockchainData[5]}</Moment>
                ) : (
                  "Loading..."
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant="warning" onClick={() => setModalShow(true)}>
          Show Your Interest
        </Button>
        <AssignedModal show={modalShow} onHide={() => setModalShow(false)} />
        <OfferModal show={offer} onHide={() => setModalShow(false)} />
        <div className="container mt-5">
          <h4 className="text-light">Recent Interests</h4>
          {project.interests.length < 1 ? (
            <p>No Interest Yet</p>
          ) : (
            <DummyInterest interest={project.interests} />
          )}
          {/* <DummyInterest interest={project.interests} /> */}
        </div>
      </div>
    </div>
  );
}
