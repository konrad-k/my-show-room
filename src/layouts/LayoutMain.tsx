import React from 'react';
import { Outlet, Link } from 'react-router-dom'
import { useSessionUserContext } from '../contexts/SessionUser';


const Main: React.FC = () => {
  const { sessionUser } = useSessionUserContext();
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
                {
                  sessionUser && <>
                    <li className="item">
                      <Link className="anchor" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="item">
                      <Link className="anchor" to="/profile">Profile</Link>
                    </li>
                  </>
                }
                
                {sessionUser ?
                  <li className="item margin-left-auto margin-right-0">
                    <Link className="anchor" to="/logout">Logout</Link>
                  </li>:
                  <>
                    <li className="item margin-left-auto margin-right-0">
                      <Link className="anchor" to="/login">Login</Link>
                    </li>

                    <li className="item margin-right-0">
                      <Link className="anchor" to="/signup">Sign up</Link>
                    </li>
                  </>
                  }
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

export default Main
