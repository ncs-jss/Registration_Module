import React, { useState, Fragment } from "react";

import Recaptcha from "react-recaptcha";
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

  const handleSubmit = e => {
    if (isVerified) {
      const regData = { name, email, mobile, admissionNo, token };
      axiosPost("reg/", regData, false)
        .then(res => {
          toast.add("User Added Successfully!");
          setname("");
          setemail("");
          setmobile("");
          setadmissionNo("");
          setresData(res.data.data.data);
          setshowId(true);
        })
        .catch(err => {
          toast.add("Something went wrong while registering user", "fail");
          setshowId(false);
        });
    } else {
      alert("Please verify that you are human!!!");
    }
    e.preventDefault();
  };

  const recaptchaLoaded = () => {
    // do nothing
  };

  const verifyCallback = res => {
    if (res) {
      settoken(res);
      setisVerified(true);
    }
  };

  return showId
    ? <Fragment>
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
    : <form className="end-user-form" onSubmit={handleSubmit}>
        <h2 className="text-center">Register for Zealicon 2020</h2>
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
          <Recaptcha
            sitekey="6LcaVNkUAAAAAK2pmScib75IT507UvcR_in3TsWb"
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>;
};

export default Register;
