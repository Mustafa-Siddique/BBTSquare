import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { milestone } from "../web3/Web3Client";

export default function Checkpoints({ milestones, rewards, stat }) {
  let arrData = { checkpoints: '', rewards: '', stat: '' }
  const [Data, setData] = useState([])
  const _id = useParams()

  useEffect(() => {
    let arr = []
    if (stat) {
      for (let i = 0; i < milestones.length; i++) {
        arr.push({ checkpoints: milestones[i], rewards: rewards[i], stat: stat[4][i] })
      }
      setData(arr)
    }
  }, [stat])

  const checkpointRelease = async(e) => {
    const releaseStat = await milestone("0x" + _id.id, e)
    console.log(releaseStat)
  }

  const [paid, setPaid] = useState(false);
  const renderMiles = (Data, index) => {
    return (<tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{Data.checkpoints}</td>
      <td>{Data.rewards}</td>
      <td>
        {(() => {
          if (window.location.pathname.includes("/myprojects/")) {
            return(<button
              className={
                Data.stat === false
                  ? "btn btn-outline-warning"
                  : "btn btn-success"
              }
              onClick={() => checkpointRelease(index)}
            >
              {paid === false ? "Release Payment" : "Released"}
            </button>)
          } else {
            return (
              Data.stat === true ? 
              "Released" : "Not Completed Yet"
            )
          }
        })()}
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
