import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { registerUser } from "../redux/AuthSlice";

import { useNavigate } from "react-router-dom";

function Signup() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await dispatch(
      registerUser(formData)
    );

    if (result.meta.requestStatus === "fulfilled") {

      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select
        name="role"
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">
        Signup
      </button>

    </form>
  );
}

export default Signup;
