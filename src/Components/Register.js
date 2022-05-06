import React, {useState} from "react";

export default function Register() {

    const [text, setText] = useState("")

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

  return (
    <div className="registerContainer py-5 px-3">
      <h2 className="text-light">Register Yourself</h2>
      <form className="row mt-5 g-3">
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="inputName" placeholder="John" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCost" className="form-label">
            Average Cost
          </label>
          <input type="text" className="form-control" id="inputCost" placeholder="4 BNB" required />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Wallet Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Your BEP-20 Wallet Address"
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBio" className="form-label">
            Bio
          </label>
          <textarea
              type="text"
              className="form-control"
              onChange={handleOnChange}
              id="inputBio"
              rows={5}
              placeholder="100 words maximum"
              required
            />
        </div>
        <div className="col-12">
          <label htmlFor="inputSkills" className="form-label">
            Skills
          </label>
          <input type="text" className="form-control" id="inputSkills" required placeholder="Saperate Your Skills/Services with Commas" />
        </div>
        <div className="col-12 mt-4">
          <button type="submit" className={text.split(" ").length > 100 ? "btn btn-warning disabled" : "btn btn-warning"}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
