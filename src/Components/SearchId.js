import React, { useState } from "react";

import { useToast } from "../utils/Toast";
import { axiosGet, axiosPost } from "../axios";

const SearchId = ({ handleStat }) => {
  const toast = useToast();

  const [search, setsearch] = useState("");
  const [res, setres] = useState([]);

  const handleChange = e => {
    setsearch(e.target.value);
  };

  // logic to search input
  const searchInput = e => {
    axiosGet(`reg/${search}`)
      .then(res => {
        setres(res.data.data.registraions);
        document.getElementById("search-input").value = "";
      })
      .catch(err => {
        setres([]);
        document.getElementById("search-input").value = "";
        toast.add(err.response.data.message, "fail");
      });
    e.preventDefault();
  };

  // logic to approve payment
  const approvePayment = tempID => {
    const data = { tempID };
    axiosPost("reg/approve", data, true)
      .then(res => {
        toast.add("Payment Approved!!!");
        axiosGet(`reg/${search}`).then(res => {
          setres(res.data.data.registraions);
          document.getElementById("search-input").value = "";
        });
        handleStat();
      })
      .catch(err => {
        toast.add(err.response.data.message, "fail");
      });
  };

  return (
    <div>
      <form className="input-group mb-3" onSubmit={searchInput}>
        <input
          type="text"
          id="search-input"
          className="form-control"
          placeholder="Search..."
          onChange={handleChange}
          required
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
            {localStorage.getItem("role") === "core-team" && !item.zealID
              ? <button
                  className="btn btn-primary"
                  onClick={() => approvePayment(item.tempID)}
                >
                  Approve Payment
                </button>
              : null}
          </div>
        );
      })}
    </div>
  );
};

export default SearchId;
