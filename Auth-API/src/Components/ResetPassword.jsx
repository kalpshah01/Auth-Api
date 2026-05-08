import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { resetPassword } from "../redux/AuthSlice";

function ResetPassword() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
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

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      alert("Passwords do not match");

      return;
    }

    dispatch(
      resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
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

      <button type="submit">

        Reset Password

      </button>

    </form>
  );
}

export default ResetPassword;
