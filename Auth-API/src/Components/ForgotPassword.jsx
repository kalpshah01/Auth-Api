import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  resetPassword,
  setOtpVerify,
} from "../redux/AuthSlice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ForgotPassword.css";

function ForgotPassword() {
  const dispatch = useDispatch();

  const { otpVerify, isLoading, isError } =
    useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

    const result = await dispatch(
      forgotPassword({ email })
    );

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
      dispatch(setOtpVerify(true));
      setSuccessMessage("OTP sent successfully to your email");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!formData.otp) {
      alert("Please enter OTP");
      return;
    }

    if (!formData.newPassword) {
      alert("Please enter new password");
      return;
    }

    const result = await dispatch(
      resetPassword({
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      })
    );

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
      setSuccessMessage("Password reset successful");
      setTimeout(() => {
        dispatch(setOtpVerify(false));
        setEmail("");
        setFormData({
          otp: "",
          newPassword: "",
        });
        setSuccessMessage("");
      }, 2000);
    }
  };

  return (
    <div className="forgot-password-page">
      <Navbar />
      <div className="forgot-password-wrapper">
        <div className="forgot-password-container">
          <h2>Reset Password</h2>

          <div className="forgot-password-form-group">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpVerify}
            />

            <button
              onClick={handleVerify}
              disabled={isLoading || otpVerify}
            >
              {isLoading
                ? "Sending..."
                : otpVerify ? "OTP Sent" : "Send OTP"}
            </button>
          </div>

          {successMessage && (
            <div className="forgot-password-success">
              {successMessage}
            </div>
          )}

          {otpVerify && (
            <div className="otp-section">
              <h3>Enter OTP & New Password</h3>

              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
              />

              <input
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />

              <button
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}

          {isError && (
            <div className="forgot-password-error">
              {isError}
            </div>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Remember your password? <Link to="/login" style={{ color: "#d4af37" }}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;