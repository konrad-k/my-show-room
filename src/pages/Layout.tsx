import React from 'react';
import { Outlet, Link } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <>
      <header className="header fixed">
        <div className="header-content">
          <div className="content-holder">
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
                <li className="item margin-left-auto margin-right-0">
                  <Link className="anchor" to="/logout">Logout</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div className="content-holder">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
