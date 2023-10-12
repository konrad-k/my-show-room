import React from 'react';
import { Outlet, Link } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/exhibitions/1">Exhibition</Link>
          </li>
          <li>
            <Link to="/profile/update">Profile settings</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
