import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import LayoutMain from "./layouts/LayoutMain";
import LayoutGallery from "./layouts/LayoutGallery";
import { Navigate } from 'react-router-dom';
import Autorization from "./pages/users/Autorization";
import Signup from "./pages/users/Signup";
import Logout from "./pages/users/Logout";
import Dashboard from "./pages/Dashboard";
import ProfileIndex from "./pages/profile/ProfileIndex";
import ProfileGallery from "./pages/profile/ProfileGallery";
import ProfileExhibition from "./pages/profile/ProfileExhibition";
import NoPage from "./pages/NoPage";
import Exhibition from "./pages/Exhibition";
import Gallery from "./pages/Gallery";
import Galleries from "./pages/Galleries";
import "./App.scss";

import {
  SessionUserProvider,
  useSessionUserContext,
} from './contexts/SessionUser';

const routes = [
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'profile',
    element: <ProfileIndex />,
  },
  {
    path: 'profile/galleries/:id',
    element: <ProfileGallery />,
  },
  {
    path: 'profile/exhibitions/:id',
    element: <ProfileExhibition />,
  },
]


interface ProtectedRouteInterface {
  element: JSX.Element
}

const App: React.FC = () => {
  const ProtectedRoute = ({ element }: ProtectedRouteInterface) => {
    const { sessionUser } = useSessionUserContext();

    return sessionUser ? element : <Navigate to="/login" />
  };


  const completeCheck = () => {
    return [
      {
        path: '/',
        element: <LayoutMain />,
        children: [
          {
            path: '',
            element: <Galleries />,
          },
        ],
      },
      {
        path: ':name/:id',
        element: <LayoutGallery />,
        children: [
          {
            path: '',
            element: <Exhibition />,
          },
        ],
      },
      {
        path: ':name',
        element: <LayoutMain />,
        children: [
          {
            path: '',
            element: <Gallery />,
          },
        ],
      },
      {
        path: '/',
        element: <ProtectedRoute element={<LayoutMain />} />,
        children: routes,
      },
      {
        path: 'logout',
        element: <Logout />
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
        path: '*',
        element: <NoPage />,
      },
    ]
  }

  const router = createHashRouter(completeCheck());

  return (
    <SessionUserProvider>
      <RouterProvider router={router} />
    </SessionUserProvider>
  )
}

export default App
