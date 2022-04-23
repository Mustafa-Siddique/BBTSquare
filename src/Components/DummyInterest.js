import React, { useEffect, useState } from "react";

export default function DummyInterest(props) {
  const [interests, setInterests] = useState([])

  useEffect( () => {
    setInterests(props.interest);
  }, [props.interest])

  const renderInterest = (interests, index) => {
    return (
      <div className="card my-4" key={index}>
        <div className="card-header text-light fw-bold">Name: {interests.name}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Experience: {interests.experience}</p>
            <footer className="blockquote-footer">
              Wallet Address: <cite title="Source Title">{interests.wallet}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  };

  return <div className="dummyInterest">
      {interests.map(renderInterest)}
  </div>;
}
