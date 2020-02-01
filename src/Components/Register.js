import React, { useState, Fragment } from "react";

import { axiosPost } from "../axios";
import { useToast } from "../utils/Toast";

const Register = () => {
  const toast = useToast();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [admissionNo, setadmissionNo] = useState("");
  const [showId, setshowId] = useState(false);
  const [resData, setresData] = useState(null);

  const handleSubmit = e => {
    const regData = { name, email, mobile, admissionNo };
    console.log(regData);
    axiosPost("reg/", regData, false)
      .then(res => {
        toast.add("User Added Successfully!");
        setname("");
        setemail("");
        setmobile("");
        setadmissionNo("");
        setresData(res.data.data.data);
        console.log(res.data.data.data);
        setshowId(true);
      })
      .catch(err => {
        toast.add("Something went wrong while registering user", "fail");
        console.log(err);
        setshowId(false);
      });
    e.preventDefault();
  };

  return showId
    ? <Fragment>
        <h1 className="text-center">Zeal ID</h1>
        <div className="id-box">
          {resData.zealID
            ? <p>
                Zeal ID: <span>{resData.zealID}</span>
              </p>
            : <p>
                ZO ID: <span>{resData.tempID}</span>
              </p>}
          <p>
            Name: <span>{resData.name}</span>
          </p>
          <p>
            Email: <span>{resData.email}</span>
          </p>
          <p>
            Admission Number: <span>{resData.admissionNo}</span>
          </p>
        </div>
      </Fragment>
    : <form className="end-user-form" onSubmit={handleSubmit}>
        <h2 className="text-center">Enter your Details Here!</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={e => setname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={e => setemail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            placeholder="Mobile number (10 digit)"
            onChange={e => setmobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Admission Number"
            onChange={e => setadmissionNo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register User
        </button>
      </form>;
};

export default Register;
