import React, { useState, useEffect, Fragment } from "react";

import { axiosGet, axiosPost } from "../axios";
import { useToast } from "../utils/Toast";
import SearchId from "./SearchId";

const CtcDashboard = () => {
  const toast = useToast();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [layout, setlayout] = useState(0);
  const [stats, setstats] = useState([]);
  const [loading, setloading] = useState(1);
  const [submitting, setsubmitting] = useState(false);
  // register team states
  const [college, setcollege] = useState("");
  const [phone, setphone] = useState("");
  const [showID, setshowID] = useState(1);
  const [resData, setresData] = useState(null);

  const handleSubmit = e => {
    setsubmitting(true);
    const regData = { name, email, password, passwordConfirm };
    axiosPost("users/", regData, true)
      .then(res => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        toast.add("User Added Successfully!");
        setresData(res.data.data.data);
        setshowID(true);
        setsubmitting(false);
      })
      .catch(err => {
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
        setshowID(false);
        setsubmitting(false);
      });
    e.preventDefault();
  };

  const registerTeam = e => {
    setsubmitting(true);
    const regData = { name, email, phone, admissionNo: college };
    axiosPost("reg/teamreg", regData, true)
      .then(res => {
        document.getElementById("college-name").value = "";
        document.getElementById("college-email").value = "";
        document.getElementById("college").value = "";
        document.getElementById("phone").value = "";
        toast.add("User Added Successfully!");
        setsubmitting(false);
      })
      .catch(err => {
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
        setsubmitting(false);
      });
    e.preventDefault();
  };

  const handleLayout = value => {
    setlayout(value);
  };

  const handleStat = () => {
    setloading(1);
    axiosGet("reg/stat/core", null, true)
      .then(res => {
        setstats(res.data.data.stats);
        setloading(0);
      })
      .catch(err => {
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
        setloading(-1);
      });
  };

  useEffect(() => {
    handleStat();
  }, []);

  return (
    <div>
      <div className="text-center">
        <h3>
          {loading
            ? loading === -1 ? null : <span>Loading Stats...</span>
            : !stats.length
              ? "Amount Due: 0"
              : `Amount Due: ${stats[0].amount}`}
        </h3>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${!layout
            ? "btn-outline-light"
            : "btn-light"}`}
          onClick={() => handleLayout(0)}
        >
          Search ID
        </button>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${layout === 1
            ? "btn-outline-light"
            : "btn-light"}`}
          onClick={() => handleLayout(1)}
        >
          Register Security Team member
        </button>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${layout === 2
            ? "btn-outline-light"
            : "btn-light"}`}
          onClick={() => handleLayout(2)}
        >
          Register Team
        </button>
      </div>
      {layout === 1
        ? <form className="end-user-form mt-3" onSubmit={handleSubmit}>
            <h3 className="text-center mb-3">Register Security Team Member</h3>
            <div className="form-group">
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Name"
                required
                onChange={e => setname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={e => setemail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={e => setpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                id="confirm-password"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                onChange={e => setpasswordConfirm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-brown submit-buttons"
              disabled={submitting ? true : false}
            >
              {!submitting
                ? "Register"
                : <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>}
            </button>
          </form>
        : layout === 2
          ? !showID
            ? <form className="end-user-form mt-3" onSubmit={registerTeam}>
                <h3 className="text-center mb-3">Register Team</h3>
                <div className="form-group">
                  <input
                    id="college-name"
                    type="text"
                    className="form-control"
                    placeholder="Team Leader's Name"
                    required
                    onChange={e => setname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="college-email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    onChange={e => setemail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="tel"
                    type="test"
                    className="form-control"
                    placeholder="Phone Number"
                    minLength="10"
                    maxLength="10"
                    required
                    onChange={e => setphone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="college"
                    type="text"
                    className="form-control"
                    placeholder="College Name"
                    required
                    onChange={e => setcollege(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-brown submit-buttons"
                  disabled={submitting ? true : false}
                >
                  {!submitting
                    ? "Register"
                    : <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>}
                </button>
              </form>
            : <Fragment>
                <h1 className="text-center">Zeal ID</h1>
                <div className="id-box">
                  <p>
                    Name: <span>{resData.name}</span>
                  </p>
                  <p>
                    Email: <span>{resData.email}</span>
                  </p>
                  <p>
                    Admission Number: <span>{resData.admissionNo}</span>
                  </p>
                  {resData.zealID
                    ? <p>
                        Zeal ID: <span>{resData.zealID}</span>
                      </p>
                    : <p>
                        Temp ID: <span>{resData.tempID}</span>
                      </p>}
                </div>
              </Fragment>
          : <div className="mt-3">
              <SearchId handleStat={handleStat} />
            </div>}
    </div>
  );
};

export default CtcDashboard;
