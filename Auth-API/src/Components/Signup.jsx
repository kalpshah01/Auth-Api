import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await dispatch(registerUser(formData));

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
      } else {
        setError(result.payload?.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <div className="signup-form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="signup-form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="signup-form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <div className="signup-form-group">
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Signup"}
          </button>

          {error && <div className="signup-error">{error}</div>}
        </form>

        <div className="signup-login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
