import React, { useEffect, useState } from "react";

export default function Checkpoints({ milestones, rewards }) {
  let arrData = { checkpoints: '', rewards: '' }
  const [Data, setData] = useState([])

  useEffect(() => {
    let arr = []
    if (milestones) {
      for (let i = 0; i < milestones.length; i++) {
        arr.push({checkpoints:milestones[i],rewards:rewards[i]})
      }
      setData(arr)
    }
  }, [milestones])

  const [paid, setPaid] = useState(false);
  const renderMiles = (Data, index) => {
    return(<tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{Data.checkpoints}</td>
      <td>{Data.rewards}</td>
      <td>
        <button
          className={
            paid === false
              ? "btn btn-outline-warning"
              : "btn btn-success"
          }
          onClick={() => setPaid(!paid)}
        >
          {paid === false ? "Request Payment" : "Released"}
        </button>
      </td>
    </tr>)
  }

  return (
    <div className="my-4">
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
          {Data.map(renderMiles)}
        </tbody>
      </table>
    </div>
  );
}
