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
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
        setres([]);
        document.getElementById("search-input").value = "";
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
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
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
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </div>
      </form>
      {res.map((item, index) => {
        return (
          <div className="id-box mt-4" key={index}>
            <img
              src="https://i.ibb.co/DKcQwp4/Logo-Final.png"
              className="id-logo"
            />
            <h4 className="mt-2 mb-2">
              <span className="font-weight-bolder">
                {item.name}
              </span>
            </h4>
            <div className="text-left">
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
            {localStorage.getItem("role") === "core-team" && !item.zealID
              ? <button
                  className="btn btn-outline-light"
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
