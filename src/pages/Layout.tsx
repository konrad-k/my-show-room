import React from 'react';
import { Outlet, Link } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <>
      <header className="header fixed">
        <div className="header-content">
          <nav>
              <ul className="items">
                <li className="item">
                  <Link className="anchor" to="/">Home</Link>
                </li>
                <li className="item">
                  <Link className="anchor" to="/exhibitions/1">Exhibition</Link>
                </li>
                <li className="item">
                  <Link className="anchor" to="/profile/update">Profile settings</Link>
                </li>
                <li className="item">
                  <Link className="anchor" to="/logout">Logout</Link>
                </li>
                
              </ul>
            </nav>
        </div>
      </header>
      
      <Outlet />
    </>
  )
}

export default Layout
