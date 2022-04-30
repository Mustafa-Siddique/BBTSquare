import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DummyInterest(props) {
  const [interests, setInterests] = useState([])

  useEffect( () => {
    setInterests(props.interest);
  }, [props.interest])
  const { id } = useParams()

  const renderInterest = (interests, index) => {
    return (
      <div className={interests.project_id === id ? "card my-4" : "card d-none"} key={index}>
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
