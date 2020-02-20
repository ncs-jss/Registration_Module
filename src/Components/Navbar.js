import React, { Fragment } from "react";

import { Link } from "react-router-dom";

const Navbar = ({ state, setState }) => {
  const logOut = () => {
    setState(0);
    localStorage.clear();
  };

  return (
    <header>
      <div className="d-flex">
        <Link className="" to="/">
          <img
            src="https://i.ibb.co/DKcQwp4/Logo-Final.png"
            alt="Zealicon'20"
            className="header-logo"
          />
        </Link>
      </div>
      <input id="nav" type="checkbox" />
      <label htmlFor="nav" />
      <nav>
        <ul>
          <li>
            <Link to="/search">
              <button className="btn btn-outline-light rounded-pill">
                Search
              </button>
            </Link>
          </li>
          <li>
            {state
              ? <Fragment>
                  <Link to="/dashboard">
                    <button className="btn btn-outline-light rounded-pill">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-light rounded-pill"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </Fragment>
              : <Link to="/login">
                  <button className="btn btn-outline-light rounded-pill">
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
