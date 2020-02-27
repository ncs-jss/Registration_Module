import React, { useState, Fragment, useEffect } from "react";

import { loadReCaptcha } from "react-recaptcha-v3";
import { ReCaptcha } from "react-recaptcha-v3";

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
  const [isVerified, setisVerified] = useState(false);
  const [token, settoken] = useState();
  const [submitting, setsubmitting] = useState(false);

  const handleSubmit = e => {
    if (isVerified) {
      setsubmitting(true);
      const regData = { name, email, mobile, admissionNo, token };
      axiosPost("reg/", regData, false)
        .then(res => {
          toast.add("User Added Successfully!");
          setresData(res.data.data.data);
          setshowId(true);
          setsubmitting(false);
        })
        .catch(err => {
          if (err.response) {
            toast.add(err.response.data.message, "fail");
          }
          setshowId(false);
          setsubmitting(false);
        });
    }
    e.preventDefault();
  };

  const verifyCallback = res => {
    if (res) {
      settoken(res);
      setisVerified(true);
    }
  };

  useEffect(() => {
    loadReCaptcha("6LfaeNcUAAAAAHVXV9ve3oOK-HZDl-7f_ZAEXq31");
  }, []);

  return showId
    ? <Fragment>
        <h1 className="text-center">Zeal ID</h1>
        <div className="id-box mt-4">
          <img
            src="https://i.ibb.co/DKcQwp4/Logo-Final.png"
            className="id-logo"
          />
          <h4 className="mt-2 mb-2">
            <span className="font-weight-bolder">
              {resData.name}
            </span>
          </h4>
          <div className="text-left">
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
        </div>
      </Fragment>
    : <form className="end-user-form" onSubmit={handleSubmit}>
        <h2 className="text-center">Register</h2>
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
            minLength="10"
            maxLength="10"
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
        <div className="mb-2">
          <ReCaptcha
            sitekey="6LfaeNcUAAAAAHVXV9ve3oOK-HZDl-7f_ZAEXq31"
            action="verify_not_robot"
            verifyCallback={verifyCallback}
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
      </form>;
};

export default Register;
