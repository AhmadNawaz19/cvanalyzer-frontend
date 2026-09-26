import React from 'react'
import { Outlet } from 'react-router-dom'
import './styles/profile.css'
import SideBar from '../layouts/SideBar'
import ResumeUpload from './ResumeUpload'
import Layout from './Layout'

const Profile = React.memo(() => {
  return (
    <div id='profile'>
      <div id="ProfileMain">
        <Layout /> 
      </div>
    </div>
  )
})

Profile.displayName = 'profile'
export default Profile