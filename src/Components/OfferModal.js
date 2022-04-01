import React from 'react'
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function OfferModal(props) {
  return (
    <div>
      <Modal
        {...props}
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
              <Form.Control type="text" placeholder="Wallet Address" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicWA">
              <Form.Label>Instructions</Form.Label>
              <Form.Control type="text" placeholder="Instruction for Service Provider" required />
            </Form.Group>

            <Button variant="warning" type="submit">
              Submit
            </Button>
          <Button variant="warning" className='ms-3' onClick={props.onHide}>Revoke</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
