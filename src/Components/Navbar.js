import React, { Fragment } from "react";

import { Link } from "react-router-dom";

const Navbar = ({ state, setState }) => {
  const logOut = () => {
    setState(0);
    localStorage.clear();
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
            <Link to="/search">
              <button className="btn btn-outline-info rounded-pill">
                Search
              </button>
            </Link>
          </li>
          <li>
            {state
              ? <Fragment>
                  <Link to="/Dashboard">
                    <button className="btn btn-outline-info rounded-pill">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-info rounded-pill"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </Fragment>
              : <Link to="/login">
                  <button className="btn btn-outline-info rounded-pill">
                    Login
                  </button>
                </Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
