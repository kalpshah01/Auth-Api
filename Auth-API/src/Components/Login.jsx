import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

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
    <div className="login-page">
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>

          {isError && <div className="login-error">{isError}</div>}
        </form>

        <div className="login-links">
          <p>
            Don't have an account?{" "}
            <Link to="/signup">Signup</Link>
          </p>

          <p>
            Forgot Password?{" "}
            <Link to="/forgot-password">Reset Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
