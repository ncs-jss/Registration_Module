import React from "react";

import { Link } from "react-router-dom";
import { axiosPost } from "../axios";

const Navbar = ({ state, setState }) => {
  const logOut = () => {
    axiosPost("users/logout/", null, true)
      .then(res => {
        console.log(res.data);
        setState(0);
        localStorage.clear();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <header>
      <div className="logo d-flex">
        <Link className="" to="/">
          Zealicon-2020
        </Link>
      </div>
      <input id="nav" type="checkbox" />
      <label htmlFor="nav" />
      <nav>
        <ul>
          <li>
            {state
              ? <button
                  className="btn btn-outline-info rounded-pill"
                  onClick={logOut}
                >
                  Logout
                </button>
              : <Link to="/login">
                  <button className="btn btn-outline-info rounded-pill">
                    Login
                  </button>
                </Link>}
          </li>
          <li>
            <Link to="/search">
              <button className="btn btn-outline-info rounded-pill">
                Search
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
