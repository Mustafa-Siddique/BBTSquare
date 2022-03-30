import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import Checkpoints from './Checkpoints';
import DummyInterest from './DummyInterest';
import AssignedModal from './Modal';

export default function ProjectDetail() {

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='projectDetails py-5 px-3'>
        <h1 className='text-light'>Project Name</h1>
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
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum assumenda ex incidunt mollitia! Pariatur, expedita. Enim nostrum quaerat dolore fugiat libero earum temporibus unde optio sapiente pariatur laboriosam, perferendis quia?</td>
            </tr>
            <tr>
              <th>Posted On:</th>
              <td>Jan 30, 2022, 11:04 AM UTC</td>
            </tr>
          </tbody>
        </table>
        <Button variant="warning" onClick={() => setModalShow(true)}>
          Show Your Interest
        </Button>
        <AssignedModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <div className="container my-5">
          <h4 className='text-light'>Checkpoints:</h4>
          <Checkpoints/>
        </div>
        <div className="container">
          <h4 className='text-light'>Recent Interests</h4>
          <DummyInterest/>
        </div>
        </div>
    </div>
  )
}
