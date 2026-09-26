import React from 'react'
import './styles/sidebar.css'
import { FaHistory, FaSignOutAlt, FaCloudUploadAlt, FaUserCircle } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userDataStore'
import axios from 'axios'

const SideBar = React.memo(() => {
  const { user, clearUser } = useUserStore()
  const navigate = useNavigate()

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
    <aside id="sidebar">
      {/* User Info Header */}
      <div className="sidebar-user-card">
        <NavLink to="/profile" className="avatar-wrapper">
          {user?.profile ? (
            <img id="img" src={user.profile} alt={user?.name || "User Profile"} />
          ) : (
            <FaUserCircle className="default-avatar-icon" />
          )}
        </NavLink>
        <div className="user-details">
          <h3 onClick={()=> navigate('/login')}>{user?.name || "Sign Up"}</h3>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <NavLink 
          to="/profile" 
          end 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaCloudUploadAlt className="nav-icon" />
          <span>Upload Resume</span>
        </NavLink>

        <NavLink 
          to="/history" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FaHistory className="nav-icon" />
          <span>Analysis History</span>
        </NavLink>

        <NavLink 
          to="/setting" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <FiSettings className="nav-icon" />
          <span>Settings</span>
        </NavLink>

        <button type="button" className="nav-item logout-btn" onClick={logout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Log Out</span>
        </button>
      </nav>
    </aside>
  )
})

SideBar.displayName = 'SideBar'
export default SideBar