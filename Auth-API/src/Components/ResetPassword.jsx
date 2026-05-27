import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/AuthSlice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ResetPassword.css";

function ResetPassword() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await dispatch(
        resetPassword({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        setSuccess("Password reset successfully!");
        setFormData({
          email: "",
          otp: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError(result.payload?.message || "Password reset failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <Navbar />
      <div className="reset-password-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <p>Enter your details to reset your password</p>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            value={formData.email}
            required
          />

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
            value={formData.otp}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            value={formData.newPassword}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          {error && <div className="reset-password-error">{error}</div>}
          {success && <div className="reset-password-success">{success}</div>}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Back to <Link to="/login" style={{ color: "#d4af37" }}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
