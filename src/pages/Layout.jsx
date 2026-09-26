import React from 'react'
import { Outlet } from 'react-router-dom'
import './styles/layout.css'
import SideBar from '../layouts/SideBar'
import Navbar from '../layouts/Navbar'

const Layout = React.memo(() => {
    return (
        <div className='layoutMain'>
            <Navbar />
            <div className='Outlet'>
                <SideBar />
                <main className='mainContent'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
})

Layout.displayName = 'Layout'
export default Layout