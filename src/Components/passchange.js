import React, { useState } from "react";
import { axiosPost, axiosGet } from "../axios";
import { useToast } from "../utils/Toast";

const PassChange = () => {
  const toast = useToast();
  const [oldpass, setoldpassword] = useState("");
  const [newpass, setnewpassword] = useState("");
  const [newconfirmpass, setconfirmpassword] = useState("");
  const [submitting, setsubmitting] = useState(false);

  const handlePasswordSubmit = e => {
    setsubmitting(true);
    const regData = {
      passwordCurrent: oldpass,
      password: newpass,
      passwordConfirm: newconfirmpass
    };
    axiosPost("users/updatePassword", regData, true)
      .then(res => {
        toast.add("Password Changed Successfully!");
        document.getElementById("oldpass").value = "";
        document.getElementById("newpass").value = "";
        document.getElementById("confirmpass").value = "";
        setsubmitting(false);
      })
      .catch(err => {
        if (err.response) {
          toast.add(err.response.data.message, "fail");
        }
        setsubmitting(false);
      });
    e.preventDefault();
  };
  return (
    <>
      <form className="end-user-form mt-3" onSubmit={handlePasswordSubmit}>
        <h3 className="text-center">Register Core Team Member</h3>
        <div className="form-group">
          <input
            id="oldpass"
            type="text"
            className="form-control"
            placeholder="Old Password"
            required
            onChange={e => setoldpassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            id="newpass"
            type="password"
            className="form-control"
            placeholder="New Password"
            required
            onChange={e => setnewpassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            id="confirmpass"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
            onChange={e => setconfirmpassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-brown submit-buttons"
          disabled={submitting ? true : false}
        >
          {!submitting ? (
            "Submit"
          ) : (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </>
  );
};
export default PassChange;
