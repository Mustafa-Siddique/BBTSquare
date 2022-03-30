import React from 'react'
import { Chrono } from "react-chrono";

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

  return (
    <div className='my-4'>
        <Chrono items={data} mode="HORIZONTAL" />
    </div>
  )
}
