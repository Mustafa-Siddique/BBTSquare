import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Checkpoints from "./Checkpoints";
import Form from "react-bootstrap/Form";

export default function MyProjectDetails() {
  const [modalOffer, setModalOffer] = useState(false);
  const [modalRevoke, setModalRevoke] = useState(false);

  return (
    <div className="MyProjectDetailContainer py-5 px-3">
      <h1 className="text-light">Project Name</h1>
      <p>ID: xxxxxxxxxxxxxxxx</p>

      <div className="container">
        <table className="table" id="skills">
          <tbody>
            <tr>
              <th>Total Reward:</th>
              <td>10 BNB</td>
            </tr>
            <tr>
              <th>Creator:</th>
              <td>0x00000000000000000000</td>
            </tr>
            <tr>
              <th>Assigned to:</th>
              <td>Unassigned</td>
            </tr>
            <tr>
              <th>About:</th>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                assumenda ex incidunt mollitia! Pariatur, expedita. Enim nostrum
                quaerat dolore fugiat libero earum temporibus unde optio
                sapiente pariatur laboriosam, perferendis quia?
              </td>
            </tr>
            <tr>
              <th>Posted On:</th>
              <td>Jan 30, 2022, 11:04 AM UTC</td>
            </tr>
          </tbody>
        </table>

        <Button variant="warning" onClick={() => setModalOffer(true)}>
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
          onClick={() => setModalRevoke(true)}
        >
          Revoke
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
