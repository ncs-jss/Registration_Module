import React, { useState, useEffect } from "react";

import { axiosPost, axiosGet } from "../axios";
import { useToast } from "../utils/Toast";

const AdminDashboard = () => {
  const toast = useToast();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [loading, setloading] = useState(1);
  const [stats, setstats] = useState([]);
  const [layout, setlayout] = useState(0);

  const handleSubmit = e => {
    const regData = { name, email, password, passwordConfirm };
    axiosPost("users/", regData, true)
      .then(res => {
        toast.add("User Added Successfully!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
      })
      .catch(err => {
        toast.add(err.response.data.message, "fail");
      });
    e.preventDefault();
  };

  const handleStat = () => {
    axiosGet("reg/stat/all", null, true)
      .then(res => {
        setstats(res.data.data.newStats);
        setloading(0);
      })
      .catch(err => {
        toast.add(err.response.data.message, "fail");
      });
  };

  const handleLayout = value => {
    setlayout(value);
  };

  useEffect(() => {
    handleStat();
  }, []);

  return (
    <div>
      <div className="text-center">
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${!layout
            ? "btn-outline-info"
            : "btn-info"}`}
          onClick={() => handleLayout(0)}
        >
          Stats
        </button>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${layout
            ? "btn-outline-info"
            : "btn-info"}`}
          onClick={() => handleLayout(1)}
        >
          Register Core Team member
        </button>
      </div>
      {!layout
        ? <div className="stats mt-3">
            {loading
              ? <h3 className="text-center">Loading Stats...</h3>
              : !stats.length
                ? <h3 className="text-center">No Stats Found!!!</h3>
                : stats.map((stat, index) => {
                    return (
                      <div className="stat" key={index}>
                        <span>
                          Name: {stat.name}
                        </span>
                        <span>
                          Email: {stat.email}
                        </span>
                        <span>
                          Approved: {stat.amount}
                        </span>
                      </div>
                    );
                  })}
          </div>
        : <form className="end-user-form mt-3" onSubmit={handleSubmit}>
            <h2 className="text-center">Register Core Team Member</h2>
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
            <button type="submit" className="btn btn-primary">
              Register User
            </button>
          </form>}
    </div>
  );
};

export default AdminDashboard;
