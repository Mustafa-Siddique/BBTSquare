import React, {useState} from 'react'

export default function Checkpoints() {

  const data = [
    {
      title: "1 BNB",
      cardTitle: "Milestone Description 1",
    },
    {
      title: "4 BNB",
      cardTitle: "Milestone Description 2",
    },
    {
      title: "5 BNB",
      cardTitle: "Milestone Description 3",
    },
  ];

  const [paid, setPaid] = useState(false)

  return (
    <div className='my-4'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Milestone</th>
            <th scope="col">Value</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Milestone 1</td>
            <td>1 BNB</td>
            <td><button className={paid === false ? 'btn btn-outline-warning' : 'btn btn-success'} onClick={() => setPaid(!paid)}>{paid === false ? "Release Payment" : "Released"}</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Milestone 2</td>
            <td>3 BNB</td>
            <td><button className='btn btn-outline-warning'>Release Payment</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Milestone 3</td>
            <td>5 BNB</td>
            <td><button className='btn btn-outline-warning'>Release Payment</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
