import React, { useState } from "react";

import { useToast } from "../utils/Toast";
import { axiosGet } from "../axios";

const SearchId = () => {
  const toast = useToast();

  const [search, setsearch] = useState("");
  const [res, setres] = useState([]);

  const handleChange = e => {
    setsearch(e.target.value);
  };

  const searchInput = e => {
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

  return (
    <div>
      <form className="input-group mb-3" onSubmit={searchInput}>
        <input
          type="text"
          id="search-input"
          className="form-control"
          placeholder="Search..."
          onChange={handleChange}
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
    </div>
  );
};

export default SearchId;
