import React, { useState } from "react";

import { axiosPost } from "../axios";
import { Redirect } from "react-router-dom";

import { useToast } from "../utils/Toast";

const Login = props => {
  const toast = useToast();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const loginData = { email, password };
    axiosPost("users/login/", loginData, false)
      .then(res => {
        const role = res.data.data.user.role;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);
        props.setState(1);
        props.history.push("/dashboard");
      })
      .catch(err => {
        props.setState(0);
        toast.add(err.response.data.message, "fail");
      });
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/dashboard" />;
  }

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
