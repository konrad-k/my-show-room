import React from 'react';
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { Navigate } from 'react-router-dom';
import Autorization from "./pages/users/Autorization";
import Signup from "./pages/users/Signup";
import Logout from "./pages/users/Logout";
import Dashboard from "./pages/Dashboard";
import ProfileUpdate from "./pages/profile/ProfileUpdate";
import NoPage from "./pages/NoPage";
import Exhibition from "./pages/Exhibition";
import useSessionUser from './hooks/useSessionUser';
import './App.less'

import {
  SessionUserProvider,
  useSessionUserContext,
} from './contexts/SessionUser';

const routes = [
  {
    path: '',
    element: <Dashboard />,
  },
  {
    path: '/profile/update',
    element: <ProfileUpdate/>,
  }
]

interface ProtectedRouteInterface {
  element: JSX.Element
}

const App: React.FC = () => {
  const ProtectedRoute = ({ element } : ProtectedRouteInterface) => {
    const {sessionUser} = useSessionUserContext();
  
    return sessionUser ? element : <Navigate to="/login" />
  };

  const ProfileRoute = () => {
    return <Navigate to="/profile/update" />;
  };

  const completeCheck = () => {
    const { sessionUser } = useSessionUser();
    if ((sessionUser && sessionUser?.profile ) || !sessionUser ) {
      return [
        {
          path: '/',
          element: <ProtectedRoute element={<Layout />} />,
          children: routes,
        },
        {
          path: 'login',
          element: <Autorization />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'logout',
          element: <Logout />,
        },
        {
          path: 'exhibitions/:id',
          element: <Exhibition />,
        },
        {
          path: '*',
          element: <NoPage />,
        },
      ]
    } else {
      return [
        {
          path: '*',
          element: <ProfileRoute />,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdate />,
        },
      ]
    }
  }

  const router = createHashRouter(completeCheck());

  return (
    <SessionUserProvider>
      <RouterProvider router={router} />
    </SessionUserProvider>
  )
}

export default App
