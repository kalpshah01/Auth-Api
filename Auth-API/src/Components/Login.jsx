import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../redux/AuthSlice";

import { Link, useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, isError } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(loginUser(formData));
  };

  

useEffect(() => {

  if (user) {

    if (user.role?.toLowerCase() === "admin") {

      navigate("/admin-dashboard");

    } else {

      navigate("/userdashboard");
    }
  }

}, [navigate, user]);

  return (
    <>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">

          {isLoading ? "Loading..." : "Login"}

        </button>

      </form>
<p>
  Don't have an account?

  <Link to="/signup">
    Signup
  </Link>
</p>

<p>
  Forgot Password?

  <Link to="/forgot-password">
    Reset Here
  </Link>
</p>
      {isError && <p>{isError}</p>}

    </>
  );
}

export default Login;
