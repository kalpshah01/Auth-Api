import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { changePassword } from "../redux/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    dispatch(
      changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        token: user?.token,
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        onChange={handleChange}
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <button type="submit">{isLoading ? "Changing..." : "Change Password"}</button>

      {isError && <p>{isError}</p>}
    </form>
  );
}

export default ChangePassword;
