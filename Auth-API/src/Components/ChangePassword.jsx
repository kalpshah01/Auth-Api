import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { changePassword } from "../redux/authSlice";

function ChangePassword() {
  const dispatch = useDispatch();

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

      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePassword;
