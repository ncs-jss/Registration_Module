import React, { useState } from "react";

import { useToast } from "../utils/Toast";
import { axiosGet, axiosPost } from "../axios";

let attendence = 0;

const SecurityDashboard = () => {
  const toast = useToast();

  const [res, setres] = useState(null);
  const [search, setsearch] = useState("");

  const searchInput = e => {
    axiosGet(`reg/management/${search}`, null, true)
      .then(res => {
        attendence = 0;
        Object.keys(res.data.data.registration.entryLog).forEach(item => {
          const a = new Date();
          const today = a.getDate();
          const b = new Date(
            res.data.data.registration.entryLog[item].createdAt
          );
          const marked = b.getDate();
          if (today === marked) {
            attendence = 1;
            return true;
          }
        });
        setres(res.data.data.registration);
        document.getElementById("search-input").value = "";
      })
      .catch(err => {
        toast.add(err.response.data.message, "fail");
        setres(null);
      });
    e.preventDefault();
  };

  const handleEntryLog = zealID => {
    axiosPost(`reg/management/${zealID}`, null, true)
      .then(res => {
        attendence = 1;
        setres(res.data.data.registration);
        toast.add("Attendence Marked!!!");
      })
      .catch(err => {
        attendence = 0;
        toast.add(err.response.data.message, "fail");
      });
  };

  const handleChange = e => {
    setsearch(e.target.value);
  };

  return (
    <div>
      <form className="input-group mb-3" onSubmit={searchInput}>
        <input
          type="text"
          id="search-input"
          className="form-control"
          placeholder="Zeal ID / Mobile / Email"
          onChange={handleChange}
          required
        />
        <div className="input-group-append">
          <button className="btn btn-outline-info" type="submit">
            Search
          </button>
        </div>
      </form>
      {res
        ? <div className="id-box mt-4">
            <p>
              Name: <span>{res.name}</span>
            </p>
            <p>
              Email: <span>{res.email}</span>
            </p>
            {res.zealID
              ? <p>
                  Zeal ID: <span>{res.zealID}</span>
                </p>
              : <p>
                  Temp ID: <span>{res.tempID}</span>
                </p>}
            {!attendence
              ? <button
                  className="btn btn-primary"
                  onClick={() => handleEntryLog(res.zealID)}
                >
                  Mark Attendence
                </button>
              : <div className="attendence" title="attendence already marked">
                  Marked Present
                </div>}
          </div>
        : null}
    </div>
  );
};

export default SecurityDashboard;
