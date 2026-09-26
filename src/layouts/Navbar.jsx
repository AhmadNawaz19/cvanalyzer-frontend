import React, { useEffect, useState } from "react";
import "./styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userDataStore";
import { FaFileCode, FaUser, FaSignOutAlt, FaHistory } from "react-icons/fa";
import axios from "axios";

const Navbar = React.memo(() => {
  const { user, setUser, clearUser } = useUserStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/userData/data",
          { withCredentials: true }
        );
        if (response.data?.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        clearUser();
      }
    };

    fetchUserData();
  }, [setUser, clearUser]);

  const logout = async () => {
    const isLogout = window.confirm("Are you sure you want to log out?")
    if (!isLogout) return

    try {
      await axios.delete("http://localhost:8000/logout", {
        withCredentials: true,
      })
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      clearUser()
      navigate('/login')
    }
  }

  return (
    <header id="header">
      <nav className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" id="logo">
          <FaFileCode className="logo-icon" />
          <span>CV Analyzer</span>
        </Link>

        {/* Navigation Links */}
        <div id="links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <a className="nav-link" href="#features">
            Features
          </a>
          <a className="nav-link" href="#benefit">
            Benefits
          </a>
         <Link className="nav-link" to="/reviews">
            Reviews
          </Link>
         <Link className="nav-link" to="/profile">
            Profile
          </Link>

          {/* Conditional Auth Section */}
          <div id="auth-section">
            {user ? (
              <div className="profile-menu-container">
                <button
                  className="avatar-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="User Profile Menu"
                >
                  <img
                    src={
                      user?.profile ||
                      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    alt={user?.name || "User Avatar"}
                  />
                </button>

                {/* Profile Dropdown */}
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <p className="user-name">{user?.name || "User Account"}</p>
                      <p className="user-email">{user?.email || ""}</p>
                    </div>
                    <hr />
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUser /> Profile
                    </Link>
                    <Link
                      to="/history"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaHistory /> Analysis History
                    </Link>
                    <button onClick={logout} className="dropdown-item logout">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" id="login-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;