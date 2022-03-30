import React from "react";

export default function DummyInterest() {
  const arrInterest = [
    {
      name: "John",
      experience: "5 Months",
      wallet: "0x7yub753hiu239yfhy46u",
    },
    {
      name: "Tom",
      experience: "14 Months",
      wallet: "0xuehyl53hiu239yfhy85g",
    },
    {
      name: "Bob",
      experience: "1 Month",
      wallet: "0x80tyl53hiu239yfhyth7",
    },
  ];

  const renderInterest = (arrInterest, index) => {
    return (
      <div className="card my-4" key={index}>
        <div className="card-header text-light fw-bold">Name: {arrInterest.name}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Experience: {arrInterest.experience}</p>
            <footer className="blockquote-footer">
              Wallet Address: <cite title="Source Title">{arrInterest.wallet}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  };

  return <div className="dummyInterest">
      {arrInterest.map(renderInterest)}
  </div>;
}
