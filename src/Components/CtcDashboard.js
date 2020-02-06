import React, { useState } from "react";

import { axiosGet, axiosPost } from "../axios";
import { useToast } from "../utils/Toast";

const CtcDashboard = props => {
  const toast = useToast();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [search, setsearch] = useState("");
  const [layout, setlayout] = useState(0);
  const [res, setres] = useState([]);

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

  const handleSearch = e => {
    axiosGet(`reg/${search}`)
      .then(res => {
        setres(res.data.data.registraions);
        document.getElementById("search-input").value = "";
      })
      .catch(err => {
        console.log(err);
        toast.add("No Registration found!!!", "fail");
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
            <form className="input-group mb-3" onSubmit={handleSearch}>
              <input
                type="text"
                id="search-input"
                className="form-control"
                placeholder="Search..."
                onChange={e => setsearch(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-info" type="submit">
                  Search
                </button>
              </div>
            </form>
            {res.map((item, index) => {
              return (
                <div className="id-box mt-4" key={index}>
                  <p>
                    Name: <span>{item.name}</span>
                  </p>
                  <p>
                    Email: <span>{item.email}</span>
                  </p>
                  <p>
                    Admission Number: <span>{item.admissionNo}</span>
                  </p>
                  {item.zealID
                    ? <p>
                        Zeal ID: <span>{item.zealID}</span>
                      </p>
                    : <p>
                        Temp ID: <span>{item.tempID}</span>
                      </p>}
                </div>
              );
            })}
          </div>}
    </div>
  );
};

export default CtcDashboard;
