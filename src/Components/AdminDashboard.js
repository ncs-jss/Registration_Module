import React, { useState, useEffect } from "react";

import { axiosPost, axiosGet } from "../axios";
import { useToast } from "../utils/Toast";
import PassChange from "./passchange";
const AdminDashboard = () => {
  const toast = useToast();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [loading, setloading] = useState(1);
  const [stats, setstats] = useState([]);
  const [layout, setlayout] = useState(0);
  const [submitting, setsubmitting] = useState(false);

  const handleSubmit = e => {
    setsubmitting(true);
    const regData = { name, email, password, passwordConfirm };
    axiosPost("users/", regData, true)
      .then(res => {
        toast.add("User Added Successfully!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
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

  const handleStat = () => {
    axiosGet("reg/stat/all", null, true)
      .then(res => {
        setstats(res.data.data.newStats);
        setloading(0);
      })
      .catch(err => {
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
        setloading(0);
      });
  };

  const handleLayout = value => {
    setlayout(value);
  };

  useEffect(() => {
    handleStat();
  }, []);

  const changePassword = () => {
    setlayout(2);
  };

  return (
    <div>
      <div className="text-center">
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${
            layout === 0 ? "btn-outline-light" : "btn-light"
          }`}
          onClick={() => handleLayout(0)}
        >
          Stats
        </button>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${
            layout === 1 ? "btn-outline-light" : "btn-light"
          }`}
          onClick={() => handleLayout(1)}
        >
          Register Core Team member
        </button>
        <button
          className={`btn ml-1 mr-1 mt-1 mb-1 ${
            layout === 2 ? "btn-outline-light" : "btn-light"
          }`}
          onClick={() => handleLayout(2)}
        >
          Change Password
        </button>
      </div>
      {!layout ? (
        <div className="stats mt-3">
          {loading ? (
            <h3 className="text-center">Loading Stats...</h3>
          ) : !stats.length ? (
            <h3 className="text-center">No Stats Found!!!</h3>
          ) : (
            stats.map((stat, index) => {
              return (
                <div className="stat" key={index}>
                  <span>Name: {stat.name}</span>
                  <span>Email: {stat.email}</span>
                  <span>Amount Due: {stat.amount}</span>
                </div>
              );
            })
          )}
        </div>
      ) : layout === 1 ? (
        <form className="end-user-form mt-3" onSubmit={handleSubmit}>
          <h3 className="text-center">Register Core Team Member</h3>
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
            {!submitting ? (
              "Register"
            ) : (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </form>
      ) : (
        <PassChange />
      )}
    </div>
  );
};

export default AdminDashboard;
