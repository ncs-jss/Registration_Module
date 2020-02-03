import React, { useState } from "react";

import { axiosPost } from "../axios";

const Login = props => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const loginData = { email, password };
    axiosPost("users/login/", loginData, false)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        props.setState(1);
        props.history.push("/admin");
      })
      .catch(err => {
        props.setState(0);
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Login</h2>
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
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={e => setpassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-info">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
