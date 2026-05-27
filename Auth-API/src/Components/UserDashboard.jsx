import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import { logout } from "../redux/AuthSlice";
function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return navigate("/login");
  }

  return (
    <div className="user-dashboard-page">
      <div className="user-dashboard-container">
        <div className="user-dashboard-header">
          <h1>Welcome, {user.name || "User"}!</h1>
          <p>Manage your account and settings</p>
        </div>

        <div className="user-dashboard-content">
          <div className="user-info-section">
            <div className="user-info-card">
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
            <div className="user-info-card">
              <h3>Role</h3>
              <p>{user.role?.toUpperCase() || "USER"}</p>
            </div>
          </div>

          <div className="user-actions">
            <Link to="/change-password" className="user-action-btn user-action-btn-primary">
              Change Password
            </Link>
            <Link to="/forgot-password" className="user-action-btn user-action-btn-secondary">
              Reset Password
            </Link>
            <button
              onClick={handleLogout}
              className="user-action-btn user-action-btn-secondary"
              style={{ background: "#ff6b6b", color: "white", border: "none" }}
            >
              Logout
            </button>
          </div>

          <div className="user-dashboard-section">
            <h2>Account Stats</h2>
            <div className="user-stats">
              <div className="stat-card">
                <h4>Account Status</h4>
                <p className="stat-value">Active</p>
              </div>
              <div className="stat-card">
                <h4>Account Type</h4>
                <p className="stat-value">{user.role}</p>
              </div>
              <div className="stat-card">
                <h4>Member Since</h4>
                <p className="stat-value">2024</p>
              </div>
              <div className="stat-card">
                <h4>Security</h4>
                <p className="stat-value">Strong</p>
              </div>
            </div>
          </div>

          <div className="user-dashboard-section">
            <h2>Quick Actions</h2>
            <div className="user-dashboard-grid">
              <div className="user-dashboard-item">
                <h4>🔐 Security</h4>
                <p>Manage your security settings and passwords</p>
              </div>
              <div className="user-dashboard-item">
                <h4>👤 Profile</h4>
                <p>Update your profile information</p>
              </div>
              <div className="user-dashboard-item">
                <h4>🔔 Notifications</h4>
                <p>Manage notification preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
