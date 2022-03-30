import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function AssignedModal(props) {
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name (as Registered on BoobyTrap)"
                required
              />
              <Form.Text className="text-muted">
                <a style={{color:"#ffcc00"}} href="">Register Yourself</a>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="number"
                placeholder="Experience (in Months)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPortfolio">
              <Form.Label>Portfolio Link/Previous Work</Form.Label>
              <Form.Control type="url" placeholder="Experience (in Months)" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicWA">
              <Form.Label>Wallet Address</Form.Label>
              <Form.Control type="text" placeholder="Wallet Address" required />
            </Form.Group>

            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
