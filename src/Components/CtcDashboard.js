import React, { useState } from "react";

import { axiosPost } from "../axios";
import { useToast } from "../utils/Toast";
import SearchId from "./SearchId";

const CtcDashboard = props => {
  const toast = useToast();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [layout, setlayout] = useState(0);

  const handleSubmit = e => {
    const regData = { name, email, password, passwordConfirm };
    axiosPost("users/", regData, true)
      .then(res => {
        setname("");
        setemail("");
        setpassword("");
        setpasswordConfirm("");
        props.history.push("/security");
      })
      .catch(err => {
        toast.add("Something went wrong while registering user", "fail");
        console.log(err);
      });
    e.preventDefault();
  };

  const handleLayout = value => {
    setlayout(value);
  };

  return (
    <div>
      <div className="text-center">
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${!layout
            ? "btn-outline-info"
            : "btn-info"}`}
          onClick={() => handleLayout(0)}
        >
          Search ID
        </button>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${layout
            ? "btn-outline-info"
            : "btn-info"}`}
          onClick={() => handleLayout(1)}
        >
          Register Security Team member
        </button>
      </div>
      {layout
        ? <form className="end-user-form mt-3" onSubmit={handleSubmit}>
            <h2 className="text-center">Register Security Team Member</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
                onChange={e => setname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={e => setemail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={e => setpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                onChange={e => setpasswordConfirm(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register User
            </button>
          </form>
        : <div className="mt-3">
            <SearchId />
          </div>}
    </div>
  );
};

export default CtcDashboard;
