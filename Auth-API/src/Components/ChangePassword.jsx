import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./ChangePassword.css";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError("New passwords do not match");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError("New password must be different from old password");
      return;
    }

    if (!user?.token) {
      setError("Please login first");
      navigate("/login");
      return;
    }

    const result = await dispatch(
      changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        token: user.token,
      })
    );

    if (
      result.meta.requestStatus ===
      "fulfilled"
    ) {
      setSuccess("Password changed successfully!");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setSuccess("");
        navigate("/userdashboard");
      }, 2000);
    } else {
      setError(result.payload?.message || "Failed to change password");
    }
  };

  if (!user) {
    return navigate("/login");
  }
console.log("User in ChangePassword:", user);
console.log("token error:", user?.token);
  return (
    <div className="change-password-page">
      <Navbar />
      <div className="change-password-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Change Password</h2>
          <p>Update your password to keep your account secure</p>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Changing..."
              : "Change Password"}
          </button>

          {error && (
            <div className="change-password-error">
              {error}
            </div>
          )}

          {isError && (
            <div className="change-password-error">
              {isError}
            </div>
          )}

          {success && (
            <div className="change-password-success">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;