import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome to Auth API</h1>
        <p>
          A comprehensive authentication and authorization system with secure user management.
        </p>

        <div className="dashboard-buttons">
          <Link to="/login" className="dashboard-btn dashboard-btn-primary">
            Login
          </Link>
          <Link to="/signup" className="dashboard-btn dashboard-btn-secondary">
            Create Account
          </Link>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h3>🔒 Secure</h3>
            <p>Enterprise-grade security with encrypted passwords and JWT tokens</p>
          </div>
          <div className="dashboard-card">
            <h3>⚡ Fast</h3>
            <p>High-performance authentication with minimal latency</p>
          </div>
          <div className="dashboard-card">
            <h3>📱 Responsive</h3>
            <p>Beautiful design that works seamlessly on all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
