import React from 'react'

export default function ProjectDetail() {
  return (
    <div className='projectDetails py-5 px-3'>
        <h1>Project Name</h1>
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
              <td>Creator Name &amp; Creator Wallet</td>
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
              <td>DATE</td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  )
}
