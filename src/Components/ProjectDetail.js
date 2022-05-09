import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import Checkpoints from "./Checkpoints"
import DummyInterest from "./DummyInterest"
import AssignedModal from "./Modal"
import OfferModal from "./OfferModal"
import ProjectDataService from "../services/projects"
import { useParams } from "react-router-dom"
import objectHash from "object-hash"
import Moment from "react-moment"
import { FaCheckCircle } from "react-icons/fa"
import { acceptOffer, getAssignee, verifyProject } from "../web3/Web3Client"
// Moment.globalFormat = 'DD MMM YYYY'

export default function ProjectDetail({add}) {
  const initialProjectState = {
    id: null,
    title: "",
    about: "",
    interests: [],
    date: undefined,
  };

  const [project, setProject] = useState(initialProjectState)
  const [assignee, setAssignee] = useState("")
  const [dataHash, setDataHash] = useState()
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
    await Assignee(id)
  }, [id]);

  const [blockchainData, setBlockchainData] = useState();

  const verifyData = async (id) => {
    const blockchainData = await verifyProject("0x" + id);
    setBlockchainData(blockchainData);
  };
  const Assignee = async() => {
    const _assignee = await getAssignee("0x" + id);
    setAssignee(_assignee)
  }

  console.log("data", blockchainData, dataHash);

  const [modalShow, setModalShow] = useState(false);
  const [offer, setOffer] = useState(false);

  // ACCEPT OFFER
  const [acceptStat, setAcceptStat] = useState()
  const accept = async() => {
    const acceptData = await acceptOffer("0x" + id)
    if (acceptData.status === true) {
      setAcceptStat(true)
    } else {
      setAcceptStat(false)
    }
  }

  return (
    <div className="projectDetails py-5 px-3">
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
              {assignee && assignee !== "0x0000000000000000000000000000000000000000"
                  ? assignee
                  : "Unassigned"}</td>
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
        {console.log(assignee, add)}
        {assignee && assignee.toUpperCase() === add.toUpperCase() ? <Button variant="warning" onClick={() => accept()}>
          Accept Offer
        </Button>: <Button variant="warning" onClick={() => setModalShow(true)}>
          Show Your Interest
        </Button>}
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
